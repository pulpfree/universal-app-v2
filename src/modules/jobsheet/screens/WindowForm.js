import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { graphql } from 'react-apollo'

import { Header } from '../components/JobSheetHeader'
import { WindowForm as Form } from '../components/WindowForm'
import { SET_JOBSHEET_ID } from '../mutations/local'

const WindowForm = ({ navigation, setJobSheetID }) => {
  const jobSheet = navigation.getParam('jobSheet')
  const windowID = navigation.getParam('windowID')
  const isNew = navigation.getParam('isNew', false)
  if (isNew) {
    setJobSheetID(jobSheet._id)
  }

  return (
    <View>
      <Header jobSheet={jobSheet} />
      <Form windowID={windowID} />
    </View>
  )
}
WindowForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  setJobSheetID: PropTypes.func.isRequired,
}

export default graphql(SET_JOBSHEET_ID, {
  props: ({ mutate }) => ({
    setJobSheetID: jobSheetID => mutate({ variables: { jobSheetID } }),
  }),
})(WindowForm)
