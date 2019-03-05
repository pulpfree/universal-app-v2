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
import { SET_GROUP } from '../../mutations/local'
import { fmtMoney } from '../../../../util/fmt'
import { styles } from './index'

const ListItem = ({ item }) => {
  const { costs, dims, specs } = item
  const { name } = specs.groupType
  const rooms = item.rooms && item.rooms.length ? item.rooms.join(', ') : ''
  let dimStr = `${dims.width.inch}`
  if (dims.width.fraction) dimStr += ` ${dims.width.fraction}`
  dimStr += ` x ${dims.height.inch}`
  if (dims.height.fraction) dimStr += ` ${dims.height.fraction}`

  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemCell, { flex: 0.25 }]}>
        <Text>{item.qty}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.5 }]}>
        <Text>{rooms}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 1.75 }]}>
        <Text>{name}</Text>
      </View>
      <View style={[styles.itemCell, { flex: 0.75 }]}>
        <Text>{dimStr}</Text>
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

class GroupList extends React.Component {
  state = {
    loading: false,
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (groupID) => {
    const { jobSheet, navigation, setGroupFromRemote } = this.props
    const setRes = setGroupFromRemote(groupID)
    this.setState(() => ({ loading: true }))
    setRes.then(() => {
      this.setState(() => ({ loading: false }))
      navigation.navigate('GroupForm', { groupID, jobSheet })
    })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, jobSheet, navigation } = this.props
    const { loading } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('GroupForm', { jobSheet, isNew: true })}>
          <ListHeader navigation={navigation} title="Groups" />
        </TouchableOpacity>
        {loading && <Loader />}
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}
GroupList.propTypes = {
  data: PropTypes.instanceOf(Object),
  jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setGroupFromRemote: PropTypes.func.isRequired,
}
GroupList.defaultProps = {
  data: [],
}

export default graphql(SET_GROUP, {
  props: ({ mutate }) => ({
    setGroupFromRemote: groupID => mutate({ variables: { groupID } }),
  }),
})(withNavigation(GroupList))
