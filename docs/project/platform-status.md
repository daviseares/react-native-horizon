# Platform Status

## iOS

- Native rendering with SceneKit.
- Supports remote image loading, pan, pinch zoom, initial yaw/pitch, and events.

## Android

- Native rendering with SceneView/Filament.
- Supports remote image loading, pan, pinch zoom, initial yaw/pitch/fov, and events.
- Recent initialization fixes ensure `initialFov` is respected on first load.

## Web

- Simple fallback via `iframe`.
