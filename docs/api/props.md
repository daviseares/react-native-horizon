# Props

## `sourceURL`

- Tipo: `string`
- Required.
- Equirectangular 360 image URL.

## `initialYaw`

- Type: `number`
- Default: `0`
- Initial horizontal angle in degrees.

## `initialPitch`

- Type: `number`
- Default: `0`
- Initial vertical angle in degrees.

## `initialFov`

- Type: `number`
- Default: platform-defined safe initial value.
- Initial field of view in degrees.
- Smaller value = more zoom in.
- Larger value = more zoom out.

## `useDeviceOrientation`

- Type: `boolean`
- Default: `false`
- Enables device orientation input for yaw/pitch updates.

## `style`

- Type: `StyleProp<ViewStyle>`
- Native container style.
