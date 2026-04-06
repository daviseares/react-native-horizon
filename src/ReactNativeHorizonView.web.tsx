import * as React from 'react';
import { View } from 'react-native';

import { ReactNativeHorizonViewProps } from './ReactNativeHorizon.types';

export default function ReactNativeHorizonView(props: ReactNativeHorizonViewProps) {
  return (
    <View style={props.style}>
      <iframe
        style={{ border: 'none', width: '100%', height: '100%' }}
        src={props.sourceURL}
        onLoad={() => props.onLoad?.({ nativeEvent: { url: props.sourceURL } })}
      />
    </View>
  );
}
