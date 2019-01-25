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

import styles from './styles'
import SearchCustomer from '../../queries/SearchCustomer'
import { withSearch } from '../../../common/components/SearchContext'

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={styles.itemCell}>
      <Text>{`${item.name.last}, ${item.name.first}`}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{item.address.street1}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{item.address.city}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class CustomerSearchList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
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
    const results = data && data.searchCustomer ? data.searchCustomer : null

    return (
      <ScrollView>
        <FlatList
          data={results}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </ScrollView>
    )
  }
}
CustomerSearchList.propTypes = {
  data: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
}
CustomerSearchList.defaultProps = {
  data: null,
}

const SearchList = graphql(SearchCustomer, {
  skip: ({ searchVal }) => !searchVal,
  options: (props) => {
    // console.log('prop in graphql:', props)
    return ({
      variables: { field: 'name.last', value: props.searchVal },
    })
  },
})

export default compose(
  withSearch,
  withNavigation,
  SearchList,
)(CustomerSearchList)
