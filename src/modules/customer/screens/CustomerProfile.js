import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
// import { withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import { CustomerForm } from '../components/CustomerForm'
import clr from '../../../config/colors'

class CustomerProfile extends React.Component {
  static navigationOptions = ({ navigation }) => { // eslint-disable-line arrow-body-style
    return {
      headerRight: (
        <Icon
          color={clr.white}
          name="map"
          onPress={() => navigation.navigate('AddressLookup', { from: 'CustomerProfile' })}
          type="font-awesome"
          containerStyle={{ paddingRight: 20 }}
        />
      ),
    }
  }

  render() {
    const { navigation } = this.props
    const customer = navigation.getParam('customer', null)

    return (
      <View style={{ marginTop: 20 }}>
        <CustomerForm customerData={customer} />
      </View>
    )
  }
}
CustomerProfile.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default CustomerProfile
