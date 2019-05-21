import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { PERSIST_JOBSHEET } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../../customer/queries'

import clr from '../../../../config/colors'
import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Header } from '../../../common/components/Header'
import { prepareAddress } from '../../utils'

function JobSheetExisting({ customer, navigation }) {
  return (
    <React.Fragment>
      <Header label="Create From Current Address" padTop={false} />
      <View style={styles.addressContainer}>
        <Text style={styles.addressCell}>
          {customer.name.first}
          &nbsp;
          {customer.name.last}
        </Text>
        <Text style={styles.addressCell}>
          {customer.address.street1}
          ,&nbsp;
          {customer.address.city}
          ,&nbsp;
          {customer.address.provinceCode}
        </Text>
        <Text style={styles.addressCell}>{customer.address.postalCode}</Text>
        <Mutation
          mutation={PERSIST_JOBSHEET}
          refetchQueries={[
            { query: CUSTOMER_DATA, variables: { customerID: customer._id } },
          ]}
          onCompleted={data => navigation.navigate('JobSheet', { jobSheetID: data.jobSheetPersist._id })}
        >
          {(persistJobSheet, { error, loading }) => (
            <React.Fragment>
              <Button
                disabled={loading}
                onPress={() => {
                  persistJobSheet({
                    variables: {
                      jobSheetInput: {
                        customerID: customer._id,
                      },
                      addressInput: prepareAddress(customer.address, customer._id),
                    },
                  })
                }}
                title={loading ? 'Stand by...' : 'Create'}
                buttonStyle={{
                  backgroundColor: clr.primary,
                }}
                style={{ width: 200 }}
                icon={{
                  name: 'ios-send',
                  type: 'ionicon',
                  color: 'white',
                }}
              />
              {error && <Error error={error} />}
            </React.Fragment>
          )}
        </Mutation>
      </View>
    </React.Fragment>
  )
}
JobSheetExisting.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(JobSheetExisting)
