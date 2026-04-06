import ExpoModulesCore

public class ReactNativeHorizonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeHorizon")

    Constant("PI") {
      Double.pi
    }

    Events("onChange")

    Function("hello") {
      return "Hello world! 👋"
    }

    AsyncFunction("setValueAsync") { (value: String) in
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    View(ReactNativeHorizonView.self) {
      Prop("sourceURL") { (view: ReactNativeHorizonView, sourceURL: String) in
        view.setSourceURL(sourceURL)
      }

      Prop("initialYaw") { (view: ReactNativeHorizonView, initialYaw: Float?) in
        view.setInitialYaw(initialYaw ?? 0)
      }

      Prop("initialPitch") { (view: ReactNativeHorizonView, initialPitch: Float?) in
        view.setInitialPitch(initialPitch ?? 0)
      }

      Prop("initialFov") { (view: ReactNativeHorizonView, initialFov: Float?) in
        view.setInitialFov(initialFov)
      }

      Prop("useDeviceOrientation") { (view: ReactNativeHorizonView, useDeviceOrientation: Bool?) in
        view.setUseDeviceOrientation(useDeviceOrientation ?? false)
      }

      Events("onLoad", "onRotationChange")
    }
  }
}
