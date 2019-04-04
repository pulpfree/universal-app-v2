import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import Amplify, { Auth } from 'aws-amplify'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import { withAuthenticator } from 'aws-amplify-react-native'

import appSyncConfig from './aws-exports'
import client from './apollo'

import Navigator from './config/routes'
// import Navigator from './config/tabs'
import theme from './config/paperTheme'

import { SignIn } from './modules/auth/components/SignIn'
import { ConfirmSignIn } from './modules/auth/components/ConfirmSignIn'
import { ForgotPassword } from './modules/auth/components/ForgotPassword'
import { RequireNewPassword } from './modules/auth/components/RequireNewPassword'


const awsExports = {
  Auth: {
    region: appSyncConfig.aws_appsync_region,
    userPoolId: appSyncConfig.aws_user_pools_id,
    userPoolWebClientId: appSyncConfig.aws_user_pools_web_client_id,
    identityPoolId: appSyncConfig.aws_cognito_identity_pool_id,
  },
  Storage: {
    AWSS3: {
      bucket: 'ca-universalwindows',
      region: 'ca-central-1', //OPTIONAL -  Amazon service region
    },
  },
  // aws_user_files_s3_bucket: 'ca-universalwindows',
  // aws_user_files_s3_bucket_region: 'ca-central-1',
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
    // await client.resetStore()
    // Auth.authState('confirmSignIn')
    const user = await Auth.currentAuthenticatedUser()
    if (user) {
      console.log('fetching user from Auth', user) // eslint-disable-line
    }
  }

  handleAuthStateChange(state) { // eslint-disable-line
    // console.log('state in handleAuthStateChange: ', state) // eslint-disable-line
    // if (state === 'signedIn') {
    // Do something when the user has signed-in
    // }
  }

  render() {
    // console.log('this.props.authState:', this.props.authState)
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
