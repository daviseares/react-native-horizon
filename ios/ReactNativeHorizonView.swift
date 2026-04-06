import ExpoModulesCore
import CoreMotion
import SceneKit

class ReactNativeHorizonView: ExpoView {
  private let scnView = SCNView()
  private let scene = SCNScene()
  private let cameraNode = SCNNode()
  private let sphereNode = SCNNode()
  private let motionManager = CMMotionManager()
  private let motionQueue = OperationQueue()

  let onLoad = EventDispatcher()
  let onRotationChange = EventDispatcher()

  private var currentYawDegrees: Float = 0
  private var currentPitchDegrees: Float = 0
  private var baseYawDegrees: Float = 0
  private var basePitchDegrees: Float = 0
  private var deviceYawDegrees: Float = 0
  private var devicePitchDegrees: Float = 0
  private var useDeviceOrientation = false
  private var currentSourceURL: String?
  private var textureTask: URLSessionDataTask?

  private let panSensitivity: Float = 0.2
  private let minPitch: Float = -89
  private let maxPitch: Float = 89
  private let minFov: CGFloat = 30
  private let maxFov: CGFloat = 100

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    clipsToBounds = true
    motionQueue.qualityOfService = .userInteractive

    setupScene()
    setupGestures()
  }

  deinit {
    textureTask?.cancel()
    stopDeviceMotionUpdates()
  }

  override func layoutSubviews() {
    scnView.frame = bounds
  }

  func setSourceURL(_ sourceURL: String) {
    guard sourceURL != currentSourceURL else {
      return
    }

    currentSourceURL = sourceURL
    textureTask?.cancel()

    guard let url = URL(string: sourceURL) else {
      return
    }

    let request = URLRequest(url: url, cachePolicy: .returnCacheDataElseLoad, timeoutInterval: 60)
    textureTask = URLSession.shared.dataTask(with: request) { [weak self] data, _, error in
      guard let self else {
        return
      }

      if error != nil {
        return
      }

      guard let data,
            let image = UIImage(data: data) else {
        return
      }

      DispatchQueue.main.async {
        guard sourceURL == self.currentSourceURL else {
          return
        }
        self.applyPanoramaImage(image, sourceURL: sourceURL)
      }
    }

    textureTask?.resume()
  }

  func setInitialYaw(_ yaw: Float) {
    baseYawDegrees = yaw
    updateCombinedRotation(emitEvent: false)
  }

  func setInitialPitch(_ pitch: Float) {
    basePitchDegrees = clamp(pitch, min: minPitch, max: maxPitch)
    updateCombinedRotation(emitEvent: false)
  }

  func setInitialFov(_ fov: Float?) {
    guard let fov,
          let camera = cameraNode.camera else {
      return
    }

    camera.fieldOfView = clamp(CGFloat(fov), min: minFov, max: maxFov)
  }

  func setUseDeviceOrientation(_ enabled: Bool) {
    guard useDeviceOrientation != enabled else {
      return
    }

    useDeviceOrientation = enabled
    if enabled {
      startDeviceMotionUpdates()
    } else {
      stopDeviceMotionUpdates()
      deviceYawDegrees = 0
      devicePitchDegrees = 0
      updateCombinedRotation(emitEvent: false)
    }
  }

  private func setupScene() {
    scnView.scene = scene
    scnView.backgroundColor = .black
    scnView.isPlaying = true
    scnView.autoenablesDefaultLighting = false
    scnView.rendersContinuously = true

    let sphere = SCNSphere(radius: 10)
    sphere.segmentCount = 160
    sphere.firstMaterial?.isDoubleSided = true
    sphere.firstMaterial?.cullMode = .front
    sphere.firstMaterial?.diffuse.contentsTransform = SCNMatrix4MakeScale(-1, 1, 1)
    sphere.firstMaterial?.diffuse.wrapS = .repeat

    sphereNode.geometry = sphere
    sphereNode.position = SCNVector3(0, 0, 0)
    scene.rootNode.addChildNode(sphereNode)

    let camera = SCNCamera()
    camera.fieldOfView = 75
    camera.zNear = 0.01
    camera.zFar = 100

    cameraNode.camera = camera
    cameraNode.position = SCNVector3(0, 0, 0)
    scene.rootNode.addChildNode(cameraNode)

    scnView.pointOfView = cameraNode
    addSubview(scnView)

    updateCombinedRotation(emitEvent: false)
  }

  private func setupGestures() {
    let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePan(_:)))
    let pinchGesture = UIPinchGestureRecognizer(target: self, action: #selector(handlePinch(_:)))
    scnView.addGestureRecognizer(panGesture)
    scnView.addGestureRecognizer(pinchGesture)
  }

  @objc
  private func handlePan(_ gesture: UIPanGestureRecognizer) {
    let translation = gesture.translation(in: scnView)

    baseYawDegrees -= Float(translation.x) * panSensitivity
    basePitchDegrees = clamp(basePitchDegrees - Float(translation.y) * panSensitivity, min: minPitch, max: maxPitch)

    updateCombinedRotation(emitEvent: true)
    gesture.setTranslation(.zero, in: scnView)
  }

  @objc
  private func handlePinch(_ gesture: UIPinchGestureRecognizer) {
    guard let camera = cameraNode.camera else {
      return
    }

    let nextFov = clamp(camera.fieldOfView / gesture.scale, min: minFov, max: maxFov)
    camera.fieldOfView = nextFov
    gesture.scale = 1
  }

  private func applyPanoramaImage(_ image: UIImage, sourceURL: String) {
    if let material = sphereNode.geometry?.firstMaterial {
      material.diffuse.contents = image
      material.diffuse.mipFilter = .linear
      material.diffuse.minificationFilter = .linear
      material.diffuse.magnificationFilter = .linear
    }

    onLoad(["url": sourceURL])
  }

  private func startDeviceMotionUpdates() {
    guard motionManager.isDeviceMotionAvailable else {
      return
    }

    motionManager.deviceMotionUpdateInterval = 1.0 / 60.0
    motionManager.startDeviceMotionUpdates(using: .xArbitraryCorrectedZVertical, to: motionQueue) { [weak self] motion, _ in
      guard let self,
            let motion,
            self.useDeviceOrientation else {
        return
      }

      let yawDegrees = Float(-motion.attitude.yaw * 180.0 / .pi)
      let pitchDegrees = Float(motion.attitude.pitch * 180.0 / .pi)

      DispatchQueue.main.async {
        guard self.useDeviceOrientation else {
          return
        }
        self.deviceYawDegrees = yawDegrees
        self.devicePitchDegrees = pitchDegrees
        self.updateCombinedRotation(emitEvent: true)
      }
    }
  }

  private func stopDeviceMotionUpdates() {
    if motionManager.isDeviceMotionActive {
      motionManager.stopDeviceMotionUpdates()
    }
  }

  private func updateCombinedRotation(emitEvent: Bool) {
    currentYawDegrees = baseYawDegrees + deviceYawDegrees
    currentPitchDegrees = clamp(basePitchDegrees + devicePitchDegrees, min: minPitch, max: maxPitch)
    applyCameraRotation(emitEvent: emitEvent)
  }

  private func applyCameraRotation(emitEvent: Bool) {
    let yawRadians = currentYawDegrees * .pi / 180
    let pitchRadians = currentPitchDegrees * .pi / 180
    cameraNode.eulerAngles = SCNVector3(pitchRadians, yawRadians, 0)

    if emitEvent {
      onRotationChange([
        "yaw": currentYawDegrees,
        "pitch": currentPitchDegrees
      ])
    }
  }

  private func clamp<T: Comparable>(_ value: T, min: T, max: T) -> T {
    if value < min {
      return min
    }
    if value > max {
      return max
    }
    return value
  }
}
