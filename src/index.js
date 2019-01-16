import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

// import Navigator from './config/tabs'
import Navigator from './config/routes'
import theme from './config/paperTheme'

export default () => (
  <PaperProvider theme={theme}>
    <Navigator onNavigationStateChange={null} />
  </PaperProvider>
)
