import React from 'react'
// import PropTypes from 'prop-types'

import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native'

/* const Quotes = ({ navigation }) => (
  <View>
    <Text>Quote View</Text>
    <Button
      title="Customer Info"
      onPress={() => navigation.navigate('CustomerInfo')}
    />
  </View>
) */

class Quotes extends React.Component {
  static navigationOptions = {
    // headerTitle: 'Quote Search',
    headerRight: (
      <Button
        onPress={() => Alert.alert('This is a button!')}
        title="Info"
        // color="#fff"
      />
    ),
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>New Quote</Text>
        <Button
          title="Customer Info"
          onPress={() => navigation.navigate('CustomerInfo')}
        />
      </View>
    )
  }
}

export default Quotes
