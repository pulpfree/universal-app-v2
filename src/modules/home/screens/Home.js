import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Query } from 'react-apollo'
import { withAuthenticator } from 'aws-amplify-react-native'

import { GROUP_TYPES } from '../../jobsheet/queries'

import { Menu } from '../components/Menu'
import { Welcome } from '../components/Welcome'
import { Error } from '../../common/components/Error'
import { styles } from '../components/Home'

const Home = ({ authState, navigation }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (authState === 'signedIn') {
      setLoggedIn(true)
    }
  }, [])

  // We query here for products as a means to 'warm' the lambda, and
  // to speed up 'products' calls later on.
  // Using 'network-only' as fetchPolicy to ensure we are indeed making a hit on lambda
  return (
    <View style={styles.container}>
      <Query
        query={GROUP_TYPES}
        fetchPolicy="network-only"
      >
        {({ loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) {
            return (
              <View style={styles.loadView}>
                <Text style={styles.loadText}>Stand by, preloading products...</Text>
              </View>
            )
          }
          return (
            <React.Fragment>
              <View style={styles.col} />
              <View style={styles.main}>
                {loggedIn && <Welcome />}
                <Menu
                  loggedIn={loggedIn}
                  navigation={navigation}
                  setLoggedIn={setLoggedIn}
                />
              </View>
              <View style={styles.col} />
            </React.Fragment>
          )
        }}
      </Query>
    </View>
  )
}
Home.propTypes = {
  authState: PropTypes.string,
  navigation: PropTypes.instanceOf(Object).isRequired,
}
Home.defaultProps = {
  authState: '',
}

export default withAuthenticator(Home)
