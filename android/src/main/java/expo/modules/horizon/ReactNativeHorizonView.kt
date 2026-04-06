package expo.modules.horizon

import android.content.Context
import android.graphics.BitmapFactory
import android.net.Uri
import android.view.MotionEvent
import android.view.ScaleGestureDetector
import com.google.android.filament.Camera
import com.google.android.filament.MaterialInstance
import com.google.android.filament.Texture
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import io.github.sceneview.SceneView
import io.github.sceneview.math.Position
import io.github.sceneview.math.Rotation
import io.github.sceneview.math.Scale
import io.github.sceneview.node.SphereNode
import io.github.sceneview.safeDestroyTexture
import io.github.sceneview.texture.ImageTexture
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.io.FileInputStream
import java.io.InputStream
import java.net.URL
import kotlin.math.max
import kotlin.math.min

class ReactNativeHorizonView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onLoad by EventDispatcher()
  private val onRotationChange by EventDispatcher()

  private var sourceURL = ""
  private var currentYaw = 0f
  private var currentPitch = 0f
  private var currentFov = 75f
  private var useDeviceOrientation = false

  private val panSensitivity = 0.15f
  private val minPitch = -89f
  private val maxPitch = 89f
  private val minFov = 30f
  private val maxFov = 100f

  private var isDragging = false
  private var lastTouchX = 0f
  private var lastTouchY = 0f

  private var panoramaNode: SphereNode? = null
  private var loadTextureJob: Job? = null
  private var currentTexture: Texture? = null
  private var currentMaterial: MaterialInstance? = null

  private val viewScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

  private val scaleGestureDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
    override fun onScale(detector: ScaleGestureDetector): Boolean {
      currentFov = clamp(currentFov / detector.scaleFactor, minFov, maxFov)
      applyCameraProjection()
      return true
    }
  })

  private val sceneView = SceneView(
    context = context,
    cameraManipulator = null,
    onTouchEvent = { event, _ ->
      handleTouch(event)
      true
    }
  ).apply {
    layoutParams = LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    )

    setCameraNode(cameraNode.apply {
      position = Position(0f, 0f, 0f)
      rotation = Rotation(x = currentPitch, y = currentYaw, z = 0f)
      near = 0.01f
      far = 500f
      setProjection(
        currentFov.toDouble(),
        near = 0.01f,
        far = 500f,
        direction = Camera.Fov.VERTICAL
      )
    })

    addChildNode(
      SphereNode(
        engine = engine,
        radius = 50f,
        builderApply = {
          culling(false)
        }
      ).also { sphere ->
        sphere.isTouchable = false
        sphere.scale = Scale(x = -1f, y = 1f, z = 1f)
        panoramaNode = sphere
      }
    )
  }

  init {
    addView(sceneView)
    post {
      applyCameraProjection()
      applyCameraRotation()
    }
  }

  fun setSourceURL(sourceURL: String) {
    this.sourceURL = sourceURL
    loadPanoramaTexture(sourceURL)
  }

  fun setInitialYaw(initialYaw: Float) {
    currentYaw = initialYaw
    post { applyCameraRotation() }
    emitRotation()
  }

  fun setInitialPitch(initialPitch: Float) {
    currentPitch = clamp(initialPitch, minPitch, maxPitch)
    post { applyCameraRotation() }
    emitRotation()
  }

  fun setInitialFov(initialFov: Float?) {
    if (initialFov == null) {
      return
    }

    currentFov = clamp(initialFov, minFov, maxFov)
    post { applyCameraProjection() }
  }

  fun setUseDeviceOrientation(useDeviceOrientation: Boolean) {
    this.useDeviceOrientation = useDeviceOrientation
  }

  private fun loadPanoramaTexture(url: String) {
    val trimmedURL = url.trim()
    loadTextureJob?.cancel()

    if (trimmedURL.isEmpty()) {
      return
    }

    loadTextureJob = viewScope.launch {
      runCatching {
        val bitmap = kotlinx.coroutines.withContext(Dispatchers.IO) {
          openInputStream(trimmedURL)?.use(BitmapFactory::decodeStream)
        } ?: return@runCatching

        val texture = ImageTexture.Builder()
          .bitmap(bitmap)
          .build(sceneView.engine)

        val material = sceneView.materialLoader.createImageInstance(texture)

        currentMaterial?.let { sceneView.materialLoader.destroyMaterialInstance(it) }
        currentTexture?.let { sceneView.engine.safeDestroyTexture(it) }

        currentTexture = texture
        currentMaterial = material

        panoramaNode?.materialInstance = material
        applyCameraProjection()
        applyCameraRotation()

        onLoad(mapOf("url" to trimmedURL))
      }
    }
  }

  private fun openInputStream(source: String): InputStream? {
    val uri = Uri.parse(source)
    val scheme = uri.scheme?.lowercase()

    return when (scheme) {
      "http", "https" -> URL(source).openStream()
      "content" -> context.contentResolver.openInputStream(uri)
      "file" -> {
        val path = uri.path.orEmpty()
        if (path.startsWith("/android_asset/")) {
          context.assets.open(path.removePrefix("/android_asset/"))
        } else {
          context.contentResolver.openInputStream(uri) ?: FileInputStream(path)
        }
      }
      "asset" -> {
        val assetPath = source.removePrefix("asset:/").removePrefix("/")
        context.assets.open(assetPath)
      }
      null -> {
        if (source.startsWith("/")) {
          FileInputStream(source)
        } else {
          URL(source).openStream()
        }
      }
      else -> {
        context.contentResolver.openInputStream(uri) ?: URL(source).openStream()
      }
    }
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    post {
      applyCameraProjection()
      applyCameraRotation()
    }
  }

  private fun handleTouch(event: MotionEvent) {
    scaleGestureDetector.onTouchEvent(event)

    when (event.actionMasked) {
      MotionEvent.ACTION_DOWN -> {
        isDragging = true
        lastTouchX = event.x
        lastTouchY = event.y
      }

      MotionEvent.ACTION_POINTER_DOWN -> {
        isDragging = false
      }

      MotionEvent.ACTION_MOVE -> {
        if (!scaleGestureDetector.isInProgress && isDragging && event.pointerCount == 1) {
          val dx = event.x - lastTouchX
          val dy = event.y - lastTouchY

          currentYaw += dx * panSensitivity
          currentPitch = clamp(currentPitch - dy * panSensitivity, minPitch, maxPitch)

          lastTouchX = event.x
          lastTouchY = event.y

          applyCameraRotation()
          emitRotation()
        }
      }

      MotionEvent.ACTION_POINTER_UP -> {
        if (event.pointerCount - 1 == 1) {
          val remainingPointer = if (event.actionIndex == 0) 1 else 0
          lastTouchX = event.getX(remainingPointer)
          lastTouchY = event.getY(remainingPointer)
          isDragging = true
        }
      }

      MotionEvent.ACTION_UP,
      MotionEvent.ACTION_CANCEL -> {
        isDragging = false
      }
    }
  }

  private fun applyCameraRotation() {
    sceneView.cameraNode.rotation = Rotation(x = currentPitch, y = currentYaw, z = 0f)
  }

  private fun applyCameraProjection() {
    sceneView.cameraNode.setProjection(
      currentFov.toDouble(),
      near = 0.01f,
      far = 500f,
      direction = Camera.Fov.VERTICAL
    )
  }

  private fun emitRotation() {
    onRotationChange(
      mapOf(
        "yaw" to currentYaw,
        "pitch" to currentPitch
      )
    )
  }

  override fun onDetachedFromWindow() {
    loadTextureJob?.cancel()
    currentMaterial?.let { sceneView.materialLoader.destroyMaterialInstance(it) }
    currentTexture?.let { sceneView.engine.safeDestroyTexture(it) }
    currentMaterial = null
    currentTexture = null
    viewScope.cancel()
    super.onDetachedFromWindow()
  }

  private fun clamp(value: Float, minValue: Float, maxValue: Float): Float {
    return max(minValue, min(value, maxValue))
  }
}
