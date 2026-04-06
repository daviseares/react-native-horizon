import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeHorizonViewProps } from './ReactNativeHorizon.types';
import { resolveSourceURL } from './resolveSourceURL';

const NativeView: React.ComponentType<ReactNativeHorizonViewProps> =
  requireNativeView('ReactNativeHorizon');

export default function ReactNativeHorizonView(props: ReactNativeHorizonViewProps) {
  const { source, sourceURL, ...rest } = props;
  const resolvedSourceURL = resolveSourceURL(source, sourceURL);

  if (!resolvedSourceURL) {
    return null;
  }

  return <NativeView {...rest} sourceURL={resolvedSourceURL} />;
}
