import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'

import { Query } from 'react-apollo'

import { Header } from '../components/JobSheetHeader'
import { GroupForm as Form } from '../components/GroupForm'
import GroupTypes from '../queries/GroupTypes'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

const GroupForm = ({ data }) => (
  <View>
    <Header data={data} />
    <Query query={GroupTypes}>
      {({ loading, error, data: { groupTypes, products } }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        return <Form groupTypes={groupTypes} products={products} />
      }}
    </Query>
  </View>
)
GroupForm.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}

export default GroupForm
