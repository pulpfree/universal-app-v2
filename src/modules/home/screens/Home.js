import React from 'react'
import PropTypes from 'prop-types'

import {
  // Button,
  // Text,
  View,
} from 'react-native'

// import { Button, Icon } from 'react-native-elements'

// import clr from '../../../config/colors'
import { Menu } from '../components/Menu'

const Home = ({ navigation }) => (

  <View
    style={{
      flexDirection: 'row',
    }}
  >
    <View
      style={{
        flex: 1,
      }}
    />
    <View
      style={{
        flex: 0.75,
        flexDirection: 'column',
        justifyContent: 'center',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // alignContent: 'center',
        // width: 200,
        height: 400,
        // margin: 'auto',
      }}
    >
      <Menu navigation={navigation} />
    </View>
    <View
      style={{
        flex: 1,
      }}
    />
  </View>
)
Home.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}
export default Home
