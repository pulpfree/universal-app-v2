import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  AlertIOS,
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
  CLEAR_WINDOW,
  DUPLICATE_WINDOW,
  SET_FIELD,
} from '../../mutations/local'
import * as jsc from '../../config/jobSheetConstants'
import styles from './styles'
import { Duplicate } from '../../../common/components/Duplicate'
import { Error } from '../../../common/components/Error'
import { FormHeader } from '../FormHeader'
import { JOBSHEET_DATA } from '../../queries'
import { PERSIST_WINDOW, REMOVE_WINDOW } from '../../mutations/remote'
import { WINDOW_QUERY } from '../../queries/local'
import { prepareDoc } from '../../utils'


function WindowForm({
  clearWindow,
  navigation,
  setField,
}) {
  useEffect(() => (
    () => {
      clearWindow()
    }
  ), [])
  const [isDuplicate, setDuplicate] = useState(false)

  const costsInstall = useRef(null)

  const _handleRemove = (func, windowID) => {
    AlertIOS.alert(
      'Confirm Delete Window',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            func({ variables: { id: windowID } })
          },
        },
      ]
    )
  }

  const _handleDuplicate = (func) => {
    setDuplicate(true)
    func()
  }

  return (
    <Query query={WINDOW_QUERY}>
      {({ error, data: { products, window } }) => {
        if (error) return <Error error={error} />
        // console.log('data.window in Query: ', window)
        return (
          <KeyboardAwareScrollView style={styles.formCont}>
            {isDuplicate && (
              <Duplicate />
            )}
            <FormHeader label="Style & Sizes" />
            <View style={styles.formRow}>
              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Qty</Text>
                <Picker
                  itemStyle={styles.pickerItemSm}
                  onValueChange={value => setField('qty', value)}
                  selectedValue={window.qty}
                  style={styles.pickerSm}
                >
                  <Picker.Item label="0" value="" />
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
                <Text style={styles.cellLabel}>Style</Text>
                <Picker
                  selectedValue={window.productID._id}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={value => setField('productID._id', value)}
                >
                  <Picker.Item label="Select" value="" />
                  {products.map(p => (
                    <Picker.Item
                      key={p._id}
                      label={p.name}
                      value={p._id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Width</Text>
                <View style={styles.dimCell}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.dimInput}
                    onChangeText={text => setField('dims.width.inch', text)}
                    value={window.dims.width.inch.toString()}
                  />
                  <Picker
                    itemStyle={styles.pickerItemSm}
                    onValueChange={value => setField('dims.width.fraction', value)}
                    selectedValue={window.dims.width.fraction}
                    style={styles.pickerSm}
                  >
                    {jsc.Fractions.map(f => (
                      <Picker.Item
                        key={f}
                        label={f}
                        value={f}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Height</Text>
                <View style={styles.dimCell}>
                  <TextInput
                    style={styles.dimInput}
                    onChangeText={text => setField('dims.height.inch', text)}
                    value={window.dims.height.inch.toString()}
                  />
                  <Picker
                    itemStyle={styles.pickerItemSm}
                    onValueChange={value => setField('dims.height.fraction', value)}
                    selectedValue={window.dims.height.fraction}
                    style={styles.pickerSm}
                  >
                    {jsc.Fractions.map(f => (
                      <Picker.Item
                        key={f}
                        label={f}
                        value={f}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Sq Ft</Text>
                <TextInput
                  editable={false}
                  style={styles.dimInput}
                  value={window.specs.sqft.toString()}
                />
              </View>

              <View style={styles.formCell}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectRooms', { rooms: window.rooms, type: 'window' })}>
                  <Text style={[styles.cellLabel, styles.modalLinkText]}>Rooms</Text>
                </TouchableOpacity>
                <TextInput
                  allowFontScaling={false}
                  editable={false}
                  style={[styles.dimInput, { width: 104 }]}
                  value={window.rooms.join(', ')}
                />
              </View>
            </View>

            <FormHeader label="Details" />
            <View style={styles.formDetails}>
              <View style={styles.formDetailRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(
                    'SelectWindowOptions',
                    {
                      options: window.specs.options,
                      cost: window.costs.options,
                      type: 'group',
                    }
                  )}
                >
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Options</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={window.costs.options.toString()}
                />
                <TextInput
                  editable={false}
                  multiline
                  style={styles.detailBoxInput}
                  value={window.specs.options}
                />
              </View>

              <View style={styles.formDetailRow}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectTrim', { trim: window.specs.trim, cost: window.costs.trim })}>
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Trim</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={window.costs.trim.toString()}
                />
                <TextInput
                  editable={false}
                  multiline
                  style={styles.detailBoxInput}
                  value={window.specs.trim}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Installation Method</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setField('costs.installType', value)}
                  // onFocus={() => setSizes()}
                  onSubmitEditing={() => costsInstall.current.focus()}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={window.costs.installType.toString()}
                />
                <Picker
                  selectedValue={window.specs.installType}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={value => setField('specs.installType', value)}
                >
                  <Picker.Item label="Select" value="" />
                  {jsc.InstallMethods.map(m => (
                    <Picker.Item
                      key={m}
                      label={m}
                      value={m}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Installation Fee</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setField('costs.install', value)}
                  ref={costsInstall}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={window.costs.install.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Window Price</Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={window.costs.window.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Single Unit Price</Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={window.costs.netUnit.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Override Price</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setField('costs.discounted', value)}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={window.costs.discounted.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.detailTextLabel, { fontSize: 16, fontWeight: '700' }]}
                >
                  Total Window Price
                </Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={window.costs.extendTotal.toString()}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Mutation
                mutation={REMOVE_WINDOW}
                onCompleted={() => navigation.goBack()}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: window.jobsheetID } },
                ]}
              >
                {jobSheetRemoveWindow => (
                  <Button
                    disabled={!window.windowID}
                    onPress={() => _handleRemove(jobSheetRemoveWindow, window.windowID)}
                    title="Delete"
                    buttonStyle={styles.submitButtonSecondary}
                    style={{ width: 200 }}
                    icon={{
                      name: 'ios-trash',
                      type: 'ionicon',
                      color: 'white',
                    }}
                  />
                )}
              </Mutation>
              <Mutation mutation={DUPLICATE_WINDOW}>
                {setDuplicateWindow => (
                  <Button
                    buttonStyle={styles.submitButtonSecondary}
                    disabled={!window.windowID}
                    onPress={() => _handleDuplicate(setDuplicateWindow)}
                    style={{ width: 200 }}
                    title="Duplicate"
                    icon={{
                      name: 'ios-browsers',
                      type: 'ionicon',
                      color: 'white',
                    }}
                  />
                )}
              </Mutation>
              <Mutation
                mutation={PERSIST_WINDOW}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: window.jobsheetID } },
                ]}
                onCompleted={() => navigation.goBack()}
              >
                {(persistWindow, { error }) => ( // eslint-disable-line no-shadow
                  <React.Fragment>
                    <Button
                      disabled={window.costs.extendTotal <= 0}
                      onPress={() => {
                        persistWindow({ variables: { input: prepareDoc(window) } })
                        navigation.goBack()
                      }}
                      title="Submit"
                      buttonStyle={styles.submitButton}
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
          </KeyboardAwareScrollView>
        )
      }}
    </Query>
  )
}
WindowForm.propTypes = {
  clearWindow: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setField: PropTypes.func.isRequired,
}

const ClearWindow = graphql(CLEAR_WINDOW, {
  props: ({ mutate }) => ({
    clearWindow: () => mutate({ variables: { windowID: null } }),
  }),
})

const SetField = graphql(SET_FIELD, {
  props: ({ mutate }) => ({
    setField: (field, value) => mutate({ variables: { field, value } }),
  }),
})

export default compose(
  ClearWindow,
  SetField,
  withNavigation,
)(WindowForm)
