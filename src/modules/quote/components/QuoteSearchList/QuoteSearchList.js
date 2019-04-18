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

import { QUOTE_SEARCH } from '../../queries/remote'
import { SET_QUOTE } from '../../mutations/local'

import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import { QuoteListHeader } from '../QuoteListHeader'
import { fmtMoney } from '../../../../util/fmt'
import { withSearch } from '../SearchContext'

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
  state = {
    qteLoading: false,
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (item) => {
    const { invoiced } = this.props
    const { navigation, setQuoteFromRemote } = this.props
    const customerID = item.customerID._id
    const jobSheetID = item.jobsheetID._id
    const quoteID = item._id

    if (invoiced) {
      navigation.navigate('InvoiceOptions', { quote: item, customerID })
      return
    }
    const setRes = setQuoteFromRemote(jobSheetID, quoteID)
    this.setState(() => ({ qteLoading: true }))
    // blocking navigate action so that the WindowForm component doesn't refresh unnecessarily
    setRes.then(() => {
      this.setState(() => ({ qteLoading: false }))
      navigation.navigate('QuoteEdit', { quoteID, jobSheetID })
    })
  }

  _keyExtractor = item => item._id

  render() {
    const { data } = this.props
    const { error, loading } = data
    const { qteLoading } = this.state

    if (loading || qteLoading) return <Loader />
    if (error) return <Error error={error} />

    const { searchQuotes } = data
    const { quotes, totalInvoiced, totalOutstanding } = searchQuotes

    return (
      <View style={{ paddingBottom: 100 }}>
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
  invoiced: PropTypes.bool.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setQuoteFromRemote: PropTypes.func.isRequired,
}
QuoteSearchList.defaultProps = {
  data: null,
}

const SearchList = graphql(QUOTE_SEARCH, {
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

const QuoteFromRemote = graphql(SET_QUOTE, {
  props: ({ mutate }) => ({
    setQuoteFromRemote: (jobSheetID, quoteID) => mutate({ variables: { jobSheetID, quoteID } }),
  }),
})

export default compose(
  withSearch,
  withNavigation,
  QuoteFromRemote,
  SearchList,
)(QuoteSearchList)
