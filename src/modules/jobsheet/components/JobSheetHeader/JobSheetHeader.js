import React from 'react'
import PropTypes from 'prop-types'
import {
  AlertIOS,
  Text,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'

import styles from './styles'
import { CUSTOMER_DATA } from '../../../customer/queries'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import { REMOVE_JOBSHEET } from '../../mutations/remote'

const Header = ({ jobSheet }) => (
  <View style={styles.headerCont}>
    <Text style={styles.headerText}>
      {jobSheet.customerID.name.first}
      &nbsp;
      {jobSheet.customerID.name.last}
      &nbsp;&mdash;&nbsp;
      {jobSheet.addressID.street1}
      ,&nbsp;
      {jobSheet.addressID.city}
    </Text>
  </View>
)
Header.propTypes = {
  jobSheet: PropTypes.instanceOf(Object).isRequired,
}

const Menu = ({ jobSheet, navigation }) => {
  const _handleRemove = (func, jobSheetID) => {
    AlertIOS.alert(
      'Confirm Delete Job Sheet',
      'Are you sure you want to delete this job sheet?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            func({ variables: { id: jobSheetID } })
          },
        },
      ]
    )
  }

  return (
    <View style={styles.navBar}>
      <Mutation
        mutation={REMOVE_JOBSHEET}
        onCompleted={() => navigation.goBack()}
        refetchQueries={[
          { query: CUSTOMER_DATA, variables: { customerID: jobSheet.customerID._id } },
        ]}
      >
        {(jobSheetRemove, { error, loading }) => (
          <View style={{ flexDirection: 'column' }}>
            <Button
              disabled={loading}
              onPress={() => _handleRemove(jobSheetRemove, jobSheet._id)}
              icon={{
                containerStyle: styles.navButtonIconCont,
                iconStyle: styles.navButtonIcon,
                name: 'ios-trash',
                size: 35,
                type: 'ionicon',
              }}
              title="Delete"
              type="clear"
              buttonStyle={styles.navButton}
              titleStyle={styles.navButtonTitle}
            />
            {error && <Error error={error} />}
            {loading && <Loader />}
          </View>
        )}
      </Mutation>
      <Button
        icon={{
          containerStyle: styles.navButtonIconCont,
          iconStyle: styles.navButtonIcon,
          name: 'page-multiple',
          size: 30,
          type: 'foundation',
        }}
        title="Create Quote"
        type="clear"
        buttonStyle={styles.navButton}
        titleStyle={styles.navButtonTitle}
      />
    </View>
  )
}
Menu.propTypes = {
  jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}
export { Header, Menu }
