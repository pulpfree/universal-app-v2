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
import { graphql, compose } from 'react-apollo'

import { QuoteListHeader } from '../QuoteListHeader'
import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'
import SearchQuotes from '../../queries/SearchQuotes'
import { withSearch } from '../SearchContext'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 0.3 }]}>
      <Text>{item.number}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{`${item.customerID.name.last}, ${item.customerID.name.first}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.5 }]}>
      <Text>{`${item.jobsheetID.addressID.street1}, ${item.jobsheetID.addressID.city}`}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 0.75 }]}>
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

const Totals = ({ totalInvoiced, totalOutstanding }) => (
  <View style={styles.costContainer}>
    <View style={styles.costCell}>
      <Text style={styles.costLabel}>Total Costs</Text>
      <Text style={styles.costValue}>{fmtMoney(totalInvoiced, 0, true, true)}</Text>
    </View>
    <View style={styles.costCell}>
      <Text style={styles.costLabel}>Total Outstanding</Text>
      <Text style={styles.costValue}>{fmtMoney(totalOutstanding, 0, true, true)}</Text>
    </View>
  </View>
)
Totals.propTypes = {
  totalInvoiced: PropTypes.number,
  totalOutstanding: PropTypes.number,
}
Totals.defaultProps = {
  totalInvoiced: 0.00,
  totalOutstanding: 0.00,
}

class QuoteSearchList extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this._onPressItem(item.customerID._id)}>
        <ListItem item={item} />
      </TouchableOpacity>
    )
  }

  _onPressItem = (customerID) => {
    const { navigation } = this.props
    navigation.navigate('CustomerInfo', { customerID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data } = this.props
    const { error, loading } = data

    if (error) return <Error error={error} />
    if (loading) return <Loader />

    const { searchQuotes } = data
    const { quotes, totalInvoiced, totalOutstanding } = searchQuotes

    return (
      <View>
        {data.variables.invoiced
          && <Totals totalInvoiced={totalInvoiced} totalOutstanding={totalOutstanding} />
        }
        <FlatList
          ListHeaderComponent={QuoteListHeader}
          data={quotes}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
QuoteSearchList.propTypes = {
  data: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
}
QuoteSearchList.defaultProps = {
  data: null,
}

const SearchList = graphql(SearchQuotes, {
  // fetchPolicy: 'network-only',
  // fetchPolicy: 'cache-first',
  // fetchPolicy: 'cache-and-network',

  options: (props) => {
    const variables = {
      invoiced: props.invoiced,
      closed: props.closed,
      year: '',
    }
    if (props.period) {
      variables.year = props.period
    }
    return ({
      variables,
      // fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    })
  },
})

export default compose(
  withSearch,
  withNavigation,
  SearchList,
)(QuoteSearchList)
