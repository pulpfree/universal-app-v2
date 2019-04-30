import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'aws-amplify'
import { Button } from 'react-native-elements'
import { withApollo } from 'react-apollo'
import { withAuthenticator } from 'aws-amplify-react-native'

import clr from '../../../../config/colors'
import { ConfirmSignIn } from '../../../auth/components/ConfirmSignIn'
import { SignIn } from '../../../auth/components/SignIn'
import { styles } from './index'

function Logout({
  authState,
  client,
  onStateChange,
  setLoggedIn,
}) {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    setUser(authUser.username)
  }

  const setLogger = () => {
    if (authState === 'signedIn') {
      setLoggedIn(true)
    }
  }

  useEffect(() => {
    fetchUser()
    setLogger()
  }, [authState])

  function signOut() {
    client.resetStore().then(() => {
      console.log('resetting store') // eslint-disable-line no-console
      Auth.signOut().then(() => {
        console.log('auth signOut') // eslint-disable-line no-console
        onStateChange('signedOut')
        setLoggedIn(false)
      })
    })
  }

  return (
    <Button
      buttonStyle={styles.button}
      icon={{
        name: 'exit-to-app',
        color: clr.white,
        size: 32,
      }}
      onPress={() => signOut()}
      title={`Sign Out ${user}`}
    />
  )
}
Logout.propTypes = {
  authState: PropTypes.string.isRequired,
  client: PropTypes.instanceOf(Object).isRequired,
  onStateChange: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
}

export default withAuthenticator(withApollo(Logout), false, [
  <SignIn />,
  <ConfirmSignIn />,
])
