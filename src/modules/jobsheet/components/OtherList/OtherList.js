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
  const rooms = item.rooms && item.rooms.length ? item.rooms.join(', ') : ''
  const specs = JSON.parse(item.specs)
  const { costs, description } = item
  const { options } = specs

  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{item.qty}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{rooms}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1.5, marginRight: 15 }]}>
        <Text>{description}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1 }]}>
        <Text>{options}</Text>
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

class OtherList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (jobSheetID) => {
    const { navigation } = this.props
    navigation.navigate('OtherForm', { jobSheetID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, navigation } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('OtherForm')}>
          <ListHeader navigation={navigation} title="Other" />
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
OtherList.propTypes = {
  data: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
}
OtherList.defaultProps = {
  data: [],
}

export default withNavigation(OtherList)
