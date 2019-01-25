import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import { Menu } from '../components/Menu'
import { Welcome } from '../components/Welcome'

const Home = ({ navigation }) => (

  <View
    style={{
      flexDirection: 'row',
    }}
  >
    <View
      style={{
        flex: 0.75,
      }}
    />
    <View
      style={{
        flex: 1.5,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 400,
        maxWidth: 600,
      }}
    >
      <Welcome />
      <Menu navigation={navigation} />
    </View>
    <View
      style={{
        flex: 0.75,
      }}
    />
  </View>
)
Home.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}
export default Home
