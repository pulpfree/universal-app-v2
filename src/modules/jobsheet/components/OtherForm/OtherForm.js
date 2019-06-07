import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { withNavigation } from 'react-navigation'
import {
  compose,
  graphql,
  Mutation,
  Query,
} from 'react-apollo'

import {
  CLEAR_OTHER,
  SET_OTHER_FIELD,
} from '../../mutations/local'
import { OTHER_QUERY } from '../../queries/local'
import { JOBSHEET_DATA } from '../../queries'
import { PERSIST_OTHER, REMOVE_OTHER } from '../../mutations/remote'

import * as jsc from '../../config/jobSheetConstants'
import styles from './styles'
import { FormHeader } from '../FormHeader'
import { Error } from '../../../common/components/Error'
import { prepareOtherDoc } from '../../utils'

function OtherForm({
  clearOther,
  navigation,
  setOtherField,
}) {
  useEffect(() => (
    () => {
      clearOther()
    }
  ), [])

  const [errorMsg, setErrorMsg] = useState('')

  const _handleRemove = (func, otherID) => {
    Alert.alert(
      'Confirm Delete Other Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            func({ variables: { id: otherID } })
          },
        },
      ]
    )
  }

  return (
    <Query query={OTHER_QUERY}>
      {({ error, data: { other } }) => {
        if (error) return <Error error={error} />
        return (
          <KeyboardAwareScrollView style={styles.formCont}>
            <FormHeader label="Details" />
            <View style={styles.formRow}>
              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Qty</Text>
                <Picker
                  itemStyle={styles.pickerItemSm}
                  onValueChange={value => setOtherField('qty', value)}
                  selectedValue={other.qty}
                  style={styles.pickerSm}
                >
                  {jsc.Qty.map(n => (
                    <Picker.Item
                      key={n}
                      label={n.toString()}
                      value={n}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Description</Text>
                <TextInput
                  multiline
                  onChangeText={value => setOtherField('description', value)}
                  style={styles.detailBoxInput}
                  value={other.description}
                />
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Details</Text>
                <TextInput
                  multiline
                  onChangeText={value => setOtherField('specs.options', value)}
                  style={styles.detailBoxInput}
                  value={other.specs.options}
                />
              </View>

              <View style={styles.formCell}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectRooms', { rooms: other.rooms, type: 'other' })}>
                  <Text style={[styles.cellLabel, styles.modalLinkText]}>Rooms</Text>
                </TouchableOpacity>
                <TextInput
                  allowFontScaling={false}
                  editable={false}
                  style={[styles.dimInput, { width: 104 }]}
                  value={other.rooms.join(', ')}
                />
              </View>
            </View>

            <FormHeader label="Summary" />
            <View style={styles.formDetails}>
              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Unit Cost</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setOtherField('costs.extendUnit', value)}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={other.costs.extendUnit.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.detailTextLabel, { fontSize: 16, fontWeight: '700' }]}
                >
                  Extended Cost
                </Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={other.costs.extendTotal.toString()}
                />
              </View>
            </View>

            {errorMsg !== '' && (
              <View style={{ marginTop: 10 }}>
                <Error error={errorMsg} />
              </View>
            )}

            <View style={styles.buttonRow}>
              <Mutation
                mutation={REMOVE_OTHER}
                onCompleted={() => navigation.goBack()}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: other.jobsheetID } },
                ]}
              >
                {(jobSheetRemoveOther, { error: remError, loading }) => {
                  if (remError) setErrorMsg(remError)
                  return (
                    <Button
                      buttonStyle={styles.submitButtonSecondary}
                      disabled={!other.otherID || loading}
                      icon={{
                        name: 'ios-trash',
                        type: 'ionicon',
                        color: 'white',
                      }}
                      onPress={() => _handleRemove(jobSheetRemoveOther, other.otherID)}
                      style={{ width: 200 }}
                      title={loading ? 'Stand by...' : 'Delete Item'}
                    />
                  )
                }}
              </Mutation>
              <Mutation
                mutation={PERSIST_OTHER}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: other.jobsheetID } },
                ]}
                onCompleted={() => navigation.goBack()}
              >
                {(persistOther, { error: saveError, loading }) => {
                  if (saveError) setErrorMsg(saveError)
                  return (
                    <Button
                      buttonStyle={styles.submitButton}
                      disabled={loading || !other.costs.extendTotal}
                      icon={{
                        name: 'ios-send',
                        type: 'ionicon',
                        color: 'white',
                      }}
                      onPress={() => {
                        persistOther({ variables: { input: prepareOtherDoc(other) } })
                      }}
                      style={{ width: 200 }}
                      title={loading ? 'Stand by...' : 'Save Item'}
                    />
                  )
                }}
              </Mutation>
            </View>
          </KeyboardAwareScrollView>
        )
      }}
    </Query>
  )
}
OtherForm.propTypes = {
  clearOther: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setOtherField: PropTypes.func.isRequired,
}

const SetField = graphql(SET_OTHER_FIELD, {
  props: ({ mutate }) => ({
    setOtherField: (field, value) => mutate({ variables: { field, value } }),
  }),
})

const ClearOther = graphql(CLEAR_OTHER, {
  props: ({ mutate }) => ({
    clearOther: () => mutate(),
  }),
})

export default compose(
  ClearOther,
  SetField,
  withNavigation,
)(OtherForm)
