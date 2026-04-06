import { registerWebModule, NativeModule } from 'expo';

class ReactNativeHorizonModule extends NativeModule {
  PI = Math.PI;
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ReactNativeHorizonModule, 'ReactNativeHorizonModule');
