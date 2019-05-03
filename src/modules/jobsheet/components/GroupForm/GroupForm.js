import React, { useEffect, useRef, useState } from 'react'
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
  CLEAR_GROUP,
  CLEAR_GROUP_WINDOW,
  DUPLICATE_GROUP,
  SET_GROUP_FIELD,
  SET_GROUP_WINDOW_FIELD,
  SET_WINDOW_FROM_GROUP,
  PERSIST_GROUP_WINDOW,
  REMOVE_GROUP_WINDOW,
} from '../../mutations/local'
import { GROUP_QUERY, GROUP_WINDOW_QUERY } from '../../queries/local'
import { JOBSHEET_DATA } from '../../queries'
import { PERSIST_GROUP, REMOVE_GROUP } from '../../mutations/remote'

import * as jsc from '../../config/jobSheetConstants'
import styles from './styles'
import { Duplicate } from '../../../common/components/Duplicate'
import { Error } from '../../../common/components/Error'
import { FormHeader } from '../FormHeader'
import { prepareGroupDoc } from '../../utils'

const Window = ({ item }) => {
  const { costs, dims, specs } = item
  let size = dims.width.inch
  if (dims.width.fraction) size += ` ${dims.width.fraction}`
  size += ` x ${dims.height.inch}`
  if (dims.height.fraction) size += ` ${dims.height.fraction}`
  return (
    <Mutation mutation={SET_WINDOW_FROM_GROUP}>
      {setWindowFromGroup => (
        <TouchableOpacity
          onPress={() => setWindowFromGroup({ variables: { windowID: item._id.toString() } })}
        >
          <View style={styles.windowRow}>
            <Text style={[styles.windowCell, { flex: 0.5 }]}>{item.qty}</Text>
            <Text style={[styles.windowCell, { flex: 2 }]}>{item.product.name}</Text>
            <Text style={[styles.windowCell, { flex: 1.5 }]}>{size}</Text>
            <Text style={styles.windowCell}>{specs.sqft}</Text>
            <Text style={styles.windowCell}>{specs.extendSqft}</Text>
            <Text style={styles.windowCostCell}>{costs.extendUnit}</Text>
            <Text style={styles.windowCostCell}>{costs.extendTotal}</Text>
          </View>
        </TouchableOpacity>
      )}
    </Mutation>
  )
}
Window.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

function GroupForm({
  clearGroup,
  clearGroupWindow,
  groupTypes,
  navigation,
  products,
  setGroupField,
  setGroupWindowField,
}) {
  useEffect(() => (
    () => {
      clearGroup()
      clearGroupWindow()
    }
  ), [])
  const [isDuplicate, setDuplicate] = useState(false)

  const costsInstall = useRef(null)
  const scrollTop = useRef(null)

  const _handleRemove = (func, groupID) => {
    Alert.alert(
      'Confirm Delete Group',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            func({ variables: { id: groupID } })
          },
        },
      ]
    )
  }

  const _handleDuplicate = (func) => {
    setDuplicate(true)
    func()
    scrollTop.current.scrollTo({ x: 0, y: 0, animated: true })
  }
  return (
    <Query
      query={GROUP_QUERY}
      // fetchPolicy="cache-and-network"
      // fetchPolicy="cache"
      // fetchPolicy="network-only"
    >
      {({ error, data }) => {
        console.log('data: ', data)
        if (error) {
          console.log('error: ', error)
        }
        if (error) return <Error style={{ height: '100%' }} error={error} />
        {/* console.log('group: ', group) */}
        // console.table(group.items)
        return (
          <KeyboardAwareScrollView style={styles.formCont} ref={scrollTop}>
            {isDuplicate && (
              <Duplicate />
            )}
            <FormHeader label="Style & Sizes" />
            <View style={styles.formRow}>
              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Qty</Text>
                <Picker
                  selectedValue={group.qty}
                  style={styles.pickerSm}
                  itemStyle={styles.pickerItemSm}
                  onValueChange={value => setGroupField('qty', value)}
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
                  selectedValue={group.specs.groupType._id}
                  style={[styles.picker, { width: 250 }]}
                  itemStyle={styles.pickerItem}
                  onValueChange={value => setGroupField('specs.groupType._id', value)}
                >
                  <Picker.Item label="Select" value="" />
                  {groupTypes.map(p => (
                    <Picker.Item
                      key={p._id}
                      label={p.name}
                      value={p._id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Opening Width</Text>
                <View style={styles.dimCell}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={text => setGroupField('dims.width.inch', text)}
                    style={styles.dimInput}
                    value={group.dims.width.inch.toString()}
                  />
                  <Picker
                    selectedValue={group.dims.width.fraction}
                    style={styles.pickerSm}
                    itemStyle={styles.pickerItem}
                    onValueChange={value => setGroupField('dims.width.fraction', value)}
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
                <Text style={styles.cellLabel}>Opening Height</Text>
                <View style={styles.dimCell}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={text => setGroupField('dims.height.inch', text)}
                    style={styles.dimInput}
                    value={group.dims.height.inch.toString()}
                  />
                  <Picker
                    selectedValue={group.dims.height.fraction}
                    style={styles.pickerSm}
                    itemStyle={styles.pickerItem}
                    onValueChange={value => setGroupField('dims.height.fraction', value)}
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
                <TouchableOpacity onPress={() => navigation.navigate('SelectRooms', { rooms: group.rooms, type: 'group' })}>
                  <Text style={[styles.cellLabel, styles.modalLinkText]}>Rooms</Text>
                </TouchableOpacity>
                <TextInput
                  allowFontScaling={false}
                  editable={false}
                  style={[styles.dimInput, { width: 90 }]}
                  value={group.rooms.join(', ')}
                />
              </View>
            </View>

            <FormHeader label="Windows" />
            <Query query={GROUP_WINDOW_QUERY}>
              {({ error, data: { groupWindow } }) => { // eslint-disable-line no-shadow
                if (error) return <Error error={error} />
                return (
                  <View style={styles.formRow}>
                    <View style={styles.formCell}>
                      <Text style={styles.cellLabel}>Qty</Text>
                      <Picker
                        selectedValue={groupWindow.qty}
                        style={styles.pickerSm}
                        itemStyle={styles.pickerItemSm}
                        onValueChange={value => setGroupWindowField('qty', value)}
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
                      <Text style={styles.cellLabel}>Style</Text>
                      <Picker
                        itemStyle={styles.pickerItem}
                        onValueChange={value => setGroupWindowField('productID', value)}
                        selectedValue={groupWindow.productID}
                        style={[styles.picker, { width: 170 }]}
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
                          onChangeText={text => setGroupWindowField('dims.width.inch', text)}
                          style={styles.dimInput}
                          value={groupWindow.dims.width.inch.toString()}
                        />
                        <Picker
                          itemStyle={styles.pickerItemSm}
                          onValueChange={value => setGroupWindowField('dims.width.fraction', value)}
                          selectedValue={groupWindow.dims.width.fraction}
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
                          keyboardType="numeric"
                          onChangeText={text => setGroupWindowField('dims.height.inch', text)}
                          style={styles.dimInput}
                          value={groupWindow.dims.height.inch.toString()}
                        />
                        <Picker
                          itemStyle={styles.pickerItemSm}
                          onValueChange={value => setGroupWindowField('dims.height.fraction', value)}
                          selectedValue={groupWindow.dims.height.fraction}
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
                        value={groupWindow.specs.sqft.toString()}
                      />
                    </View>

                    <View style={[styles.formCell, { minWidth: 100 }]}>
                      <React.Fragment>
                        <Mutation mutation={PERSIST_GROUP_WINDOW}>
                          {persistGroupWindow => (
                            <Button
                              disabled={groupWindow.specs.sqft <= 0}
                              onPress={() => {
                                persistGroupWindow()
                              }}
                              title="Save"
                              buttonStyle={styles.submitButton}
                              style={{ width: 110, marginBottom: 8 }}
                              icon={{
                                name: 'ios-send',
                                type: 'ionicon',
                                color: 'white',
                              }}
                            />
                          )}
                        </Mutation>
                        <Button
                          disabled={groupWindow.specs.sqft <= 0}
                          onPress={() => clearGroupWindow()}
                          title="Clear"
                          buttonStyle={styles.submitButtonSecondary}
                          style={{ width: 110, marginBottom: 8 }}
                          icon={{
                            name: 'ios-close-circle-outline',
                            type: 'ionicon',
                            color: 'white',
                          }}
                        />
                        <Mutation mutation={REMOVE_GROUP_WINDOW}>
                          {removeGroupWindow => (
                            <Button
                              disabled={groupWindow.specs.sqft <= 0}
                              onPress={() => removeGroupWindow(
                                { variables: { windowID: groupWindow.windowID } }
                              )}
                              title="Delete"
                              buttonStyle={styles.submitButtonSecondary}
                              style={{ width: 110 }}
                              icon={{
                                name: 'ios-trash',
                                type: 'ionicon',
                                color: 'white',
                              }}
                            />
                          )}
                        </Mutation>
                      </React.Fragment>
                    </View>
                  </View>
                )
              }}
            </Query>

            <View style={[styles.formRow, { paddingTop: 4, paddingBottom: 4 }]}>
              <Text style={[styles.windowHeadingCell, { flex: 0.5 }]}>Qty</Text>
              <Text style={[styles.windowHeadingCell, { flex: 2 }]}>Style</Text>
              <Text style={[styles.windowHeadingCell, { flex: 1.5 }]}>Size</Text>
              <Text style={styles.windowHeadingCell}>Sqft</Text>
              <Text style={styles.windowHeadingCell}>Total Sqft</Text>
              <Text style={styles.windowCostCell}>Unit</Text>
              <Text style={styles.windowCostCell}>Extend Unit</Text>
            </View>
            {group.items.length > 0 && group.items.map(item => (
              <Window item={item} key={item._id} />
            ))}

            <FormHeader label="Details" />
            <View style={styles.formDetails}>
              <View style={styles.formDetailRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(
                    'SelectWindowOptions',
                    {
                      options: group.specs.options,
                      cost: group.costs.options,
                      type: 'group',
                    }
                  )}
                >
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Options</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={group.costs.options.toString()}
                />
                <TextInput
                  editable={false}
                  multiline
                  style={styles.detailBoxInput}
                  value={group.specs.options}
                />
              </View>

              <View style={styles.formDetailRow}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectTrim', { trim: group.specs.trim, cost: group.costs.trim, type: 'group' })}>
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Trim</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={group.costs.trim.toString()}
                />
                <TextInput
                  editable={false}
                  multiline
                  style={styles.detailBoxInput}
                  value={group.specs.trim}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Installation Method</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setGroupField('costs.installType', value)}
                  onSubmitEditing={() => costsInstall.current.focus()}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={group.costs.installType.toString()}
                />
                <Picker
                  selectedValue={group.specs.installType}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={value => setGroupField('specs.installType', value)}
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
                  onChangeText={value => setGroupField('costs.install', value)}
                  ref={costsInstall}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={group.costs.install.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Windows Price</Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={group.costs.windows.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Group Unit Price</Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={group.costs.netUnit.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Override Price</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={value => setGroupField('costs.discounted', value)}
                  returnKeyType="next"
                  selectTextOnFocus
                  style={styles.detailInput}
                  value={group.costs.discounted.toString()}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.detailTextLabel, { fontSize: 16, fontWeight: '700' }]}
                >
                  Total Group Price
                </Text>
                <TextInput
                  editable={false}
                  style={styles.detailInput}
                  value={group.costs.extendTotal.toString()}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Mutation
                mutation={REMOVE_GROUP}
                onCompleted={() => navigation.goBack()}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: group.jobsheetID } },
                ]}
              >
                {(jobSheetRemoveGroup, { error, loading }) => ( // eslint-disable-line no-shadow
                  <React.Fragment>
                    <Button
                      disabled={!group.groupID || loading}
                      onPress={() => _handleRemove(jobSheetRemoveGroup, group.groupID)}
                      title="Delete Group"
                      buttonStyle={styles.submitButtonSecondary}
                      style={{ width: 200 }}
                      icon={{
                        name: 'ios-trash',
                        type: 'ionicon',
                        color: 'white',
                      }}
                    />
                    {error && <Error error={error} />}
                  </React.Fragment>
                )}
              </Mutation>
              <Mutation mutation={DUPLICATE_GROUP}>
                {setDuplicateGroup => (
                  <Button
                    buttonStyle={styles.submitButtonSecondary}
                    disabled={!group.groupID}
                    onPress={() => _handleDuplicate(setDuplicateGroup)}
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
                mutation={PERSIST_GROUP}
                refetchQueries={[
                  { query: JOBSHEET_DATA, variables: { jobSheetID: group.jobsheetID } },
                ]}
                onCompleted={() => navigation.goBack()}
              >
                {(persistGroup, { error: grpError, loading }) => (
                  <React.Fragment>
                    <Button
                      buttonStyle={styles.submitButton}
                      disabled={loading || !group.costs.extendTotal}
                      icon={{
                        name: 'ios-send',
                        type: 'ionicon',
                        color: 'white',
                      }}
                      onPress={() => {
                        persistGroup({ variables: { input: prepareGroupDoc(group) } })
                      }}
                      style={{ width: 200 }}
                      title={loading ? 'Stand by...' : 'Save Group'}
                    />
                    {grpError && <Error error={grpError} />}
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
GroupForm.propTypes = {
  clearGroup: PropTypes.func.isRequired,
  clearGroupWindow: PropTypes.func.isRequired,
  groupTypes: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.instanceOf(Object).isRequired,
  setGroupField: PropTypes.func.isRequired,
  setGroupWindowField: PropTypes.func.isRequired,
}

const ClearGroup = graphql(CLEAR_GROUP, {
  props: ({ mutate }) => ({
    clearGroup: () => mutate(),
  }),
})

const ClearGroupWindow = graphql(CLEAR_GROUP_WINDOW, {
  props: ({ mutate }) => ({
    clearGroupWindow: () => mutate(),
  }),
})

const SetField = graphql(SET_GROUP_FIELD, {
  props: ({ mutate }) => ({
    setGroupField: (field, value) => mutate({ variables: { field, value } }),
  }),
})

const SetWindowField = graphql(SET_GROUP_WINDOW_FIELD, {
  props: ({ mutate }) => ({
    setGroupWindowField: (field, value) => mutate({ variables: { field, value } }),
  }),
})

export default compose(
  ClearGroup,
  ClearGroupWindow,
  SetField,
  SetWindowField,
  withNavigation,
)(GroupForm)
