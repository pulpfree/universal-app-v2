import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Text, View } from 'react-native'
import { Query } from 'react-apollo'

import { NEARBY_JOBS } from '../queries.remote'

import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'
import { NearbyJobsList } from '../components/NearbyJobsList'
import { NearbyJobsMap } from '../components/NearbyJobsMap'
import { styles } from '../components/NearbyJobs'

export default function NearbyJobs({ navigation }) {
  const address = navigation.getParam('address')
  const geoInput = {
    // maxDistance: 10000,
    coordinates: address.coordinates,
  }
  return (
    <Query
      query={NEARBY_JOBS}
      skip={!geoInput}
      variables={{ input: geoInput }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data: { quoteNearbyJobs: jobs } }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        return (
          <ScrollView>
            <View style={styles.titleHeader}>
              <Text style={styles.titleText}>{`Job Location: ${address.street1}, ${address.city}`}</Text>
            </View>
            <NearbyJobsList jobs={jobs} />
            <NearbyJobsMap address={address} jobs={jobs} />
          </ScrollView>
        )
      }}
    </Query>
  )
}
NearbyJobs.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}
