import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'

import { TOGGLE_ACTIVE_CUSTOMER } from '../../mutations/remote'

import styles from './styles'
import { Error } from '../../../common/components/Error'
import { ModalHeader } from '../../../common/components/ModalHeader'

function ToggleActive({ navigation }) {
  const [errorMsg, setErrorMsg] = useState('')

  const customer = navigation.getParam('customer')
  const { address } = customer
  const toggleLabel = customer.active ? 'Deactivate' : 'Activate'

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Toggle Customer Active Status" />

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

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Active Status</Text>
              <Text style={styles.infoValue}>
                {customer.active ? 'Active' : 'Inactive'}
              </Text>
            </View>

          </View>
        </View>

        <View style={styles.formCont}>
          <Text style={styles.warnText}>
            {`Are you certain you want to ${toggleLabel} this customer?`}
          </Text>
          <View style={styles.buttonRow}>
            <Mutation
              mutation={TOGGLE_ACTIVE_CUSTOMER}
              onCompleted={() => navigation.navigate('CustomerSearch')}
            >
              {(customerToggleActive, { error, loading }) => {
                if (error) setErrorMsg(error)
                return (
                  <Button
                    buttonStyle={styles.button}
                    disabled={loading || errorMsg !== ''}
                    onPress={() => customerToggleActive(
                      { variables: { id: customer._id } }
                    )}
                    title={loading ? 'Loading...' : `Yes ${toggleLabel} Customer`}
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
ToggleActive.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(ToggleActive)
