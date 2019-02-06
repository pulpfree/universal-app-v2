import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'

import { styles } from './index'
import { ListHeader } from '../ListHeader'
import { fmtMoney } from '../../../../util/fmt'

const ListItem = ({ item }) => {
  const { costs } = item
  const specs = JSON.parse(item.specs)
  const { name } = specs.groupType
  const rooms = item.rooms && item.rooms.length ? item.rooms.join(', ') : ''
  const dims = JSON.parse(item.dims)
  let dimStr = `${dims.width.inch}`
  if (dims.width.fraction) dimStr += ` ${dims.width.faction}`
  dimStr += ` x ${dims.height.inch}`
  if (dims.height.fraction) dimStr += ` ${dims.height.faction}`

  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{item.qty}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text>{rooms}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1.75 }]}>
        <Text>{name}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.75 }]}>
        <Text>{dimStr}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text style={styles.itemCost}>{fmtMoney(costs.extendUnit, 2, true)}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text style={styles.itemCost}>{fmtMoney(costs.extendTotal, 2, true)}</Text>
      </View>
    </View>
  )
}
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class GroupList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (jobSheetID) => {
    const { navigation } = this.props
    navigation.navigate('GroupForm', { jobSheetID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, navigation } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('GroupForm')}>
          <ListHeader navigation={navigation} title="Groups" />
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
GroupList.propTypes = {
  data: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
}
GroupList.defaultProps = {
  data: [],
}

export default withNavigation(GroupList)
