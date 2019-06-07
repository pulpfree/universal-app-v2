import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { JobSheetListHeader } from '../JobSheetListHeader'
import styles from './styles'
import clr from '../../../../config/colors'
import { fmtDate } from '../../../../util/fmt'

const Header = ({ customer, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('JobSheetNew', { customer })}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Job Sheets</Text>
      <Icon
        color={clr.ltGray}
        name="add-circle"
        size={24}
      />
    </View>
  </TouchableOpacity>
)
Header.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

const ListItem = ({ item }) => (
  <View style={styles.itemRow}>
    <View style={[styles.itemCell, { flex: 0.25 }]}>
      <Text>{item.number}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{item.addressID.street1}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{item.addressID.city}</Text>
    </View>
    <View style={styles.itemCell}>
      <Text>{fmtDate(item.updatedAt)}</Text>
    </View>
  </View>
)
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}


class JobSheetList extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item._id)}>
      <ListItem item={item} />
    </TouchableOpacity>
  )

  _onPressItem = (jobSheetID) => {
    const { navigation } = this.props
    navigation.navigate('JobSheet', { jobSheetID })
  }

  _keyExtractor = item => item._id

  render() {
    const { customer, data, navigation } = this.props

    return (
      <React.Fragment>
        <Header customer={customer} navigation={navigation} />
        <FlatList
          ListHeaderComponent={JobSheetListHeader}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </React.Fragment>
    )
  }
}
JobSheetList.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(JobSheetList)
