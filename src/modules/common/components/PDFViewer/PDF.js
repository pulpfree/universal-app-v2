import React from 'react'
import PropTypes from 'prop-types'
import Pdf from 'react-native-pdf'

import styles from './styles'

export default function PDF({ filePath }) {
  const source = { uri: filePath }

  return (
    <Pdf
      source={source}
      // onLoadComplete={(numberOfPages, fPath) => {
      //   console.log(`number of pages: ${numberOfPages}`)
      //   console.log(`filePath: ${fPath}`)
      // }}
      onError={(err) => {
        console.error('error uri: ', filePath) // eslint-disable-line no-console
        console.error('error: ', err) // eslint-disable-line no-console
      }}
      style={styles.pdfCont}
    />
  )
}
PDF.propTypes = {
  filePath: PropTypes.string.isRequired,
}
