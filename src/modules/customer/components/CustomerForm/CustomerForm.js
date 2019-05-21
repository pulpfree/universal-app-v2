import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import * as Yup from 'yup'
import ramda from 'ramda'
import { Button, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { TextInput } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import {
  Mutation,
  Query,
  compose,
  graphql,
} from 'react-apollo'

import { CUSTOMER } from '../../queries'
import { PERSIST_CUSTOMER } from '../../mutations/remote'
import { CUSTOMER as CUSTOMER_LOCAL } from '../../queries.local'
import {
  CLEAR_CUSTOMER,
  SET_CUSTOMER_FIELD,
  SET_CUSTOMER_FROM_OBJ,
  SET_CUSTOMER_PHONE,
} from '../../mutations.local'

import { flattenObject } from '../../../../util/utils'
import clr from '../../../../config/colors'
import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Header } from '../../../common/components/Header'
import { fmtPostalCode } from '../../../../util/fmt'
import { prepareCustomer } from '../../utils'

const customerSchema = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string()
      .min(2, 'Minimum length is 2 characters')
      .max(50, 'Maximum length 50 characters')
      .required('Required'),
    last: Yup.string()
      .min(2, 'Minimum length is 2 characters')
      .max(50, 'Maximum length 50 characters')
      .required('Required'),
    spouse: Yup.string()
      // .min(2, 'Too Short. Enter at least 2 characters')
      .max(50, 'Maximum length 50 characters')
      .nullable(),
  }),
  email: Yup.string()
    .email('Invalid email')
    .nullable(),
  address: Yup.object().shape({
    street1: Yup.string()
      .required('Required'),
    city: Yup.string()
      .required('Required'),
    postalCode: Yup.string()
      .required('Required'),
  }),
})

const errorObj = {
  name: {
    first: false,
    last: false,
    spouse: false,
  },
  address: {
    city: false,
    postalCode: false,
    street1: false,
  },
  email: false,
}

function CustomerForm({
  clearCustomer,
  customerData,
  navigation,
  setCustomer,
  setCustomerField,
  setCustomerPhone,
}) {
  const [errors, setError] = useState(errorObj)
  const [haveCustomer, setHaveCustomer] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const mapParams = navigation.getParam('mapParams', false)
  if (mapParams && mapParams.address_components) {
    const location = {
      type: 'Point',
      coordinates: [mapParams.geometry.location.lng, mapParams.geometry.location.lat],
    }
    // console.log('mapParams:', mapParams)
    setCustomerField('address.location', location)
    const addr = ramda.clone(mapParams.address_components)
    if (addr.length === 8) {
      addr.splice(2, 1)
    }

    setCustomerField('address.street1', `${addr[0].long_name} ${addr[1].short_name}`)
    setCustomerField('address.city', addr[2].long_name)
    if (addr.length === 7) {
      setCustomerField('address.postalCode', addr[6].long_name)
    }
  }

  useEffect(() => (
    () => clearCustomer()
  ), [])

  // we need to use state to ensure this is only set once
  if (customerData && !haveCustomer) {
    setCustomer(customerData)
    setHaveCustomer(true)
  }

  const _getPhone = (name, phones) => {
    if (Array.isArray(phones)) {
      const ph = phones.find(phone => phone._id === name)
      return ph ? ph.number : ''
    }
    return ''
  }

  const _validateField = (field, value) => {
    const fieldArr = field.split('.')
    try {
      customerSchema.validateSyncAt(field, value)
    } catch (e) {
      const errs = ramda.assocPath(fieldArr, e.message, errors)
      setError(errs)
      return
    }
    const errs = ramda.assocPath(fieldArr, false, errors)
    setError(errs)
  }

  const _haveErrors = () => !!Object.values(flattenObject(errors))
    .filter(err => err !== false).length

  const city = useRef(null)
  const email = useRef(null)
  const nameLast = useRef(null)
  const nameSpouse = useRef(null)
  const phoneHome = useRef(null)
  const phoneMobile = useRef(null)
  const postalCode = useRef(null)
  const street1 = useRef(null)

  return (
    <Query query={CUSTOMER_LOCAL}>
      {({ error, data: { customer } }) => {
        // console.log('customer: ', customer) // eslint-disable-line no-console
        if (error) return <Error error={error} />
        return (
          <KeyboardAwareScrollView style={styles.container}>
            <Header label="Name" padTop={false} />
            <View style={styles.inputRow}>
              <View style={styles.input}>
                <TextInput
                  autoCorrect={false}
                  // autoFocus={!haveCustomer}
                  blurOnSubmit={false}
                  error={errors.name.first}
                  label="First"
                  name="name.first"
                  onBlur={() => _validateField('name.first', customer)}
                  onChangeText={value => setCustomerField('name.first', value)}
                  onSubmitEditing={() => nameLast.current.focus()}
                  returnKeyType="next"
                  value={customer.name.first}
                />
                {errors.name.first && <Text style={styles.error}>{errors.name.first}</Text>}
              </View>

              <View style={styles.input}>
                <TextInput
                  autoCorrect={false}
                  blurOnSubmit={false}
                  error={errors.name.last}
                  label="Last"
                  name="name.last"
                  onBlur={() => _validateField('name.last', customer)}
                  onChangeText={value => setCustomerField('name.last', value)}
                  onSubmitEditing={() => nameSpouse.current.focus()}
                  ref={nameLast}
                  returnKeyType="next"
                  value={customer.name.last}
                />
                {errors.name.last && <Text style={styles.error}>{errors.name.last}</Text>}
              </View>

              <View style={styles.input}>
                <TextInput
                  autoCorrect={false}
                  blurOnSubmit={false}
                  error={errors.name.spouse}
                  label="Spouse"
                  name="name.spouse"
                  onBlur={() => _validateField('name.spouse', customer)}
                  onChangeText={value => setCustomerField('name.spouse', value)}
                  onSubmitEditing={() => street1.current.focus()}
                  ref={nameSpouse}
                  returnKeyType="next"
                  value={customer.name.spouse}
                />
                {errors.name.spouse && <Text style={styles.error}>{errors.name.spouse}</Text>}
              </View>
            </View>

            <Header label="Address" />
            <View style={styles.inputRow}>
              <View style={styles.input}>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  error={errors.address.street1}
                  label="Street"
                  name="address.street1"
                  onBlur={() => _validateField('address.street1', customer)}
                  onChangeText={value => setCustomerField('address.street1', value)}
                  onSubmitEditing={() => city.current.focus()}
                  ref={street1}
                  returnKeyType="next"
                  value={customer.address.street1}
                />
                {errors.address.street1
                  && <Text style={styles.error}>{errors.address.street1}</Text>}

              </View>

              <View style={styles.input}>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  error={errors.address.city}
                  label="City"
                  name="address.city"
                  onBlur={() => _validateField('address.city', customer)}
                  onChangeText={value => setCustomerField('address.city', value)}
                  onSubmitEditing={() => postalCode.current.focus()}
                  ref={city}
                  returnKeyType="next"
                  value={customer.address.city}
                />
                {errors.address.city
                  && <Text style={styles.error}>{errors.address.city}</Text>}
              </View>

              <View style={styles.input}>
                <TextInput
                  autoCapitalize="characters"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  error={errors.address.postalCode}
                  label="Postal Code"
                  name="address.postalCode"
                  onBlur={() => _validateField('address.postalCode', customer)}
                  onChangeText={value => setCustomerField('address.postalCode', fmtPostalCode(value))}
                  onSubmitEditing={() => email.current.focus()}
                  ref={postalCode}
                  returnKeyType="next"
                  value={customer.address.postalCode}
                />
                {errors.address.postalCode
                  && <Text style={styles.error}>{errors.address.postalCode}</Text>}
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
                  onChangeText={value => setCustomerField('address.provinceCode', value)}
                  returnKeyType="next"
                  value={customer.address.provinceCode}
                />
              </View>

              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Property Type</Text>
                <CheckBox
                  checked={customer.address.type === 'res'}
                  checkedColor={clr.black}
                  checkedIcon="dot-circle-o"
                  containerStyle={styles.checkbox}
                  onPress={() => setCustomerField('address.type', 'res')}
                  title="Residential"
                  uncheckedIcon="circle-o"
                />
                <CheckBox
                  checked={customer.address.type === 'com'}
                  checkedColor={clr.black}
                  checkedIcon="dot-circle-o"
                  containerStyle={styles.checkbox}
                  onPress={() => setCustomerField('address.type', 'com')}
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
                  error={errors.email}
                  keyboardType="email-address"
                  label="Email"
                  name="email"
                  onBlur={() => _validateField('email', customer)}
                  onChangeText={value => setCustomerField('email', value)}
                  onSubmitEditing={() => phoneMobile.current.focus()}
                  ref={email}
                  returnKeyType="next"
                  value={customer.email}
                />
                {errors.email
                  && <Text style={styles.error}>{errors.email}</Text>}
              </View>

              <View style={[styles.input, { flex: 0.75 }]}>
                <TextInput
                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  label="Mobile Phone"
                  name="phones.mobile.number"
                  onChangeText={text => setCustomerPhone('mobile', text)}
                  onSubmitEditing={() => phoneHome.current.focus()}
                  ref={phoneMobile}
                  returnKeyType="next"
                  value={_getPhone('mobile', customer.phones)}
                />
              </View>

              <View style={[styles.input, { flex: 0.75 }]}>
                <TextInput
                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  label="Home Phone"
                  name="phones.home.number"
                  onChangeText={text => setCustomerPhone('home', text)}
                  ref={phoneHome}
                  returnKeyType="go"
                  value={_getPhone('home', customer.phones)}
                />
              </View>
            </View>

            <View style={[styles.inputRow, { marginTop: 20, justifyContent: 'center' }]}>
              <Mutation
                mutation={PERSIST_CUSTOMER}
                onCompleted={data => navigation.navigate('CustomerInfo', { customerID: data.customerPersist._id })}
                refetchQueries={() => {
                  if (haveCustomer) {
                    return ([
                      { query: CUSTOMER, variables: { customerID: customer.customerID } },
                    ])
                  }
                  return false
                }}
              >
                {(customerPersist, { error: mutError, loading: mutLoading }) => {
                  if (mutError) setErrorMsg(mutError)
                  return (
                    <Button
                      buttonStyle={{
                        backgroundColor: clr.primary,
                      }}
                      disabled={_haveErrors() || mutLoading}
                      icon={{
                        name: 'ios-send',
                        type: 'ionicon',
                        color: 'white',
                      }}
                      onPress={() => customerPersist(
                        { variables: prepareCustomer(customer) }
                      )}
                      style={{ width: 200 }}
                      title={mutLoading ? 'Stand by...' : 'Submit'}
                    />
                  )
                }}
              </Mutation>
            </View>

            <View style={{ marginTop: 10, flex: 1 }}>
              {errorMsg !== '' && <Error error={errorMsg} />}
            </View>
          </KeyboardAwareScrollView>
        )
      }}
    </Query>
  )
}
CustomerForm.propTypes = {
  clearCustomer: PropTypes.func.isRequired,
  customerData: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
  setCustomer: PropTypes.func.isRequired,
  setCustomerField: PropTypes.func.isRequired,
  setCustomerPhone: PropTypes.func.isRequired,
}
CustomerForm.defaultProps = {
  customerData: PropTypes.null,
}

const ClearCustomer = graphql(CLEAR_CUSTOMER, {
  props: ({ mutate }) => ({
    clearCustomer: () => mutate(),
  }),
})

const SetField = graphql(SET_CUSTOMER_FIELD, {
  props: ({ mutate }) => ({
    setCustomerField: (field, value) => mutate({ variables: { field, value } }),
  }),
})

const SetCustomer = graphql(SET_CUSTOMER_FROM_OBJ, {
  props: ({ mutate }) => ({
    setCustomer: customer => mutate({ variables: { customer } }),
  }),
})

const SetCustomerPhone = graphql(SET_CUSTOMER_PHONE, {
  props: ({ mutate }) => ({
    setCustomerPhone: (phoneID, number) => mutate({ variables: { phoneID, number } }),
  }),
})

export default compose(
  ClearCustomer,
  SetCustomer,
  SetField,
  SetCustomerPhone,
  withNavigation,
)(CustomerForm)
