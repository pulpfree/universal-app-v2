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

import styles from './styles'
import { ListHeader } from '../ListHeader'
import { Loader } from '../../../common/components/Loader'
import { SET_WINDOW } from '../../mutations/local'
import { fmtMoney } from '../../../../util/fmt'

const ListItem = ({ item }) => {
  const rooms = item.rooms && item.rooms.length ? item.rooms.join(', ') : ''
  const { name } = item.productID
  const { costs, dims } = item
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

class WindowList extends React.Component {
  state = {
    loading: false,
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (windowID) => {
    const { jobSheet, navigation, setWindowFromRemote } = this.props
    const setRes = setWindowFromRemote(windowID)
    this.setState(() => ({ loading: true }))
    // blocking navigate action so that the WindowForm component doesn't refresh unnecessarily
    setRes.then(() => {
      this.setState(() => ({ loading: false }))
      navigation.navigate('WindowForm', { jobSheet, windowID })
    })
  }

  _keyExtractor = item => item._id

  render() {
    const { data, jobSheet, navigation } = this.props
    const { loading } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('WindowForm', { jobSheet, isNew: true })}>
          <ListHeader navigation={navigation} title="Windows" />
        </TouchableOpacity>
        {loading
          ? (<Loader />)
          : (
            <FlatList
              data={data}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          )}
      </View>
    )
  }
}
WindowList.propTypes = {
  data: PropTypes.instanceOf(Object),
  jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setWindowFromRemote: PropTypes.func.isRequired,
}
WindowList.defaultProps = {
  data: [],
}

export default graphql(SET_WINDOW, {
  props: ({ mutate }) => ({
    setWindowFromRemote: windowID => mutate({ variables: { windowID } }),
  }),
})(withNavigation(WindowList))
