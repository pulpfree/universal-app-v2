import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'

import { QuoteListHeader } from '../QuoteListHeader'
import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'


const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 0.3 }]}>
      <Text>{item.number}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{`${item.customer.name.last}, ${item.customer.name.first}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.5 }]}>
      <Text>{`${item.address.street1}, ${item.address.city}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.75 }]}>
      <Text style={{ textAlign: 'right' }}>{fmtMoney(item.quotePrice.total, 2, true)}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.75 }]}>
      <Text style={{ textAlign: 'right' }}>{fmtMoney(item.quotePrice.total, 2, true)}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class QuoteSearchList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item.customer._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (customerID) => {
    const { navigation } = this.props
    navigation.navigate('CustomerInfo', { customerID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data } = this.props

    return (
      <ScrollView>
        <FlatList
          ListHeaderComponent={QuoteListHeader}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </ScrollView>
    )
  }
}
QuoteSearchList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuoteSearchList)
