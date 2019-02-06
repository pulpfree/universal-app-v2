import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Storybook from '../screens/Storybook'
import HomeStack from './routes'
import JobSheet from '../modules/jobsheet/screens/JobSheet'

const TabNavigator = createBottomTabNavigator({
  JobSheet: {
    screen: JobSheet,
    navigationOptions: {
      title: 'Job Sheet',
    },
  },
  Storybook,
  Home: HomeStack,
})

export default createAppContainer(TabNavigator)
