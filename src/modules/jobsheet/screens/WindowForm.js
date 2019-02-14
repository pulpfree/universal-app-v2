import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import PRODUCTS from '../queries/Products'
import { Error } from '../../common/components/Error'
import { Header } from '../components/JobSheetHeader'
import { Loader } from '../../common/components/Loader'
import { WindowForm as Form } from '../components/WindowForm'

const GET_WINDOW = gql`{
  window: setWindowFromRemote(windowID: $windowID) @client {
    __typename,
    _id
    qty
    rooms
    productID {
      _id
    }
    specs {
      installType
    }
  }
}`

const GET_SCRATCH = gql`
  {
    window @client {
      _id
      qty
      rooms
    }
  }`

const WindowForm = ({ data, navigation }) => {
  const jobSheet = navigation.getParam('jobSheet')
  const windowID = navigation.getParam('windowID')
  const isNew = navigation.getParam('isNew', false)
  const query = isNew ? GET_SCRATCH : GET_WINDOW

  // console.log('data in WindowForm:', data)

  if (data.error) return <Error error={data.error} />
  if (data.loading) return <Loader />
  const { products } = data
  // console.log('products:', products)

  return (
    <View>
      <Header jobSheet={jobSheet} />
      <Form products={products} windowID={windowID} />
    </View>
  )
}
WindowForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object),
}
WindowForm.defaultProps = {
  data: null,
}

export default graphql(PRODUCTS)(withNavigation(WindowForm))
