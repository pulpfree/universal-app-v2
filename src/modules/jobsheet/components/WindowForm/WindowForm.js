import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { graphql, Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withNavigation } from 'react-navigation'
// import WindowRooms from '../../queries.local/WindowRooms'
// import JobSheet from '../../queries.local/JobSheet'

import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import styles from './styles'
import { FormHeader } from '../FormHeader'
import * as jsc from '../../config/jobSheetConstants'

const WINDOW_QUERY = gql`{
  window @client {
    _id
    costs {
      extendTotal
      # extendUnit
      # install
      # installType
      # netUnit
      # options
      # trim
      # window
    }
    qty
    rooms
  }
}`

const SET_WINDOW = gql`
  mutation setWindowFromRemote($windowID: ID!) {
  setWindowFromRemote(windowID: $windowID) @client
}
`

function WindowForm({
  navigation,
  products,
  setWindowFromRemote,
  windowID,
}) {
  useEffect(() => {
    // console.log('loading in useEffect:')
    const ret = setWindowFromRemote(windowID)
    ret.then((winRet) => {
      console.log('winRet in useEffect:', winRet)
    })
    return () => {
      console.log('closing useEffect')
    }
  }, [])

  console.log('windowID in WindowForm:', windowID)

  return (
    // <Query query={WINDOW_QUERY} variables={{ _id: 'newid' }} fetchPolicy="no-cache">
    <Query query={WINDOW_QUERY}>
      {({ loading, error, data: { window } }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        console.log('data in Query: ', window)
        return (
          <KeyboardAwareScrollView style={styles.formCont}>
            <FormHeader label="Style & Sizes" />
            <View style={styles.formRow}>
              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Qty</Text>
                <Picker
                  selectedValue={window.qty.toString()}
                  style={styles.pickerSm}
                  itemStyle={styles.pickerItemSm}
                  // onValueChange={value => setPeriod(value)}
                >
                  <Picker.Item label="0" value="" />
                  {jsc.Qty.map(n => (
                    <Picker.Item
                      key={n}
                      label={n}
                      value={n}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formCell}>
                <Text style={styles.cellLabel}>Style</Text>
                <Picker
                  // selectedValue={period}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                // onValueChange={value => setPeriod(value)}
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
                    style={styles.dimInput}
                    // onChangeText={(text) => this.setState({ text })}
                    // value={this.state.text}
                  />
                  <Picker
                    // selectedValue={period}
                    style={styles.pickerSm}
                    itemStyle={styles.pickerItem}
                  // onValueChange={value => setPeriod(value)}
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
                  // onChangeText={(text) => this.setState({ text })}
                  // value={this.state.text}
                  />
                  <Picker
                    // selectedValue={period}
                    style={styles.pickerSm}
                    itemStyle={styles.pickerItem}
                  // onValueChange={value => setPeriod(value)}
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
                  style={styles.dimInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>

              <View style={styles.formCell}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectRooms', { windowID: window._id })}>
                  <Text style={[styles.cellLabel, styles.modalLinkText]}>Rooms</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={[styles.dimInput, { width: 90 }]}
                  value={window.rooms.join(', ')}
                />
              </View>
            </View>

            <FormHeader label="Details" />
            <View style={styles.formDetails}>
              <View style={styles.formDetailRow}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectWindowOptions')}>
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Options</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
                <TextInput
                  style={styles.detailBoxInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>
              <View style={styles.formDetailRow}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectWindowOptions')}>
                  <Text style={[styles.detailTextLabel, styles.modalLinkText]}>Trim</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
                <TextInput
                  style={styles.detailBoxInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>
              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Installation Method</Text>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
                <Picker
                  // selectedValue={period}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                // onValueChange={value => setPeriod(value)}
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
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Window Price</Text>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Single Unit Price</Text>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>

              <View style={styles.formDetailRow}>
                <Text style={styles.detailTextLabel}>Override Price</Text>
                <TextInput
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
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
                  style={styles.detailInput}
                // onChangeText={(text) => this.setState({ text })}
                // value={this.state.text}
                />
              </View>

            </View>

            <View style={styles.buttonRow}>
              <Button
                // disabled={!dirty || isSubmitting}
                // onPress={this._handleSubmit}
                // ref={(input) => { this.submit = input }}
                title="Delete"
                buttonStyle={styles.submitButtonSecondary}
                style={{ width: 200 }}
                icon={{
                  name: 'ios-trash',
                  type: 'ionicon',
                  color: 'white',
                }}
              />
              <Button
                // disabled={!dirty || isSubmitting}
                // onPress={this._handleSubmit}
                // ref={(input) => { this.submit = input }}
                title="Duplicate"
                buttonStyle={styles.submitButtonSecondary}
                style={{ width: 200 }}
                icon={{
                  name: 'ios-browsers',
                  type: 'ionicon',
                  color: 'white',
                }}
              />
              <Button
                // disabled={!dirty || isSubmitting}
                // onPress={this._handleSubmit}
                // ref={(input) => { this.submit = input }}
                title="Submit"
                buttonStyle={styles.submitButton}
                style={{ width: 200 }}
                icon={{
                  name: 'ios-send',
                  type: 'ionicon',
                  color: 'white',
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        )
      }}
    </Query>
  )
}
WindowForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.instanceOf(Object).isRequired,
  setWindowFromRemote: PropTypes.func.isRequired,
  windowID: PropTypes.string.isRequired,
}

export default graphql(SET_WINDOW, {
  props: ({ mutate }) => ({
    setWindowFromRemote: windowID => mutate({ variables: { windowID } }),
  }),
})(withNavigation(WindowForm))
