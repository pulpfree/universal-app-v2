import React from 'react'
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
import { withNavigation } from 'react-navigation'

import styles from './styles'
import { FormHeader } from '../FormHeader'
import * as jsc from '../../config/jobSheetConstants'

function GroupForm({ groupTypes, products, navigation }) {
  return (
    <KeyboardAwareScrollView style={styles.formCont}>
      <FormHeader label="Style & Sizes" />

      <View style={styles.formRow}>
        <View style={styles.formCell}>
          <Text style={styles.cellLabel}>Qty</Text>
          <Picker
            // selectedValue={period}
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
            style={[styles.picker, { width: 250 }]}
            itemStyle={styles.pickerItem}
          // onValueChange={value => setPeriod(value)}
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
          <Text style={styles.cellLabel}>Opening Height</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('SelectRooms')}>
            <Text style={styles.cellLabel}>Rooms</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.dimInput, { width: 90 }]}
          // onChangeText={(text) => this.setState({ text })}
          // value={this.state.text}
          />
        </View>
      </View>

      <FormHeader label="Windows" />
      <View style={styles.formRow}>
        <View style={styles.formCell}>
          <Text style={styles.cellLabel}>Qty</Text>
          <Picker
            // selectedValue={period}
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
      </View>

      <FormHeader label="Details" />
      <View style={styles.formDetails}>
        <View style={styles.formDetailRow}>
          <Text style={styles.detailTextLabel}>Options</Text>
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
          <Text style={styles.detailTextLabel}>Trim</Text>
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
          <Text style={styles.detailTextLabel}>Group Unit Price</Text>
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
            Total Group Price
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
          title="Delete Group"
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
          title="Save Group"
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
}

export default withNavigation(GroupForm)
