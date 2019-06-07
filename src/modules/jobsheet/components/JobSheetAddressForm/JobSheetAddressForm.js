import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import ramda from 'ramda'
import { TextInput } from 'react-native-paper'
import { Button, CheckBox } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'
import { fmtPostalCode } from '../../../../util/fmt'

function AddressForm({
  dirty,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  mapParams,
  setFieldValue,
  values,
}) {
  const [addressType, setAddressType] = useState(values.addressType)
  const [haveMapParams, setHaveMapParams] = useState(false)

  const _setAddressType = (value) => {
    setAddressType(value)
    setFieldValue('addressType', value)
  }

  const _setPostalCode = (value) => {
    const code = fmtPostalCode(value)
    if (code) {
      setFieldValue('postalCode', code)
    }
  }

  const _handleSubmit = (e) => {
    handleSubmit(e)
  }

  const setMapParamFields = (params) => {
    const location = {
      type: 'Point',
      coordinates: [params.geometry.location.lng, params.geometry.location.lat],
    }
    // console.log('params:', params)
    setFieldValue('location', location)
    const addr = ramda.clone(params.address_components)
    if (addr.length === 8) {
      addr.splice(2, 1)
    }

    setFieldValue('street1', `${addr[0].long_name} ${addr[1].short_name}`)
    setFieldValue('city', addr[2].long_name)
    if (addr.length === 7) {
      setFieldValue('postalCode', addr[6].long_name)
    }
  }

  const city = useRef(null)
  const postalCode = useRef(null)

  useEffect(() => {
    if (mapParams && mapParams.address_components && !haveMapParams) {
      setHaveMapParams(true)
      setMapParamFields(mapParams)
    }
  })

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
          onSubmitEditing={() => city.current.focus()}
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
          onSubmitEditing={() => postalCode.current.focus()}
          ref={city}
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
          onChangeText={text => _setPostalCode(text)}
          ref={postalCode}
          returnKeyType="go"
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
          returnKeyType="next"
          value={values.provinceCode}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Property Type</Text>
        <CheckBox
          checked={addressType === 'res'}
          checkedColor={clr.black}
          checkedIcon="dot-circle-o"
          containerStyle={styles.checkbox}
          onPress={() => _setAddressType('res')}
          title="Residential"
          uncheckedIcon="circle-o"
        />
        <CheckBox
          checked={addressType === 'com'}
          checkedColor={clr.black}
          checkedIcon="dot-circle-o"
          containerStyle={styles.checkbox}
          onPress={() => _setAddressType('com')}
          title="Commercial"
          uncheckedIcon="circle-o"
        />
      </View>

      <View style={styles.field}>
        <Button
          disabled={!dirty || isSubmitting}
          onPress={_handleSubmit}
          title="Create"
          buttonStyle={{
            backgroundColor: clr.primary,
          }}
          style={{ width: 200 }}
          icon={{
            name: 'ios-send',
            type: 'ionicon',
            color: 'white',
          }}
        />
      </View>
    </View>
  )
}
AddressForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  mapParams: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
}
AddressForm.defaultProps = {
  mapParams: false,
}

export default AddressForm
