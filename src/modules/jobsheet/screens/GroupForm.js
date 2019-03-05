import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'

import { graphql, Query } from 'react-apollo'

import { Header } from '../components/JobSheetHeader'
import { GroupForm as Form } from '../components/GroupForm'
import { GROUP_TYPES } from '../queries'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'
import { SET_GROUP_JOBSHEET_ID } from '../mutations/local'

const GroupForm = ({ navigation, setGroupJobSheetID }) => {
  const jobSheet = navigation.getParam('jobSheet')
  const groupID = navigation.getParam('groupID')
  const isNew = navigation.getParam('isNew', false)
  if (isNew) {
    setGroupJobSheetID(jobSheet._id)
  }

  return (
    <View>
      <Header jobSheet={jobSheet} />
      <Query query={GROUP_TYPES}>
        {({ loading, error, data: { groupTypes, products } }) => {
          if (error) return <Error error={error} />
          if (loading) return <Loader />
          return <Form groupID={groupID} groupTypes={groupTypes} products={products} />
        }}
      </Query>
    </View>
  )
}
GroupForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  setGroupJobSheetID: PropTypes.func.isRequired,
}

export default graphql(SET_GROUP_JOBSHEET_ID, {
  props: ({ mutate }) => ({
    setGroupJobSheetID: jobSheetID => mutate({ variables: { jobSheetID } }),
  }),
})(GroupForm)
