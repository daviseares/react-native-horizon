# Props

## `sourceURL`

- Tipo: `string`
- Obrigatoria.
- URL da imagem 360 equirretangular.

## `initialYaw`

- Tipo: `number`
- Padrao: `0`
- Angulo horizontal inicial em graus.

## `initialPitch`

- Tipo: `number`
- Padrao: `0`
- Angulo vertical inicial em graus.

## `initialFov`

- Tipo: `number`
- Padrao: plataforma define valor inicial seguro.
- Campo de visao inicial em graus.
- Menor valor = mais zoom in.
- Maior valor = mais zoom out.

## `useDeviceOrientation`

- Tipo: `boolean`
- Padrao: `false`
- Ativa orientacao do dispositivo para controlar yaw/pitch.

## `style`

- Tipo: `StyleProp<ViewStyle>`
- Estilo do container nativo.
