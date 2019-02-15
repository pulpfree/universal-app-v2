import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
// import { withNavigation } from 'react-navigation'

import PRODUCTS from '../queries/Products'
import { Error } from '../../common/components/Error'
import { Header } from '../components/JobSheetHeader'
import { Loader } from '../../common/components/Loader'
import { WindowForm as Form } from '../components/WindowForm'


const SET_WINDOW = gql`
  mutation setWindowFromRemote($windowID: ID!) {
  setWindowFromRemote(windowID: $windowID) @client
}
`

const WindowForm = ({ data, navigation }) => {
  const jobSheet = navigation.getParam('jobSheet')
  const windowID = navigation.getParam('windowID')
  // const isNew = navigation.getParam('isNew', false)

  if (data.error) return <Error error={data.error} />
  if (data.loading) return <Loader />
  const { products } = data

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

const SetWindow = graphql(SET_WINDOW, {
  props: ({ mutate }) => ({
    setWindowFromRemote: windowID => mutate({ variables: { windowID } }),
  }),
})
const FetchProducts = graphql(PRODUCTS)

export default compose(
  SetWindow,
  FetchProducts,
)(WindowForm)
