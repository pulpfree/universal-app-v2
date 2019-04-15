import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'

import { REMOVE_CUSTOMER } from '../../mutations/remote'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'
import { Error } from '../../../common/components/Error'

function DeleteCustomer({ navigation }) {
  const [errorMsg, setErrorMsg] = useState('')

  const customer = navigation.getParam('customer')
  const { address } = customer

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Delete Customer Confirmation" />

        <View style={styles.infoCont}>
          <View style={styles.infoCell}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customer</Text>
              <Text style={styles.infoValue}>
                {`${customer.name.first} ${customer.name.last}`}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                {`${address.street1}, ${address.city}`}
              </Text>
            </View>

          </View>
        </View>

        <View style={styles.formCont}>
          <Text style={styles.warnText}>Are you certain you want to delete this customer?</Text>
          <View style={styles.buttonRow}>
            <Mutation
              mutation={REMOVE_CUSTOMER}
              onCompleted={() => navigation.navigate('Home')}
            >
              {(customerRemove, { error, loading }) => {
                if (error) setErrorMsg(error)
                return (
                  <Button
                    buttonStyle={styles.button}
                    disabled={loading || errorMsg !== ''}
                    onPress={() => customerRemove({ variables: { id: customer._id } })}
                    title={loading ? 'Loading...' : 'Yes Delete Customer'}
                    titleStyle={styles.buttonTitle}
                    type="solid"
                  />
                )
              }}
            </Mutation>

            <Button
              onPress={() => navigation.goBack()}
              title="Cancel"
              type="solid"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>
        <View style={{ marginTop: 10, flex: 1 }}>
          {errorMsg !== '' && <Error error={errorMsg} />}
        </View>
      </View>
    </View>
  )
}
DeleteCustomer.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(DeleteCustomer)
