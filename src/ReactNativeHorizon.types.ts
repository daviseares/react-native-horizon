import type { StyleProp, ViewStyle } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type OnRotationChangeEventPayload = {
  yaw: number;
  pitch: number;
};

export type ReactNativeHorizonViewProps = {
  source?: ImageSourcePropType | { uri: string };
  sourceURL?: string;
  initialYaw?: number;
  initialPitch?: number;
  initialFov?: number;
  useDeviceOrientation?: boolean;
  onLoad?: (event: { nativeEvent: OnLoadEventPayload }) => void;
  onRotationChange?: (event: { nativeEvent: OnRotationChangeEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
