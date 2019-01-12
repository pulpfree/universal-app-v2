import React from 'react'
// import PropTypes from 'prop-types'

import {
  // Alert,
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

class QuotePreview extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>Quote Preview</Text>
      </View>
    )
  }
}

export default QuotePreview
