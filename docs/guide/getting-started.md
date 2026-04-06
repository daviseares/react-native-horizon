# Getting Started

`react-native-horizon` is a library for rendering equirectangular 360 images in React Native.

It is built with Expo Modules and includes native iOS/Android code.

## Installation

### Expo project (recommended)

```bash
npx expo install react-native-horizon
```

After installing, create a development build (Expo Go is not supported for custom native modules):

```bash
npx expo run:ios
# or
npx expo run:android
```

If your Expo app does not have `ios/` and `android/` folders yet, generate them with:

```bash
npx expo prebuild
```

You can still keep a managed workflow and let EAS Build handle native generation in CI.

### React Native CLI project

If your project is plain React Native CLI, first enable Expo Modules support:

```bash
npm install expo
npx install-expo-modules@latest
```

Then install this library:

```bash
npm install react-native-horizon
```

Install iOS pods:

```bash
npx pod-install ios
```

## Requirements

- Expo Modules
- React Native
- HTTPS URL for the panorama image

## First usage

```tsx
import { ReactNativeHorizonView } from 'react-native-horizon';

export function Panorama() {
  return (
    <ReactNativeHorizonView
      sourceURL="https://example.com/panorama.jpg"
      initialYaw={15}
      initialPitch={0}
      initialFov={75}
      style={{ flex: 1 }}
    />
  );
}
```

If the scene starts too zoomed in, increase `initialFov` (for example: `80`, `85`).
