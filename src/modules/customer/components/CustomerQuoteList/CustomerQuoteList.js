import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'

import { CustomerQuoteListHeader } from '../CustomerQuoteListHeader'
import styles from './styles'
import { fmtDate, fmtMoney } from '../../../../util/fmt'

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
    <View style={[styles.itemCell, { flex: 0.75 }]}>
      <Text>{`${item.number}/${item.version}`}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{fmtDate(item.updatedAt)}</Text>
    </View>
    <View style={[styles.itemCell, { flex: 1.5 }]}>
      <Text>123 Street Avenue</Text>
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
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (quoteID) => {
    const { navigation } = this.props
    navigation.navigate('QuotePreview', { quoteID })
  }

  _keyExtractor = item => item._id

  render() {
    const { data } = this.props

    return (
      <React.Fragment>
        <Header />
        <FlatList
          ListHeaderComponent={CustomerQuoteListHeader}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </React.Fragment>
    )
  }
}
CustomerQuoteList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(CustomerQuoteList)
