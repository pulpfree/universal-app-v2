import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './index'
import { fmtMoney } from '../../../../util/fmt'

const ListItem = ({ item, quoteGroups }) => {
  const specs = JSON.parse(item.specs)
  const { groupType: { name } } = specs
  const { _id: itemID, qty } = item
  const { extendUnit, extendTotal } = item.costs
  const isSelected = quoteGroups.includes(itemID)
  const iconName = isSelected ? 'ios-checkbox' : 'ios-checkbox-outline'
  const rms = item.rooms && item.rooms.length > 0 ? item.rooms.join(', ') : ''

  return (
    <View style={styles.row}>
      <Icon
        name={iconName}
        type="ionicon"
        size={35}
        containerStyle={styles.checkbox}
        iconStyle={styles.icon}
      />
      <Text style={styles.smCell}>{qty}</Text>
      <Text style={styles.smCell}>{rms}</Text>
      <Text style={styles.nameCell}>{name}</Text>
      <Text style={styles.moneyCell}>{fmtMoney(extendUnit, 2, true)}</Text>
      <Text style={styles.moneyCell}>{fmtMoney(extendTotal, 2, true)}</Text>
    </View>
  )
}
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  quoteGroups: PropTypes.instanceOf(Object).isRequired,
}

class GroupList extends React.Component {
  _renderItem = ({ item }) => {
    const { quoteGroups } = this.props
    return (
      <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
        <ListItem item={item} quoteGroups={quoteGroups} />
      </TouchableOpacity>
    )
  }

  _onPressItem = (customerID) => {
    // const { navigation } = this.props
    // navigation.navigate('CustomerInfo', { customerID })
  }

  _keyExtractor = item => item._id

  render() {
    const { jobSheetGroups } = this.props
    return (
      <FlatList
        data={jobSheetGroups}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}
GroupList.propTypes = {
  quoteGroups: PropTypes.instanceOf(Object),
  jobSheetGroups: PropTypes.instanceOf(Object).isRequired,
}
GroupList.defaultProps = {
  quoteGroups: null,
}

export default GroupList
