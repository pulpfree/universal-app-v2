import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Customers from '../screens/Customers'
import Quotes from '../screens/Quotes'

const TabNavigator = createBottomTabNavigator({
  Quotes,
  Customers,
})

export default createAppContainer(TabNavigator)
