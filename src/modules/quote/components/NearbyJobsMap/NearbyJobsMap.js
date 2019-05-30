import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { styles } from './index'

export default function NearbyJobsMap({ address, jobs }) {

  const [region, setRegion] = useState()

  const calDelta = (lat, lng, accuracy = 10) => {
    // const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const oneDegreeOfLatitudeInMeters = 111.32 * 1.5 // modified from original to zoom out
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters
    const lngDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)))

    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
      accuracy,
    })
  }
  useEffect(() => {
    // calDelta(currentLocation[1], currentLocation[0])
    calDelta(address.coordinates[1], address.coordinates[0])
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
      >
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="You are here"
            description={address.street1}
            pinColor="green"
          />
        )}
        {jobs && jobs.map(job => (
          <Marker
            key={job._id}
            coordinate={{
              latitude: job.location.coordinates[1],
              longitude: job.location.coordinates[0],
            }}
            // title="You are here"
            title={job.street1}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  )
}
NearbyJobsMap.propTypes = {
  address: PropTypes.instanceOf(Object).isRequired,
  jobs: PropTypes.instanceOf(Object).isRequired,
}
