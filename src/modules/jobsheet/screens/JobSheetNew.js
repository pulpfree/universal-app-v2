import React from 'react'
// import PropTypes from 'prop-types'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import { AddressForm } from '../../address/components/AddressForm'
import styles from '../components/JobSheetNew/styles'
import { Header } from '../../common/components/Header'
import { JobSheetExisting } from '../components/JobSheetExisting'

// export default function JobsheetNew({ navigation }) {
class JobSheetNew extends React.Component {
  /* static navigationOptions = {
    headerTitle: 'New Jobsheet',
  } */

  componentDidMount() {
    console.log('componentDidMount in JobSheetNew')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in JobSheetNew')
  }

  render() {
    // const { navigation } = this.props

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ paddingBottom: 260 }}>
          <View style={styles.container}>
            <View style={styles.cell}>
              <JobSheetExisting />
            </View>
            <View style={[styles.cell, { minWidth: 200 }]}>
              <Header label="Create New" padTop={false} />
              <AddressForm />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default JobSheetNew
