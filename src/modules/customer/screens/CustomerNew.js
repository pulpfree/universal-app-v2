import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'

import { CustomerForm } from '../components/CustomerForm'
import clr from '../../../config/colors'

class CustomerNew extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    // headerTitle: <LogoTitle />,
      headerRight: (
        <Icon
          color={clr.white}
          name="map"
          onPress={() => navigation.navigate('AddressLookup')}
          // raised
          // reverse
          // size={15}
          type="font-awesome"
        // iconStyle={{ width: 20 }}
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
