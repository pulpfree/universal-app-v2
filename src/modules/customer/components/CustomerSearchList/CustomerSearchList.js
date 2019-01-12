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

import styles from './styles'

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
    console.log('data:', data)

    return (
      <ScrollView>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </ScrollView>
    )
  }
}
CustomerSearchList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(CustomerSearchList)
