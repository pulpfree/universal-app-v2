import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from 'aws-appsync'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { Auth } from 'aws-amplify'

import appSyncConfig from '../aws-exports'
import graphql from './graphql'

const stateLink = createLinkWithCache(cache => withClientState({
  cache,
  ...graphql,
}))

const appSyncLink = createAppSyncLink(
  {
    disableOffline: true,
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
    },
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  },
)

const link = ApolloLink.from([stateLink, appSyncLink])
const client = new AWSAppSyncClient({}, { link })
/* console.log('client:', client)
client.cache.writeData({
  data: {
    group: {
      id: '1',
    },
  },
}) */

export default client
