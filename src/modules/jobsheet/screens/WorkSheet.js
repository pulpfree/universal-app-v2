import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Menu, styles } from '../components/WorkSheetPreview'
import { PDF } from '../../common/components/PDFViewer'
import signedUrlApi from '../../common/apis/signedUrlApi'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

function WorkSheet({ navigation }) {
  const fileArgs = navigation.getParam('fileArgs')
  const { data, isLoading, isError } = signedUrlApi(fileArgs)
  const { filePath, signedURL } = data
  const haveFile = filePath !== ''

  if (isError) return <Error error="An error occurred" />

  return (
    <View style={styles.container}>
      <Menu
        fileArgs={fileArgs}
        filePath={filePath}
        signedURL={signedURL}
      />
      {isLoading && <Loader />}
      {haveFile && <PDF filePath={filePath} />}
    </View>
  )
}
WorkSheet.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(WorkSheet)
