# Eventos

## `onLoad`

Disparado quando a textura panoramica termina de carregar.

Payload:

```ts
{
  url: string;
}
```

## `onRotationChange`

Disparado quando a camera muda de rotacao.

Payload:

```ts
{
  yaw: number;
  pitch: number;
}
```
