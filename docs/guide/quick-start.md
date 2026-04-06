# Quick Start

This example shows loading, initial camera framing, and rotation tracking.

```tsx
import { useState } from 'react';
import { ReactNativeHorizonView } from 'react-native-horizon';
import { SafeAreaView, Text } from 'react-native';

export default function Screen() {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{`yaw ${yaw.toFixed(1)} | pitch ${pitch.toFixed(1)}`}</Text>
      <ReactNativeHorizonView
        source={{ uri: 'https://cdna.artstation.com/p/assets/panos/images/013/265/080/large/romain-baudet-room-4k.jpg?1538812334' }}
        initialYaw={20}
        initialPitch={0}
        initialFov={80}
        onLoad={({ nativeEvent }) => {
          console.log('Loaded', nativeEvent.url);
        }}
        onRotationChange={({ nativeEvent }) => {
          setYaw(nativeEvent.yaw);
          setPitch(nativeEvent.pitch);
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
```

## Initial framing tips

- More zoom in: reduce `initialFov`.
- More zoom out: increase `initialFov`.
- Horizontal starting angle: adjust `initialYaw`.
- Vertical starting angle: adjust `initialPitch`.
