import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { graphql, compose } from 'react-apollo'

import { CUSTOMER_RECENT } from '../../queries'

import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import { ListHeader } from './index'
import { fmtMoney } from '../../../../util/fmt'

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 0.3 }]}>
      <Text>{item.number}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.25 }]}>
      <Text>{`${item.customer.name.last}, ${item.customer.name.first}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.25 }]}>
      <Text numberOfLines={1} ellipsizeMode="tail">{`${item.address.street1}, ${item.address.city}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.65 }]}>
      <Text style={{ textAlign: 'right' }}>{fmtMoney(item.quotePrice.total, null, true)}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.75 }]}>
      <Text style={{ textAlign: 'right' }}>{fmtMoney(item.quotePrice.outstanding, null, true)}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class CustomerRecent extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (item) => {
    const { navigation } = this.props
    const customerID = item._id
    navigation.navigate('CustomerInfo', { customerID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data } = this.props
    const { error, loading } = data

    if (loading) return <Loader />
    if (error) return <Error error={error} />

    const { searchCustomerRecent: customers } = data

    return (
      <View style={{ paddingBottom: 20 }}>
        <FlatList
          ListHeaderComponent={ListHeader}
          data={customers}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
CustomerRecent.propTypes = {
  data: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
}
CustomerRecent.defaultProps = {
  data: null,
}

const SearchList = graphql(CUSTOMER_RECENT, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  }),
})

export default compose(
  withNavigation,
  SearchList,
)(CustomerRecent)
