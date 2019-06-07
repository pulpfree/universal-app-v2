import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TextInput,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { PERSIST_NOTES } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../queries'

import styles from './styles'
import { Error } from '../../../common/components/Error'
import { ModalHeader } from '../../../common/components/ModalHeader'

function Notes({ navigation }) {
  const customer = navigation.getParam('customer')
  const customerID = customer._id

  const [notes, setNotes] = useState(customer.notes)
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Customer Notes" />

        <View style={styles.formCont}>
          <View style={styles.formRow}>
            <View style={styles.formCell}>
              <Text style={styles.formLabel}>Enter Notes</Text>
              <TextInput
                multiline
                onChangeText={text => setNotes(text)}
                style={[styles.textInput, { height: 120, width: 350, lineHeight: 20 }]}
                value={notes}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <Mutation
              mutation={PERSIST_NOTES}
              onCompleted={() => navigation.navigate('CustomerInfo', { customerID })}
              refetchQueries={[
                { query: CUSTOMER_DATA, variables: { customerID } },
              ]}
            >
              {(customerPersistNotes, { error, loading }) => {
                if (error) setErrorMsg(error)
                return (
                  <Button
                    disabled={loading}
                    onPress={() => customerPersistNotes(
                      { variables: { id: customerID, notes } }
                    )}
                    title="Save Notes"
                    buttonStyle={styles.submitButton}
                    containerStyle={styles.submitButtonCont}
                    icon={{
                      name: 'ios-send',
                      type: 'ionicon',
                      color: 'white',
                    }}
                  />
                )
              }}
            </Mutation>
          </View>
        </View>
        <View style={{ marginTop: 10, flex: 1 }}>
          {errorMsg !== '' && <Error error={errorMsg} />}
        </View>
      </View>
    </View>
  )
}
Notes.propTypes = {
  // jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(Notes)
