import React from 'react'
import PropTypes from 'prop-types'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import { JobSheetAddressForm } from '../components/JobSheetAddressForm'
import styles from '../components/JobSheetNew/styles'
import { Header } from '../../common/components/Header'
import { JobSheetExisting } from '../components/JobSheetExisting'

export default function JobSheetNew({ navigation }) {
  const customer = navigation.getParam('customer')
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView style={{ paddingBottom: 260 }}>
        <View style={styles.container}>
          <View style={styles.cell}>
            <JobSheetExisting customer={customer} />
          </View>
          <View style={[styles.cell, { minWidth: 200 }]}>
            <Header label="Create New" padTop={false} />
            <JobSheetAddressForm customerID={customer._id} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
JobSheetNew.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}
