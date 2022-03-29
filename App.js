import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useWebSocket from 'react-use-websocket'

export default function App() {

  const { lastJsonMessage } = useWebSocket(``, {

  })

  return (
    <View style={styles.container}>
      <Text>Testando!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
