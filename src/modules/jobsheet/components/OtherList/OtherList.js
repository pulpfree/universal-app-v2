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

import { ListHeader } from '../ListHeader'
import { Loader } from '../../../common/components/Loader'
import { SET_OTHER } from '../../mutations/local'
import { fmtMoney } from '../../../../util/fmt'
import { styles } from './index'

const ListItem = ({ item }) => {
  const rooms = item.rooms && item.rooms.length ? item.rooms.join(', ') : ''
  // const specs = JSON.parse(item.specs)
  const { costs, description, specs } = item
  const { options } = specs

  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{item.qty}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{rooms}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1.5, marginRight: 15 }]}>
        <Text>{description}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1 }]}>
        <Text>{options}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text style={styles.itemCost}>{fmtMoney(costs.extendUnit, 2, true)}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text style={styles.itemCost}>{fmtMoney(costs.extendTotal, 2, true)}</Text>
      </View>
    </View>
  )
}
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

class OtherList extends React.Component {
  state = {
    loading: false,
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (otherID) => {
    const { jobSheet, navigation, setOtherFromRemote } = this.props
    const setRes = setOtherFromRemote(otherID)
    this.setState(() => ({ loading: true }))
    setRes.then(() => {
      this.setState(() => ({ loading: false }))
      navigation.navigate('OtherForm', { otherID, jobSheet })
    })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, jobSheet, navigation } = this.props
    const { loading } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('OtherForm', { jobSheet, isNew: true })}>
          <ListHeader navigation={navigation} title="Other" />
        </TouchableOpacity>
        {loading
          ? (<Loader />)
          : (
            <FlatList
              data={data}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          )
        }
      </View>
    )
  }
}
OtherList.propTypes = {
  data: PropTypes.instanceOf(Object),
  jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setOtherFromRemote: PropTypes.func.isRequired,
}
OtherList.defaultProps = {
  data: [],
}

export default graphql(SET_OTHER, {
  props: ({ mutate }) => ({
    setOtherFromRemote: otherID => mutate({ variables: { otherID } }),
  }),
})(withNavigation(OtherList))
