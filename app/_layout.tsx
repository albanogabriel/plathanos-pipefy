import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import client from '@/src/config/apollo'
import { ApolloProvider } from '@apollo/client'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <ApolloProvider client={client}>
      {/* <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      {/* </ThemeProvider> */}
    </ApolloProvider>
  )
}
