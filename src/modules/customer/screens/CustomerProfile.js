import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { CustomerForm } from '../components/CustomerForm'

const CustomerProfile = ({ navigation }) => {
  const customer = navigation.getParam('customer', null)

  return (
    <View style={{ marginTop: 20 }}>
      <CustomerForm customerData={customer} />
    </View>
  )
}
CustomerProfile.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(CustomerProfile)
