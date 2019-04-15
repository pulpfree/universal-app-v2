import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
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

function CustomerForm({
  dirty,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  values,
}) {
  const _setPhone = (number, name) => {
    setFieldValue(`phones.${name}`, fmtPhone(number))
  }

  const _getPhone = (name) => {
    if (ramda.hasPath(['phones', name], values)) {
      return values.phones[name]
    }
    return ''
  }

  const _setPostalCode = (value) => {
    setFieldValue('address.postalCode', fmtPostalCode(value) || value)
  }

  const _handleSubmit = (e) => {
    handleSubmit(e)
  }

  const city = useRef(null)
  const email = useRef(null)
  const nameLast = useRef(null)
  const nameSpouse = useRef(null)
  const phoneHome = useRef(null)
  const phoneMobile = useRef(null)
  const postalCode = useRef(null)
  const street1 = useRef(null)

  return (
    <KeyboardAwareScrollView style={styles.container}>
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
            onSubmitEditing={() => nameLast.current.focus()}
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
            onSubmitEditing={() => nameSpouse.current.focus()}
            ref={nameLast}
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
            onSubmitEditing={() => street1.current.focus()}
            ref={nameSpouse}
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
            onSubmitEditing={() => city.current.focus()}
            ref={street1}
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
            onSubmitEditing={() => postalCode.current.focus()}
            ref={city}
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
            onChangeText={text => _setPostalCode(text)}
            onSubmitEditing={() => email.current.focus()}
            ref={postalCode}
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
            onChangeText={handleChange('address.provinceCode')}
            returnKeyType="next"
            value={values.address.provinceCode}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Property Type</Text>
          <CheckBox
            checked={values.address.type === 'res'}
            checkedColor={clr.black}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkbox}
            onPress={() => setFieldValue('address.type', 'res')}
            title="Residential"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            checked={values.address.type === 'com'}
            checkedColor={clr.black}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkbox}
            onPress={() => setFieldValue('address.type', 'com')}
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
            onSubmitEditing={() => phoneMobile.current.focus()}
            ref={email}
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
            onChangeText={text => _setPhone(text, 'mobile')}
            onSubmitEditing={() => phoneHome.current.focus()}
            ref={phoneMobile}
            returnKeyType="next"
            value={_getPhone('mobile')}
          />
        </View>

        <View style={[styles.input, { flex: 0.75 }]}>
          <TextInput
            blurOnSubmit={false}
            keyboardType="phone-pad"
            label="Home Phone"
            name="phones.home.number"
            onChangeText={text => _setPhone(text, 'home')}
            ref={phoneHome}
            returnKeyType="go"
            value={_getPhone('home')}
          />
        </View>
      </View>

      <View style={[styles.inputRow, { marginTop: 20, justifyContent: 'center' }]}>
        <Button
          disabled={!dirty || isSubmitting}
          onPress={_handleSubmit}
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
    </KeyboardAwareScrollView>
  )
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
