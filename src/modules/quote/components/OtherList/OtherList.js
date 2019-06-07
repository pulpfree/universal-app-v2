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

import { styles } from './index'
import { fmtMoney } from '../../../../util/fmt'

const ListItem = ({ item, quoteOther }) => {
  const { description: name } = item
  const { _id: itemID, qty } = item
  const { extendUnit, extendTotal } = item.costs
  const isSelected = quoteOther.includes(itemID)
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
  quoteOther: PropTypes.instanceOf(Object).isRequired,
}

class OtherList extends React.Component {
  _renderItem = ({ item }) => {
    const { quoteOther } = this.props
    return (
      <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
        <ListItem item={item} quoteOther={quoteOther} />
      </TouchableOpacity>
    )
  }

  _onPressItem = (itemID) => {
    const { toggleQuoteItem } = this.props
    toggleQuoteItem(itemID, 'other')
  }

  _keyExtractor = item => item._id

  render() {
    const { jobSheetOther, quoteOther } = this.props
    return (
      <FlatList
        data={jobSheetOther}
        extraData={quoteOther}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}
OtherList.propTypes = {
  quoteOther: PropTypes.instanceOf(Object),
  jobSheetOther: PropTypes.instanceOf(Object).isRequired,
  toggleQuoteItem: PropTypes.func.isRequired,
}
OtherList.defaultProps = {
  quoteOther: null,
}

export default graphql(TOGGLE_ITEM, {
  props: ({ mutate }) => ({
    toggleQuoteItem: (itemID, itemType) => mutate({ variables: { itemID, itemType } }),
  }),
})(OtherList)
