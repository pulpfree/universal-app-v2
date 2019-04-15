import React from 'react'
import { Alert } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'

import Amplify, { Auth } from 'aws-amplify'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import { withAuthenticator } from 'aws-amplify-react-native'
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import { Client } from 'bugsnag-react-native'

import appSyncConfig from './aws-exports'
import client from './apollo'

import Navigator from './config/routes'
// import Navigator from './config/tabs'
import theme from './config/paperTheme'

import { SignIn } from './modules/auth/components/SignIn'
import { ConfirmSignIn } from './modules/auth/components/ConfirmSignIn'
import { ForgotPassword } from './modules/auth/components/ForgotPassword'
import { RequireNewPassword } from './modules/auth/components/RequireNewPassword'
import { BugsnagAPIKey } from './config/constants'


const awsExports = {
  Auth: {
    region: appSyncConfig.aws_appsync_region,
    userPoolId: appSyncConfig.aws_user_pools_id,
    userPoolWebClientId: appSyncConfig.aws_user_pools_web_client_id,
    // this was added when attempting to hook up Storage
    identityPoolId: appSyncConfig.aws_cognito_identity_pool_id,
  },
}
Amplify.configure(awsExports)

const bugsnag = new Client(BugsnagAPIKey)

const reporter = (error) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  // bugsnag.notify(new Error("Test error"))
  bugsnag.notify(error)
  console.log('error in reporter: ', error) // eslint-disable-line no-console
}
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reporter(e)
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        We have reported this to our team ! Please close the app and start again!
        `,
      /* [{
        text: 'Close',
        onPress: () => {
          BackAndroid.exitApp()
        }
      }] */
    )
  } else {
    console.log(e) // eslint-disable-line no-console
  }
}
setJSExceptionHandler(errorHandler)
setNativeExceptionHandler((errorString) => {
  // You can do something like call an api to report to dev team here example
  // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
  // console.log('errorString:', errorString) // eslint-disable-line no-console
  bugsnag.notify(new Error(errorString))
})

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
      const { email, name } = user.attributes
      const { username } = user
      bugsnag.setUser(username, name, email)
    }
  }

  handleAuthStateChange(state) { // eslint-disable-line
    console.log('state in handleAuthStateChange: ', state) // eslint-disable-line
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
