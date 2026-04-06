# Introducao

`react-native-horizon` e uma biblioteca para visualizar imagens 360 equirretangulares em React Native.

## Instalacao

```bash
bun add react-native-horizon
```

ou

```bash
npm install react-native-horizon
```

## Requisitos

- Expo Modules
- React Native
- URL HTTPS para a imagem panoramica

## Primeiro uso

```tsx
import { ReactNativeHorizonView } from 'react-native-horizon';

export function Panorama() {
  return (
    <ReactNativeHorizonView
      sourceURL="https://example.com/panorama.jpg"
      initialYaw={15}
      initialPitch={0}
      initialFov={75}
      style={{ flex: 1 }}
    />
  );
}
```

Se a cena abrir com zoom indesejado, aumente `initialFov` (ex.: `80`, `85`).
