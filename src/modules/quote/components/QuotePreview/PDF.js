import React from 'react'
import PropTypes from 'prop-types'
import Pdf from 'react-native-pdf'
import { Text, View } from 'react-native'
import { Query } from 'react-apollo'

import { Auth, Storage } from 'aws-amplify'
import appSyncConfig from '../../../../aws-exports'

import { PDF_SIGNED_URL } from '../../queries/remote'

import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import styles from './styles'

export default function PDF({ previewArgs }) {
 /*  Auth.configure({
    // To get the aws credentials, you need to configure 
    // the Auth module with your Cognito Federated Identity Pool
    identityPoolId: appSyncConfig.aws_cognito_identity_pool_id,
    region: appSyncConfig.aws_appsync_region,
  }) */

  /* Storage.configure({
    AWSS3: {
      bucket: 'ca-universalwindows',
      region: 'ca-central-1',
    },
  }) */
  // console.log('previewargs  ', previewArgs)
  Storage.list('quote/')
    .then(result => console.log('result: ', result))
    .catch(err => console.log('err: ', err))

  return (
    <Query
      query={PDF_SIGNED_URL}
      variables={{ input: previewArgs }}
      fetchPolicy="no-cache"
    >
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        {/* const source = { uri: data.pdfSignedURL.data.url } */}
        const source = { uri: 'https://s3.ca-central-1.amazonaws.com/ca-universalwindows/quote/qte-9013-r1.pdf' }
        console.log('source: ', source.uri)
        {/* <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
            //   console.log(`number of pages: ${numberOfPages}`)
              console.log(`filePath: ${filePath}`)
            }}
            onError={(err) => {
              console.log('error: ', err) // eslint-disable-line no-console
              console.log('source: ', source.uri) // eslint-disable-line no-console
            }}
            style={styles.pdfCont}
          /> */}
        return (
          <View><Text>{source.uri}</Text></View>
          
        )
      }}
    </Query>
  )
}
PDF.propTypes = {
  previewArgs: PropTypes.instanceOf(Object).isRequired,
}
