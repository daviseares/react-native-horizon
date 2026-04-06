# Exemplo Rapido

Este exemplo mostra carregamento, ponto inicial e leitura de rotacao.

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
        sourceURL="https://cdna.artstation.com/p/assets/panos/images/013/265/080/large/romain-baudet-room-4k.jpg?1538812334"
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

## Dica de enquadramento inicial

- Mais zoom in: reduza `initialFov`.
- Mais zoom out: aumente `initialFov`.
- Comeco horizontal: ajuste `initialYaw`.
- Comeco vertical: ajuste `initialPitch`.
