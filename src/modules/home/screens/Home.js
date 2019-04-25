import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Query } from 'react-apollo'

import { PRODUCTS } from '../../jobsheet/queries'

import { Menu } from '../components/Menu'
import { Welcome } from '../components/Welcome'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'

const Home = ({ navigation }) => (

  <View style={{ flexDirection: 'row' }}>
    <Query
      query={PRODUCTS}
      fetchPolicy="network-only"
    >
      {({ loading, error }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        return (
          <>
            <View style={{ flex: 0.75 }} />
            <View
              style={{
                flex: 1.5,
                flexDirection: 'column',
                justifyContent: 'center',
                height: 400,
                maxWidth: 600,
              }}
            >
              <Welcome />
              <Menu navigation={navigation} />
            </View>
            <View style={{ flex: 0.75 }} />
          </>
        )
      }}
    </Query>
  </View>
)
Home.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default Home
