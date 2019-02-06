import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from 'react-native-elements'

import clr from '../../../../config/colors'
import { styles } from './index'


export default function Logout() {
  const [user, setUser] = useState(null)
  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    setUser(authUser.username)
  }
  useEffect(() => {
    fetchUser()
  }, {})

  function signOut() {
    return Auth.signOut()
      .then(() => {
        Auth.authState('signIn')
      })
      .catch(err => console.error(err)) // eslint-disable-line
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
