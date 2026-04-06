# Props

## `source`

- Type: `ImageSourcePropType | { uri: string }`
- Preferred source input.
- Supports remote URLs, local files (`file://`), Android content URIs (`content://`), and bundled assets (`require(...)`).

## `sourceURL`

- Type: `string`
- Optional legacy input.
- If both `source` and `sourceURL` are provided, `sourceURL` takes precedence.

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
