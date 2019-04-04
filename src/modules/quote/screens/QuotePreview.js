import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import {
  fetchApi,
  Menu,
  PDF,
  styles,
} from '../components/QuotePreview'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

function QuotePreview({ navigation }) {
  const previewArgs = navigation.getParam('previewArgs')
  const customerID = navigation.getParam('customerID')
  const { data, isLoading, isError } = fetchApi(previewArgs)
  // console.log('customerID in QuotePreview:', customerID)

  return (
    <View style={styles.container}>
      <Menu
        filePath={data}
        fileArgs={previewArgs}
        customerID={customerID}
      />
      { isLoading && <Loader />}
      { isError && <Error error="An error occurred" /> }
      {data !== '' && <PDF filePath={data} /> }
    </View>
  )
}
QuotePreview.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuotePreview)
