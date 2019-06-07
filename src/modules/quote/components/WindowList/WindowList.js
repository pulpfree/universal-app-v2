import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { graphql } from 'react-apollo'

import { TOGGLE_ITEM } from '../../mutations/local'

import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'


const ListItem = ({ item, quoteWindows }) => {
  const { name: productName } = item.productID
  const { _id: itemID, qty } = item
  const { extendUnit, extendTotal } = item.costs
  const isSelected = quoteWindows.includes(itemID)
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
      <Text style={styles.nameCell}>{productName}</Text>
      <Text style={styles.moneyCell}>{fmtMoney(extendUnit, 2, true)}</Text>
      <Text style={styles.moneyCell}>{fmtMoney(extendTotal, 2, true)}</Text>
    </View>
  )
}
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  quoteWindows: PropTypes.instanceOf(Object).isRequired,
}

class WindowList extends React.Component {
  _renderItem = ({ item }) => {
    const { quoteWindows } = this.props
    return (
      <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
        <ListItem item={item} quoteWindows={quoteWindows} />
      </TouchableOpacity>
    )
  }

  _onPressItem = (itemID) => {
    const { toggleQuoteItem } = this.props
    toggleQuoteItem(itemID, 'window')
  }

  _keyExtractor = item => item._id

  render() {
    const { jobSheetWindows, quoteWindows } = this.props

    return (
      <FlatList
        data={jobSheetWindows}
        extraData={quoteWindows}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}
WindowList.propTypes = {
  quoteWindows: PropTypes.instanceOf(Object),
  jobSheetWindows: PropTypes.instanceOf(Object).isRequired,
  toggleQuoteItem: PropTypes.func.isRequired,
}
WindowList.defaultProps = {
  quoteWindows: null,
}

export default graphql(TOGGLE_ITEM, {
  props: ({ mutate }) => ({
    toggleQuoteItem: (itemID, itemType) => mutate(
      { variables: { itemID, itemType } }
    ),
  }),
})(WindowList)
