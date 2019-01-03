import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Customers from '../screens/Customers'
import Quotes from '../screens/Quotes'
import Storybook from '../screens/Storybook'

const TabNavigator = createBottomTabNavigator({
  Storybook,
  Quotes,
  Customers,
})

export default createAppContainer(TabNavigator)
