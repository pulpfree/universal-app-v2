import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Button, Icon } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'


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
      .then((data) => {
        console.log(data)
        Auth.authState('signIn')
      })
      .catch(err => console.log(err))
  }

  return (
    <Button
      onPress={() => signOut()}
      title={`Sign Out ${user}`}
      buttonStyle={styles.button}
      icon={(
        <Icon
          name="exit-to-app"
          color={clr.white}
        />
      )}
    />
  )
}
