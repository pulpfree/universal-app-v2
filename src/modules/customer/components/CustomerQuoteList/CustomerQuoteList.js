import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { graphql } from 'react-apollo'

import { SET_QUOTE } from '../../../quote/mutations/local'

import styles from './styles'
import { CustomerQuoteListHeader } from '../CustomerQuoteListHeader'
import { fmtDate, fmtMoney } from '../../../../util/fmt'
import { Loader } from '../../../common/components/Loader'


const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Quotes</Text>
  </View>
)

const ShowYes = ({ yesFlag }) => {
  if (!yesFlag) {
    return (
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text>{' '}</Text>
      </View>
    )
  }
  return (
    <View style={[styles.itemCell, styles.yesCell, { flex: 0.5 }]}>
      <Text style={styles.yesText}>Y</Text>
    </View>
  )
}
ShowYes.propTypes = {
  yesFlag: PropTypes.bool.isRequired,
}

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 0.5 }]}>
      <Text>{`${item.number}/${item.version}`}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{fmtDate(item.updatedAt)}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.5 }]}>
      <Text numberOfLines={1}>
        {`${item.jobsheetID.number} (${item.jobsheetID.addressID.street1})`}
      </Text>
    </View>
    <ShowYes yesFlag={item.invoiced} />
    <ShowYes yesFlag={item.invoiced && item.quotePrice.outstanding === 0} />
    <View style={styles.itemCell}>
      <Text style={styles.right}>{fmtMoney(item.quotePrice.total, 2, true)}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text style={styles.right}>{fmtMoney(item.quotePrice.outstanding, 2, true)}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class CustomerQuoteList extends React.Component {
  state = {
    loading: false,
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this._onPressItem(item)}
    >
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (item) => {
    const { navigation, setQuoteFromRemote } = this.props
    const customerID = navigation.getParam('customerID')

    if (item.invoiced) {
      navigation.navigate('InvoiceOptions', { quote: item, customerID })
      return
    }
    const jobSheetID = item.jobsheetID._id
    const quoteID = item._id
    const setRes = setQuoteFromRemote(jobSheetID, quoteID)
    this.setState(() => ({ loading: true }))
    // blocking navigate action so that the WindowForm component doesn't refresh unnecessarily
    setRes.then(() => {
      this.setState(() => ({ loading: false }))
      navigation.navigate('QuoteEdit', { quoteID, jobSheetID })
    })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, refetch, networkStatus } = this.props
    const { loading } = this.state

    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => refetch()}>
          <Header />
        </TouchableOpacity>
        {loading && <Loader />}
        <FlatList
          ListHeaderComponent={CustomerQuoteListHeader}
          data={data.quotes}
          keyExtractor={this._keyExtractor}
          onRefresh={() => refetch()}
          refreshing={networkStatus === 4}
          renderItem={this._renderItem}
        />
      </React.Fragment>
    )
  }
}
CustomerQuoteList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  refetch: PropTypes.func.isRequired,
  networkStatus: PropTypes.number.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setQuoteFromRemote: PropTypes.func.isRequired,
}

export default graphql(SET_QUOTE, {
  props: ({ mutate }) => ({
    setQuoteFromRemote: (jobSheetID, quoteID) => mutate({ variables: { jobSheetID, quoteID } }),
  }),
})(withNavigation(CustomerQuoteList))
