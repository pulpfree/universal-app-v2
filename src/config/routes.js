import { createStackNavigator } from 'react-navigation'

import Quotes from '../screens/Quotes'


export default createStackNavigator(
  {
    Quotes: {
      screen: Quotes,
      headerTitle: 'Home',
    },
  },
  {
    initialRouteName: 'Quotes',
  }
)
