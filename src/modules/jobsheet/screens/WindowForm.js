import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'

import { Query } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { Header } from '../components/JobSheetHeader'
import { WindowForm as Form } from '../components/WindowForm'
import Products from '../queries/Products'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

const WindowForm = ({ navigation }) => {
  const jobSheet = navigation.getParam('jobSheet')
  return (
    <View>
      <Header jobSheet={jobSheet} />
      <Query query={Products}>
        {({ loading, error, data: { products } }) => {
          if (error) return <Error error={error} />
          if (loading) return <Loader />
          return <Form products={products} />
        }}
      </Query>
    </View>
  )
}
WindowForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}
export default withNavigation(WindowForm)
