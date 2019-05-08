import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'

import { graphql, Query } from 'react-apollo'

import { PRODUCTS } from '../queries'
import { SET_GROUP_JOBSHEET_ID } from '../mutations/local'

import { Header } from '../components/JobSheetHeader'
import { GroupForm as Form } from '../components/GroupForm'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

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
      <Query query={PRODUCTS}>
        {({ loading, error, data: { products } }) => {
          if (error) return <Error error={error} />
          if (loading) return <Loader />
          return <Form groupID={groupID} products={products} />
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
