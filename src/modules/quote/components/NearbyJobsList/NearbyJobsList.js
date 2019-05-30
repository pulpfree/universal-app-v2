import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { styles } from './index'

const roundDistance = (distance) => {
  const numObj = distance / 1000
  return numObj.toFixed(1)
}

const handleGoToMaps = (item) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
  const latLng = `${item.location.coordinates[1]},${item.location.coordinates[0]}`
  const label = item.street1
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  })

  Linking.openURL(url)
}

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 1.3 }]}>
      <Text>{`${item.street1}, ${item.city}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.3 }]}>
      <Text>{`${roundDistance(item.dist.calculated)} km`}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class NearbyJobsList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleGoToMaps(item)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _keyExtractor = item => item._id

  render() {
    const { jobs } = this.props
    return (
      <View>
        <FlatList
          data={jobs}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
NearbyJobsList.propTypes = {
  jobs: PropTypes.instanceOf(Object).isRequired,
}

export default NearbyJobsList
