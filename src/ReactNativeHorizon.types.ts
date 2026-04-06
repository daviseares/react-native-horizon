import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type OnRotationChangeEventPayload = {
  yaw: number;
  pitch: number;
};

export type ReactNativeHorizonViewProps = {
  sourceURL: string;
  initialYaw?: number;
  initialPitch?: number;
  initialFov?: number;
  useDeviceOrientation?: boolean;
  onLoad?: (event: { nativeEvent: OnLoadEventPayload }) => void;
  onRotationChange?: (event: { nativeEvent: OnRotationChangeEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
