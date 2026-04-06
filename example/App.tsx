import { useMemo, useState } from 'react';
import { ReactNativeHorizonView } from 'react-native-horizon';
import { Button, SafeAreaView, Text, View } from 'react-native';

const DEMO_PANORAMA =
  'https://cdna.artstation.com/p/assets/panos/images/013/265/080/large/romain-baudet-room-4k.jpg?1538812334';

export default function App() {
  const [viewerKey, setViewerKey] = useState(0);
  const [yaw, setYaw] = useState(15);
  const [pitch, setPitch] = useState(0);

  const rotationLabel = useMemo(() => {
    return `yaw ${yaw.toFixed(1)} | pitch ${pitch.toFixed(1)}`;
  }, [pitch, yaw]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Horizon iOS Test</Text>
        <Button title="Reset" onPress={() => setViewerKey((value) => value + 1)} />
      </View>

      <Text style={styles.caption}>{rotationLabel}</Text>

      <ReactNativeHorizonView
        key={viewerKey}
        source={{ uri: DEMO_PANORAMA }}
        initialYaw={96.2}
        initialPitch={-16.3}
        initialFov={85}
        onLoad={({ nativeEvent: { url } }) => console.log(`Loaded: ${url}`)}
        onRotationChange={({ nativeEvent }) => {
          setYaw(nativeEvent.yaw);
          setPitch(nativeEvent.pitch);
          console.log(`Rotation yaw=${nativeEvent.yaw} pitch=${nativeEvent.pitch}`);
        }}
        style={styles.view}
      />
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  caption: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  view: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden' as const,
  },
};
