import { Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export function resolveSourceURL(
  source: ImageSourcePropType | { uri: string } | undefined,
  sourceURL: string | undefined
): string | undefined {
  const trimmed = sourceURL?.trim();
  if (trimmed) {
    return trimmed;
  }

  if (!source) {
    return undefined;
  }

  if (typeof source === 'object' && !Array.isArray(source) && 'uri' in source && typeof source.uri === 'string') {
    return source.uri;
  }

  const resolved = Image.resolveAssetSource(source as ImageSourcePropType);
  return resolved?.uri;
}
