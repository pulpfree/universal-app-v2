import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { View, Text } from 'react-native'


import { styles } from './index'


const Welcome = () => {
  const [user, setUser] = useState(null)
  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    setUser(authUser)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // We query here for products as a means to 'warm' the lambda, and
  // to speed up 'products' calls later on.
  // Using 'network-only' as fetchPolicy to ensure we are indeed making a hit on lambda
  return (
    <View style={styles.view}>
      {user && (
        <Text style={styles.text}>
          {`Welcome ${user.attributes.name}`}
        </Text>
      )}
      <Text>Select an activity</Text>
    </View>
  )
}

export default Welcome
