import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import { JobSheetAddressForm } from '../components/JobSheetAddressForm'
import styles from '../components/JobSheetNew/styles'
import { Header } from '../../common/components/Header'
import { JobSheetExisting } from '../components/JobSheetExisting'
import clr from '../../../config/colors'

class JobSheetNew extends React.Component {
  static navigationOptions = ({ navigation }) => { // eslint-disable-line arrow-body-style
    return {
      headerRight: (
        <Icon
          color={clr.white}
          name="map"
          onPress={() => navigation.navigate('AddressLookup', { from: 'JobSheetNew' })}
          type="font-awesome"
          containerStyle={{ paddingRight: 20 }}
        />
      ),
    }
  }

  render() {
    const { navigation } = this.props
    const customer = navigation.getParam('customer')
    const mapParams = navigation.getParam('mapParams', false)

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ paddingBottom: 260 }}>
          <View style={styles.container}>
            <View style={styles.cell}>
              <JobSheetExisting customer={customer} />
            </View>
            <View style={[styles.cell, { minWidth: 200 }]}>
              <Header label="Create New" padTop={false} />
              <JobSheetAddressForm customerID={customer._id} mapParams={mapParams} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
JobSheetNew.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default JobSheetNew
