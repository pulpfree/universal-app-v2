import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import AWSAppSyncClient from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'

import appSyncConfig from './aws-exports'

// import Navigator from './config/tabs'
import Navigator from './config/routes'
import theme from './config/paperTheme'

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
})

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <PaperProvider theme={theme}>
        <Navigator onNavigationStateChange={null} />
      </PaperProvider>
    </Rehydrated>
  </ApolloProvider>
)
