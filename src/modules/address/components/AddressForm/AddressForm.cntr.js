import { withFormik } from 'formik'
import * as Yup from 'yup'

import AddressForm from './AddressForm'

const ValidateSchema = Yup.object().shape({
  street1: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  postalCode: Yup.string()
    .required('Required'),
})

const initialValues = {
  provinceCode: 'ON',
}

const Form = withFormik({
  displayName: 'AddressForm',
  enableReinitialize: true,
  mapPropsToValues: () => (initialValues),
  validationSchema: ValidateSchema,
  validateOnBlur: true,
  validateOnChange: false,
})(AddressForm)

export default Form
