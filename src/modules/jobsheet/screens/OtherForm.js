import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { graphql } from 'react-apollo'

import { Header } from '../components/JobSheetHeader'
import { OtherForm as Form } from '../components/OtherForm'
import { SET_OTHER_JOBSHEET_ID } from '../mutations/local'

const OtherForm = ({ navigation, setOtherJobSheetID }) => {
  const jobSheet = navigation.getParam('jobSheet')
  const isNew = navigation.getParam('isNew', false)
  if (isNew) {
    setOtherJobSheetID(jobSheet._id)
  }

  return (
    <View>
      <Header jobSheet={jobSheet} />
      <Form />
    </View>
  )
}
OtherForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  setOtherJobSheetID: PropTypes.func.isRequired,
}

export default graphql(SET_OTHER_JOBSHEET_ID, {
  props: ({ mutate }) => ({
    setOtherJobSheetID: jobSheetID => mutate({ variables: { jobSheetID } }),
  }),
})(OtherForm)
