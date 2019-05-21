import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'

import { CustomerForm } from '../components/CustomerForm'
import clr from '../../../config/colors'

class CustomerNew extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Icon
          color={clr.white}
          name="map"
          onPress={() => navigation.navigate('AddressLookup')}
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
