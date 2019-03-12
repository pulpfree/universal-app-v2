import * as Yup from 'yup'

import { withFormik } from 'formik'
import { withNavigation } from 'react-navigation'
import { compose, graphql } from 'react-apollo'

import { PERSIST_CUSTOMER } from '../../mutations/remote'

import CustomerForm from './CustomerForm'

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

const initialValuesTest = {
  address: {
    street1: '123 Street Ave.',
    city: 'Someplace',
    postalCode: 'L3C 5Y2',
    provinceCode: 'ON',
  },
  addressType: 'res',
  email: null,
  name: {
    first: 'Test',
    last: 'Dummy',
    spouse: null,
  },
  phones: {
    home: { number: null },
    mobile: { number: null },
  },
}

const initialValues = {
  address: { provinceCode: 'ON' },
  addressType: 'res',
  email: null,
  name: {},
  phones: {
    home: { number: null },
    mobile: { number: null },
  },
}

const extractPhones = (phones) => {
  const numbers = []
  if (phones.home.number) {
    numbers.push(phones.home)
  }
  if (phones.mobile.number) {
    numbers.push(phones.mobile)
  }
  return numbers
}

const Form = withFormik({
  enableReinitialize: true,
  displayName: 'ContactForm',
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    if (!values.email && !values.phones.home.number && !values.phones.mobile.number) {
      setErrors({ email: 'Please enter either an email or phone number.' })
      setSubmitting(false)
      return false
    }
    const { address } = values
    const variables = {
      customerInput: {
        // _id: ID
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
        type: values.addressType,
      },
    }
    let graphqlReturn
    try {
      graphqlReturn = await props.customerPersist(variables)
      if (graphqlReturn && graphqlReturn.errors) {
        console.log('graphqlReturn.errors:', graphqlReturn.errors) // eslint-disable-line no-console
        return false
      }
    } catch (error) {
      console.log('error:', error) // eslint-disable-line no-console
    }
    return true
  },
  mapPropsToValues: () => (initialValues),
  validationSchema: CustomerSchema,
  validateOnBlur: true,
  validateOnChange: false,
})(CustomerForm)

const PersistCustomer = graphql(PERSIST_CUSTOMER, {
  props: ({ mutate }) => ({
    customerPersist: variables => mutate({
      variables: { ...variables },
      errorPolicy: 'all',
    }),
  }),
  options: props => ({
    onCompleted: (data) => {
      props.navigation.navigate('CustomerInfo', { customerID: data.customerPersist._id })
    },
  }),
  errorPolicy: 'all',
})

export default compose(
  withNavigation,
  PersistCustomer,
)(Form)
