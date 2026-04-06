# Getting Started

`react-native-horizon` is a library for rendering equirectangular 360 images in React Native.

## Installation

```bash
bun add react-native-horizon
```

or

```bash
npm install react-native-horizon
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
