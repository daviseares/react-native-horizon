# Events

## `onLoad`

Triggered when the panorama texture has finished loading.

Payload:

```ts
{
  url: string;
}
```

## `onRotationChange`

Triggered whenever camera rotation changes.

Payload:

```ts
{
  yaw: number;
  pitch: number;
}
```
