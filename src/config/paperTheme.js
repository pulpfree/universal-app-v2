import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import clr from './colors'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: clr.primary,
    accent: '#f1c40f',
  },
}

export default theme
