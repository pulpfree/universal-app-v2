import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'aws-amplify'
import { Button } from 'react-native-elements'
import { compose, withApollo } from 'react-apollo'
import { withNavigation } from 'react-navigation'
import { withAuthenticator } from 'aws-amplify-react-native'

import clr from '../../../../config/colors'
import { styles } from './index'


function Logout(props) {
  console.log('props in logout:', props)
  const [user, setUser] = useState(null)
  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    setUser(authUser.username)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  function signOut() {
    Auth.signOut({ global: true })
      .then(() => {
        console.log('signout data: ')
        props.client.resetStore().then(() => {
          console.log('store reset')
        })
      })
      .catch(err => console.log('signout error: ', err))
    // props.authState = 'signIn'
    // console.log('setAuthState:', aarn)
    // Auth.authState('signIn')
    // Auth.signOut()
      // .then((adata) => {
        // console.log('adata:', adata)
        // Auth.authState('signIn')
      // })
    // console.log('client:', client)
    /* props.client.resetStore().then(() => {
      // console.log('NavigationEvents:', NavigationEvents)
      console.log('resetting store')
      Auth.signOut().then(() => {
        console.log('auth signOut')
        // navigation.navigate('Home')
        // Auth.authState('signIn')
        // console.dir(Auth)
      })
    }) */
      // () => console.log('clearing cache...')
      // () => this.setState({ reset: false })
    // )
    /* return Auth.signOut()
      .then(() => {
        Auth.authState('signIn')
      })
      .catch(err => console.error(err)) */ // eslint-disable-line
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
  client: PropTypes.instanceOf(Object).isRequired,
}

// export default withApollo(Logout)
export default compose(
  withAuthenticator,
  withNavigation,
  withApollo,
)(Logout)
