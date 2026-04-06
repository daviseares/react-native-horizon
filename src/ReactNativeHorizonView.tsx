import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeHorizonViewProps } from './ReactNativeHorizon.types';

const NativeView: React.ComponentType<ReactNativeHorizonViewProps> =
  requireNativeView('ReactNativeHorizon');

export default function ReactNativeHorizonView(props: ReactNativeHorizonViewProps) {
  return <NativeView {...props} />;
}
