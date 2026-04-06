# react-native-horizon

Biblioteca React Native para visualizacao de imagens 360 (equirretangulares) com foco em performance e API tipada.

Documentacao oficial: https://daviseares.github.io/react-native-horizon/

## Status atual

- iOS: viewer 360 nativo com SceneKit (carregamento remoto, pan, pinch/zoom, eventos).
- Android: bridge da API pronta, implementacao de render 360 ainda em migracao para pipeline SceneView/Filament.
- Web: fallback simples via `iframe`.

## Instalacao

```bash
bun add react-native-horizon
```

ou

```bash
npm install react-native-horizon
```

## Uso

```tsx
import { ReactNativeHorizonView } from 'react-native-horizon';

export function Panorama() {
  return (
    <ReactNativeHorizonView
      sourceURL="https://example.com/panorama.jpg"
      initialYaw={15}
      initialPitch={0}
      onLoad={({ nativeEvent }) => {
        console.log('Loaded:', nativeEvent.url);
      }}
      onRotationChange={({ nativeEvent }) => {
        console.log('yaw=', nativeEvent.yaw, 'pitch=', nativeEvent.pitch);
      }}
      style={{ flex: 1 }}
    />
  );
}
```

## Props

- `sourceURL: string` - URL HTTPS da imagem panoramica.
- `initialYaw?: number` - angulo inicial horizontal em graus.
- `initialPitch?: number` - angulo inicial vertical em graus.
- `initialFov?: number` - zoom inicial em graus de campo de visao (quanto menor, mais zoom).
- `onLoad?: ({ nativeEvent: { url } }) => void` - disparado quando a textura termina de carregar.
- `onRotationChange?: ({ nativeEvent: { yaw, pitch } }) => void` - disparado ao rotacionar.
- `style?: StyleProp<ViewStyle>` - estilo do container nativo.

## Desenvolvimento

```bash
bun install
bun run build
```

Para abrir o exemplo:

```bash
cd example
npm run ios
# ou
npm run android
```
