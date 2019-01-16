import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import ramda from 'ramda'
import { TextInput } from 'react-native-paper'
import { Button, CheckBox, Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'
import { fmtPostalCode } from '../../../../util/fmt'

class AddressForm extends React.Component {
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

  _setPostalCode = (value) => {
    const { setFieldValue } = this.props
    const code = fmtPostalCode(value)
    if (code) {
      setFieldValue('postalCode', code)
    }
  }

  _handleSubmit = (e) => {
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
      <View style={styles.container}>
        <View style={styles.field}>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            blurOnSubmit={false}
            error={ramda.hasPath(['street1'], errors)}
            label="Street"
            name="street1"
            onChangeText={handleChange('street1')}
            onSubmitEditing={() => this.city.focus()}
            ref={(input) => { this.street1 = input }}
            returnKeyType="next"
            value={values.street1}
          />
          {ramda.hasPath(['street1'], errors)
            && <Text style={styles.error}>{errors.street1}</Text>
          }
        </View>

        <View style={styles.field}>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            blurOnSubmit={false}
            error={ramda.hasPath(['city'], errors)}
            label="City"
            name="city"
            onChangeText={handleChange('city')}
            onSubmitEditing={() => this.postalCode.focus()}
            ref={(input) => { this.city = input }}
            returnKeyType="next"
            value={values.city}
          />
          {ramda.hasPath(['city'], errors)
            && <Text style={styles.error}>{errors.city}</Text>
          }
        </View>

        <View style={styles.field}>
          <TextInput
            autoCapitalize="characters"
            autoCorrect={false}
            blurOnSubmit={false}
            error={ramda.hasPath(['postalCode'], errors)}
            label="Postal Code"
            name="postalCode"
            onChangeText={text => this._setPostalCode(text)}
            onSubmitEditing={() => this.email.focus()}
            ref={(input) => { this.postalCode = input }}
            returnKeyType="next"
            value={values.postalCode}
          />
          {ramda.hasPath(['postalCode'], errors)
            && <Text style={styles.error}>{errors.postalCode}</Text>
          }
        </View>

        <View style={styles.field}>
          <TextInput
            autoCapitalize="characters"
            autoCorrect={false}
            blurOnSubmit={false}
            label="Province"
            name="provinceCode"
            onChangeText={text => this._setField('provinceCode', text)}
            onSubmitEditing={() => this.email.focus()}
            returnKeyType="next"
            value={values.provinceCode}
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

        <View style={styles.field}>
          <Button
            disabled={!dirty || isSubmitting}
            onPress={this._handleSubmit}
            // ref={(input) => { this.submit = input }}
            title="Create"
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
      </View>
    )
  }
}
AddressForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
}

export default AddressForm
