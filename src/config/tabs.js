import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Storybook from '../screens/Storybook'
import HomeStack from './routes'

const TabNavigator = createBottomTabNavigator({
  Storybook,
  Home: HomeStack,
})

export default createAppContainer(TabNavigator)
