import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Storybook from '../screens/Storybook'
import HomeStack from './routes'
import JobSheet from '../modules/jobsheet/screens/JobSheet'
import TestApollo from '../modules/jobsheet/screens/TestApollo'

const TabNavigator = createBottomTabNavigator({
  Storybook,
  /* JobSheet: {
    screen: JobSheet,
    navigationOptions: {
      title: 'Job Sheet',
    },
  }, */
  TestApollo,
  Home: HomeStack,
})

export default createAppContainer(TabNavigator)
