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
  const { filePath, signedURL } = data

  if (isLoading) return <Loader />
  if (isError) return <Error error="An error occurred" />

  return (
    <View style={styles.container}>
      <Menu
        filePath={filePath}
        fileArgs={previewArgs}
        customerID={customerID}
        signedURL={signedURL}
      />
      {filePath !== '' && <PDF filePath={filePath} />}
    </View>
  )
}
QuotePreview.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuotePreview)
