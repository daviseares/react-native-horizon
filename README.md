# react-native-horizon

React Native library for rendering equirectangular 360 images with a typed API and native performance.

Official documentation: https://daviseares.github.io/react-native-horizon/

## Current status

- iOS: native 360 viewer with SceneKit (remote loading, pan, pinch zoom, events).
- Android: native rendering with SceneView/Filament pipeline, including camera controls and events.

## Installation

### Expo project (recommended)

```bash
npx expo install react-native-horizon
```

This library ships native code, so use a development build (Expo Go is not supported):

```bash
npx expo run:ios
# or
npx expo run:android
```

If your Expo project does not have `ios/` and `android/` directories yet:

```bash
npx expo prebuild
```

### React Native CLI project

Install Expo Modules support first:

```bash
npm install expo
npx install-expo-modules@latest
```

Then install the library:

```bash
npm install react-native-horizon
```

Install iOS pods:

```bash
npx pod-install ios
```

## Usage

```tsx
import { ReactNativeHorizonView } from 'react-native-horizon';

export function Panorama() {
  return (
    <ReactNativeHorizonView
      source={{ uri: 'https://example.com/panorama.jpg' }}
      initialYaw={15}
      initialPitch={0}
      onLoad={({ nativeEvent }) => {
        console.log('Loaded:', nativeEvent.url);
      }}
      onRotationChange={({ nativeEvent }) => {
        console.log('yaw=', nativeEvent.yaw, 'pitch=', nativeEvent.pitch);
      }}
      style={{ flex: 1 }}
    />
  );
}
```

## Props

- `source?: ImageSourcePropType | { uri: string }` - preferred source prop. Supports remote URLs, local files (`file://`), Android content URIs (`content://`), and bundled assets (`require(...)`).
- `sourceURL?: string` - backward-compatible string source. If both `source` and `sourceURL` are provided, `sourceURL` takes precedence.
- `initialYaw?: number` - initial horizontal angle in degrees.
- `initialPitch?: number` - initial vertical angle in degrees.
- `initialFov?: number` - initial field-of-view in degrees (smaller values zoom in).
- `onLoad?: ({ nativeEvent: { url } }) => void` - triggered after texture loading completes.
- `onRotationChange?: ({ nativeEvent: { yaw, pitch } }) => void` - triggered when rotation changes.
- `style?: StyleProp<ViewStyle>` - native container style.

## Development

```bash
bun install
bun run build
```

To run the example:

```bash
cd example
npm run ios
# or
npm run android
```
