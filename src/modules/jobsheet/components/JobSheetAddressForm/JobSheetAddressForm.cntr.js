import { withFormik } from 'formik'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { Types } from 'mongoose'
import { compose, graphql } from 'react-apollo'

import JobSheetAddressForm from './JobSheetAddressForm'
import { PERSIST_JOBSHEET } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../../customer/queries'

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
  type: 'res',
}
const initialValuesTest = { // eslint-disable-line no-unused-vars
  street1: '47 Northgate Dr.',
  city: 'Welland',
  postalCode: 'L3C 5Y2',
  provinceCode: 'ON',
  addressType: 'res',
}

const Form = withFormik({
  displayName: 'AddressForm',
  enableReinitialize: true,
  handleSubmit: async (values, { props }) => {
    const customerID = Types.ObjectId(props.customerID)
    const variables = {
      jobSheetInput: {
        customerID,
      },
      addressInput: {
        associate: 'jobsheet',
        city: values.city,
        customerID,
        postalCode: values.postalCode,
        provinceCode: values.provinceCode,
        street1: values.street1,
        type: values.addressType,
      },
    }

    let graphqlReturn
    try {
      graphqlReturn = await props.persistJobSheet(variables)
      if (graphqlReturn && graphqlReturn.errors) {
        console.log('graphqlReturn.errors:', graphqlReturn.errors) // eslint-disable-line no-console
        return
      }
    } catch (error) {
      console.log('error:', error) // eslint-disable-line no-console
    }
  },
  mapPropsToValues: () => (initialValues),
  validationSchema: ValidateSchema,
  validateOnBlur: true,
  validateOnChange: false,
})(JobSheetAddressForm)

const PersistJobSheet = graphql(PERSIST_JOBSHEET, {
  props: ({ mutate }) => ({
    persistJobSheet: variables => mutate({
      variables: { ...variables },
      errorPolicy: 'all',
    }),
  }),
  options: props => ({
    onCompleted: (data) => {
      props.navigation.navigate('JobSheet', { jobSheetID: data.jobSheetPersist._id })
    },
    refetchQueries: [
      { query: CUSTOMER_DATA, variables: { customerID: props.customerID } },
    ],
  }),
  errorPolicy: 'all',
})

export default compose(
  withNavigation,
  PersistJobSheet,
)(Form)
