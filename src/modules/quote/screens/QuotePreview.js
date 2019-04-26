import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Menu, styles } from '../components/QuotePreview'
import { PDF } from '../../common/components/PDFViewer'
import signedUrlApi from '../../common/apis/signedUrlApi'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

function QuotePreview({ navigation }) {
  const previewArgs = navigation.getParam('previewArgs')
  const customerID = navigation.getParam('customerID')
  const { data, isLoading, isError } = signedUrlApi(previewArgs)
  const { filePath, signedURL } = data
  const haveFile = filePath !== ''

  if (isError) return <Error error="An error occurred" />

  return (
    <View style={styles.container}>
      <Menu
        customerID={customerID}
        fileArgs={previewArgs}
        filePath={filePath}
        signedURL={signedURL}
      />
      {isLoading && <Loader />}
      {haveFile && <PDF filePath={filePath} />}
    </View>
  )
}
QuotePreview.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuotePreview)
