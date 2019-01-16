import * as Yup from 'yup'

import { withFormik } from 'formik'
import { withNavigation } from 'react-navigation'

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

const initialTestValues = {
  address: {
    street1: '123 Street Ave.',
    city: 'Someplace',
    postalCode: 'L3C 5Y2',
    provinceCode: 'ON',
  },
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
  address: {},
  email: null,
  name: {},
  phones: {
    home: { number: null },
    mobile: { number: null },
  },
}

const Form = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => (initialValues),
  displayName: 'ContactForm',
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    if (!values.email && !values.phones.home.number && !values.phones.mobile.number) {
      setErrors({ email: 'Please enter either an email or phone number.' })
      setSubmitting(false)
      return false
    }
    // console.log('values in handleSubmit:', values)
    // console.log('props:', props)
    props.navigation.navigate('CustomerInfo')
  },
  validationSchema: CustomerSchema,
  validateOnBlur: true,
  validateOnChange: false,
})(CustomerForm)

export default withNavigation(Form)
