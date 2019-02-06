import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'

import AWSAppSyncClient from 'aws-appsync'
import Amplify, { Auth } from 'aws-amplify'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import { withAuthenticator } from 'aws-amplify-react-native'

import appSyncConfig from './aws-exports'

import Navigator from './config/tabs'
// import Navigator from './config/routes'
import theme from './config/paperTheme'

import { SignIn } from './modules/auth/components/SignIn'
import { ConfirmSignIn } from './modules/auth/components/ConfirmSignIn'
import { ForgotPassword } from './modules/auth/components/ForgotPassword'
import { RequireNewPassword } from './modules/auth/components/RequireNewPassword'

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
})

const awsExports = {
  Auth: {
    region: appSyncConfig.aws_appsync_region,
    userPoolId: appSyncConfig.aws_user_pools_id,
    userPoolWebClientId: appSyncConfig.aws_user_pools_web_client_id,
  },
}
Amplify.configure(awsExports)

const App = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <PaperProvider theme={theme}>
        <Navigator onNavigationStateChange={null} />
      </PaperProvider>
    </Rehydrated>
  </ApolloProvider>
)

class AppWithAuth extends React.Component {
  async componentWillMount() {
    // Auth.authState('confirmSignIn')
    const user = await Auth.currentAuthenticatedUser()
    if (user) {
      // this.setState({user})
      console.log('fetching user from Auth', user) // eslint-disable-line
      // const storage = window.localStorage
      // console.log('user in componentDidMount: ', user.signInUserSession.accessToken.jwtToken)
      // storage.setItem('userToken', user.signInUserSession.accessToken.jwtToken)
    }
  }

  handleAuthStateChange(state) { // eslint-disable-line
    console.log('state in handleAuthStateChange: ', state) // eslint-disable-line
    // if (state === 'signedIn') {
    // Do something when the user has signed-in
    // }
  }

  render() {
    console.log('this.props.authState:', this.props.authState)
    console.log('authState:', this.props.authState)

    return (
      <App onStateChange={this.handleAuthStateChange} />
    )
  }
}

export default withAuthenticator(AppWithAuth, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <ForgotPassword />,
  <RequireNewPassword />,
])

// export default App
