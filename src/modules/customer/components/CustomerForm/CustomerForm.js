import React from 'react'
import PropTypes from 'prop-types'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native'

import ramda from 'ramda'
import { Button, CheckBox, Icon } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import styles from './styles'
import clr from '../../../../config/colors'
import { fmtPhone, fmtPostalCode } from '../../../../util/fmt'
import { Header } from '../../../common/components/Header'

/*
 Note, onSubmitEditing callback is called after blur event.
 So the keyboard may go crazy if focused on next element immediately.
 So it might be helpful to set blurOnSubmit={false} to all elements in
 form but leave at true on last element, to allow Done button to blur the last input
*/

class CustomerForm extends React.Component {
  state = {
    typeResidential: true,
    typeCommercial: false,
  }

  _setPropertyType = (name) => {
    if (name === 'residential') {
      this.setState(() => ({ typeResidential: true, typeCommercial: false }))
    } else if (name === 'commercial') {
      this.setState(() => ({ typeResidential: false, typeCommercial: true }))
    }
  }

  _setPhone = (number, name) => {
    /* this.setState(state => (
      ramda.set(ramda.lensPath(['phones', name, 'number']), fmtPhone(number), state)
    )) */
    const { setFieldValue } = this.props
    setFieldValue(`phones.${name}.number`, fmtPhone(number))
  }

  _setPostalCode = (value) => {
    const { setFieldValue } = this.props
    const code = fmtPostalCode(value)
    if (code) {
      setFieldValue('address.postalCode', code)
    }
  }

  _setField = (field, value) => {
    console.log('values:', this.props.values)
    
    if (field.indexOf('.') <= 0) {
      this.setState(() => ({ [field]: value }))
    } else {
      this.setState(state => ramda.set(ramda.lensPath(field.split('.')), value, state))
    }
  }

  _handleSubmit = (e) => {
    // e.preventDefault()
    const { handleSubmit } = this.props
    handleSubmit(e)
  }

  render() {
    const {
      typeCommercial,
      typeResidential,
    } = this.state

    const {
      dirty,
      errors,
      handleChange,
      isSubmitting,
      values,
    } = this.props

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ paddingBottom: 320 }}>
          <Header label="Name" padTop={false} />
          <View style={styles.inputRow}>
            <View style={styles.input}>
              <TextInput
                autoCorrect={false}
                autoFocus={!values.name.first}
                blurOnSubmit={false}
                error={ramda.hasPath(['name', 'first'], errors)}
                label="First"
                name="name.first"
                onChangeText={handleChange('name.first')}
                onSubmitEditing={() => this.lastName.focus()}
                ref={(input) => { this.firstName = input }}
                returnKeyType="next"
                value={values.name.first}
              />
              {ramda.hasPath(['name', 'first'], errors)
                && <Text style={styles.error}>{errors.name.first}</Text>
              }
            </View>

            <View style={styles.input}>
              <TextInput
                autoCorrect={false}
                blurOnSubmit={false}
                error={ramda.hasPath(['name', 'last'], errors)}
                label="Last"
                name="name.last"
                onChangeText={handleChange('name.last')}
                onSubmitEditing={() => this.spouseName.focus()}
                ref={(input) => { this.lastName = input }}
                returnKeyType="next"
                value={values.name.last}
              />
              {ramda.hasPath(['name', 'last'], errors)
                && <Text style={styles.error}>{errors.name.last}</Text>
              }
            </View>

            <View style={styles.input}>
              <TextInput
                autoCorrect={false}
                blurOnSubmit={false}
                error={ramda.hasPath(['name', 'spouse'], errors)}
                label="Spouse"
                name="name.spouse"
                onChangeText={handleChange('name.spouse')}
                onSubmitEditing={() => this.street1.focus()}
                ref={(input) => { this.spouseName = input }}
                returnKeyType="next"
                value={values.name.spouse}
              />
              {ramda.hasPath(['name', 'spouse'], errors)
                && <Text style={styles.error}>{errors.name.spouse}</Text>
              }
            </View>
          </View>

          <Header label="Address" />
          <View style={styles.inputRow}>
            <View style={styles.input}>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                blurOnSubmit={false}
                error={ramda.hasPath(['address', 'street1'], errors)}
                label="Street"
                name="address.street1"
                onChangeText={handleChange('address.street1')}
                onSubmitEditing={() => this.city.focus()}
                ref={(input) => { this.street1 = input }}
                returnKeyType="next"
                value={values.address.street1}
              />
              {ramda.hasPath(['address', 'street1'], errors)
                && <Text style={styles.error}>{errors.address.street1}</Text>
              }
            </View>

            <View style={styles.input}>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                blurOnSubmit={false}
                error={ramda.hasPath(['address', 'city'], errors)}
                label="City"
                name="address.city"
                onChangeText={handleChange('address.city')}
                onSubmitEditing={() => this.postalCode.focus()}
                ref={(input) => { this.city = input }}
                returnKeyType="next"
                value={values.address.city}
              />
              {ramda.hasPath(['address', 'city'], errors)
                && <Text style={styles.error}>{errors.address.city}</Text>
              }
            </View>

            <View style={styles.input}>
              <TextInput
                autoCapitalize="characters"
                autoCorrect={false}
                blurOnSubmit={false}
                error={ramda.hasPath(['address', 'postalCode'], errors)}
                label="Postal Code"
                name="address.postalCode"
                onChangeText={text => this._setPostalCode(text)}
                onSubmitEditing={() => this.email.focus()}
                ref={(input) => { this.postalCode = input }}
                returnKeyType="next"
                value={values.address.postalCode}
              />
              {ramda.hasPath(['address', 'postalCode'], errors)
                && <Text style={styles.error}>{errors.address.postalCode}</Text>
              }
            </View>
          </View>

          <View style={[styles.inputRow, { marginTop: 20 }]}>
            <View style={styles.input}>
              <TextInput
                autoCapitalize="characters"
                autoCorrect={false}
                blurOnSubmit={false}
                label="Province"
                name="address.provinceCode"
                onChangeText={text => this._setField('address.provinceCode', text)}
                onSubmitEditing={() => this.email.focus()}
                returnKeyType="next"
                value={values.address.provinceCode}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Property Type</Text>
              <CheckBox
                checked={typeResidential}
                checkedColor={clr.black}
                checkedIcon="dot-circle-o"
                containerStyle={styles.checkbox}
                onPress={() => this._setPropertyType('residential')}
                title="Residential"
                uncheckedIcon="circle-o"
              />
              <CheckBox
                checked={typeCommercial}
                checkedColor={clr.black}
                checkedIcon="dot-circle-o"
                containerStyle={styles.checkbox}
                onPress={() => this._setPropertyType('commercial')}
                title="Commercial"
                uncheckedIcon="circle-o"
              />
            </View>
          </View>

          <Header label="Contact" />
          <View style={styles.inputRow}>
            <View style={[styles.input, { flex: 1.5 }]}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={false}
                keyboardType="email-address"
                label="Email"
                name="email"
                onChangeText={handleChange('email')}
                onSubmitEditing={() => this.phoneMobile.focus()}
                ref={(input) => { this.email = input }}
                returnKeyType="next"
                value={values.email}
              />
              {errors.email
                && <Text style={styles.error}>{errors.email}</Text>
              }
            </View>

            <View style={[styles.input, { flex: 0.75 }]}>
              <TextInput
                blurOnSubmit={false}
                keyboardType="phone-pad"
                label="Mobile Phone"
                name="phones.mobile.number"
                onChangeText={text => this._setPhone(text, 'mobile')}
                onSubmitEditing={() => this.phoneHome.focus()}
                ref={(input) => { this.phoneMobile = input }}
                returnKeyType="next"
                value={values.phones.mobile.number}
              />
            </View>

            <View style={[styles.input, { flex: 0.75 }]}>
              <TextInput
                blurOnSubmit
                keyboardType="phone-pad"
                label="Home Phone"
                name="phones.home.number"
                onChangeText={text => this._setPhone(text, 'home')}
                onSubmitEditing={this._handleSubmit}
                ref={(input) => { this.phoneHome = input }}
                returnKeyType="go"
                value={values.phones.home.number}
              />
            </View>
          </View>

          <View style={[styles.inputRow, { marginTop: 20, justifyContent: 'center' }]}>
            <Button
              disabled={!dirty || isSubmitting}
              onPress={this._handleSubmit}
              // ref={(input) => { this.submit = input }}
              title="Submit"
              buttonStyle={{
                backgroundColor: clr.primary,
              }}
              style={{ width: 200 }}
              icon={(
                <Icon
                  name="done"
                  color={clr.white}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
CustomerForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
}
export default CustomerForm
