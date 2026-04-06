import * as React from 'react';
import { View } from 'react-native';

import { ReactNativeHorizonViewProps } from './ReactNativeHorizon.types';
import { resolveSourceURL } from './resolveSourceURL';

export default function ReactNativeHorizonView(props: ReactNativeHorizonViewProps) {
  const resolvedSourceURL = resolveSourceURL(props.source, props.sourceURL);

  if (!resolvedSourceURL) {
    return null;
  }

  return (
    <View style={props.style}>
      <iframe
        style={{ border: 'none', width: '100%', height: '100%' }}
        src={resolvedSourceURL}
        onLoad={() => props.onLoad?.({ nativeEvent: { url: resolvedSourceURL } })}
      />
    </View>
  );
}
