import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'

import { CustomerForm } from '../components/CustomerForm'
import clr from '../../../config/colors'

class CustomerNew extends React.Component {
  static navigationOptions = ({ navigation }) => { // eslint-disable-line arrow-body-style
    return {
      headerRight: (
        <Icon
          color={clr.white}
          name="map"
          onPress={() => navigation.navigate('AddressLookup', { from: 'CustomerNew' })}
          type="font-awesome"
          containerStyle={{ paddingRight: 20 }}
        />
      ),
    }
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <CustomerForm />
      </View>
    )
  }
}

export default CustomerNew
