package expo.modules.horizon

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ReactNativeHorizonModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ReactNativeHorizon")

    Constant("PI") {
      Math.PI
    }

    Events("onChange")

    Function("hello") {
      "Hello world! 👋"
    }

    AsyncFunction("setValueAsync") { value: String ->
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    View(ReactNativeHorizonView::class) {
      Prop("sourceURL") { view: ReactNativeHorizonView, sourceURL: String ->
        view.setSourceURL(sourceURL)
      }

      Prop("initialYaw") { view: ReactNativeHorizonView, initialYaw: Float? ->
        view.setInitialYaw(initialYaw ?: 0f)
      }

      Prop("initialPitch") { view: ReactNativeHorizonView, initialPitch: Float? ->
        view.setInitialPitch(initialPitch ?: 0f)
      }

      Prop("initialFov") { view: ReactNativeHorizonView, initialFov: Float? ->
        view.setInitialFov(initialFov)
      }

      Prop("useDeviceOrientation") { view: ReactNativeHorizonView, useDeviceOrientation: Boolean? ->
        view.setUseDeviceOrientation(useDeviceOrientation ?: false)
      }

      Events("onLoad", "onRotationChange")
    }
  }
}
