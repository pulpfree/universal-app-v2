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

import { SEARCH_CUSTOMER } from '../../queries'

import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import { withSearch } from '../SearchContext'

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

    if (data) {
      const { error, loading } = data
      if (error) return <Error error={error} />
      if (loading) return <Loader />
    }

    const results = data && data.searchCustomer ? data.searchCustomer : null

    if (data && !data.searchCustomer.length) {
      return (
        <View style={styles.noResultsCont}>
          <Text style={styles.noResultsText}>
            There are no results for your request. Consider refining your search criteria.
          </Text>
        </View>
      )
    }

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

const SearchList = graphql(SEARCH_CUSTOMER, {
  skip: ({ searchVal }) => !searchVal,
  options: (props) => {
    const variables = {
      field: '',
      search: '',
    }
    if (props.lastName) {
      variables.field = 'name.last'
      variables.value = props.searchVal
    }
    if (props.streetName) variables.search = props.searchVal
    if (props.isActive !== 'undefined') variables.active = props.isActive
    return {
      variables,
      fetchPolicy: 'network-only',
    }
  },
})

export default compose(
  withSearch,
  withNavigation,
  SearchList,
)(CustomerSearchList)
