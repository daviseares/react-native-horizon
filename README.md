# react-native-horizon

React Native library for rendering equirectangular 360 images with a typed API and native performance.

Official documentation: https://daviseares.github.io/react-native-horizon/

## Current status

- iOS: native 360 viewer with SceneKit (remote loading, pan, pinch zoom, events).
- Android: native rendering with SceneView/Filament pipeline, including camera controls and events.
- Web: simple fallback via `iframe`.

## Installation

```bash
bun add react-native-horizon
```

or

```bash
npm install react-native-horizon
```

## Usage

```tsx
import { ReactNativeHorizonView } from 'react-native-horizon';

export function Panorama() {
  return (
    <ReactNativeHorizonView
      sourceURL="https://example.com/panorama.jpg"
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

- `sourceURL: string` - HTTPS URL for the panorama image.
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
