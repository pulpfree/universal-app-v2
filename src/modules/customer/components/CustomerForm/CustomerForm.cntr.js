import * as Yup from 'yup'

import { withFormik } from 'formik'
import { withNavigation } from 'react-navigation'
import { compose, graphql } from 'react-apollo'
import { Client } from 'bugsnag-react-native'
import ramda from 'ramda'

import { PERSIST_CUSTOMER } from '../../mutations/remote'
import { CUSTOMER } from '../../queries'

import CustomerForm from './CustomerForm'
import { extractPhones, phonesArToObj } from '../../../../util/utils'
import { BugsnagAPIKey } from '../../../../config/constants'

const bugsnag = new Client(BugsnagAPIKey)

const testSpouse = 'Qwertyuiopasdfghjklzxcvbnm Qwertyuiopasdfghj'
// console.log('testSpouse len:', testSpouse.length)

const CustomerSchema = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string()
      .min(2, 'Too Short. Enter at least 2 characters')
      .max(50, 'Maximum length 50 characters')
      .required('Required'),
    last: Yup.string()
      .min(2, 'Too Short. Enter at least 2 characters')
      .max(50, 'Maximum length 50 characters')
      .required('Required'),
    spouse: Yup.string()
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

const initialValuesTest = { // eslint-disable-line
  address: {
    street1: '123 Street Ave.',
    city: 'Someplace',
    postalCode: 'L3C 5Y2',
    provinceCode: 'ON',
    type: 'res',
  },
  email: 'rond@webbtech.net',
  name: {
    first: 'Test',
    last: 'Dummy',
    spouse: testSpouse,
  },
  /* phones: {
    home: { number: null },
    mobile: { number: null },
  }, */
}

const initialValues = {
  address: { provinceCode: 'ON', type: 'res' },
  email: '',
  name: {},
  /* phones: {
    home: { number: null },
    mobile: { number: null },
  }, */
}
let profileVals = ramda.clone(initialValues)

const Form = withFormik({
  enableReinitialize: true,
  displayName: 'ContactForm',
  handleSubmit: async (values, {
    props,
    setSubmitting,
    setErrors,
    setValues,
  }) => {
    console.log('values:', values)
    if (!values.email && !values.phones) {
    // if (!values.email && !values.phones.home && !values.phones.mobile) {
      setErrors({ email: 'Please enter either an email or phone number.' })
      setSubmitting(false)
      return false
    }
    const { customerPersist } = props
    const { address } = values
    const variables = {
      customerInput: {
        email: values.email,
        name: values.name,
        phones: extractPhones(values.phones),
      },
      addressInput: {
        associate: 'customer',
        city: address.city,
        postalCode: address.postalCode,
        provinceCode: address.provinceCode,
        street1: address.street1,
        type: address.type,
      },
    }

    // Check if we're editing existing
    if (values._id) {
      variables.customerInput._id = values._id
      variables.addressInput._id = address._id
    }
    if (variables.customerInput.email === '') {
      delete variables.customerInput.email
    }
    let graphqlReturn
    try {
      graphqlReturn = await customerPersist(variables)
      if (graphqlReturn && graphqlReturn.errors) {
        // console.log('graphqlReturn.errors:', graphqlReturn.errors) // eslint-disable-line no-console
        const errMsg = graphqlReturn.errors[0].message
        setSubmitting(false)
        console.log('errMsg:', errMsg)
        // const error = new Error(graphqlReturn.errors[0].message)
        // bugsnag.notify(error)
        setErrors({ process: errMsg })
        return true
        // throw new Error(error)
        // return false
      }
    } catch (error) {
      console.log('error:', error) // eslint-disable-line no-console
      // bugsnag.notify(error)
      setErrors({ process: error })
      // throw new Error(error)
      return true
      // return false
    }
    // setErrors({ process: 'test process error' })
    setValues(initialValues)
    return true
  },
  mapPropsToValues: (props) => {
    if (props.customer) {
      const { customer } = props
      delete customer.__typename
      delete customer.address.__typename
      delete customer.name.__typename

      profileVals = Object.assign(
        {},
        props.customer,
        { phones: phonesArToObj(props.customer.phones) }
      )
    } else {
      profileVals = ramda.clone(initialValues)
    }
    // return profileVals
    return initialValuesTest
  },
  validationSchema: CustomerSchema,
  validateOnBlur: true,
  validateOnChange: false,
})(CustomerForm)

const PersistCustomer = graphql(PERSIST_CUSTOMER, {
  props: ({ mutate }) => ({
    customerPersist: variables => mutate({
      variables: { ...variables },
      // errorPolicy: 'all',
    }),
  }),
  options: props => ({
    onCompleted: (data) => {
      // console.log('data in onCompleted:', data)
      if (data.customerPersist) {
        props.navigation.navigate('CustomerInfo', { customerID: data.customerPersist._id })
      }
    },
    refetchQueries: ({ data }) => {
      if (data.customerPersist) {
        return [
          { query: CUSTOMER, variables: { customerID: data.customerPersist._id } },
        ]
      }
      return false
    },
  }),
  // errorPolicy: 'all',
})

export default compose(
  withNavigation,
  PersistCustomer,
)(Form)
