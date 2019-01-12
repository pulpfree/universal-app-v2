import React from 'react'
// import PropTypes from 'prop-types'

import {
  Button,
  Text,
  View,
} from 'react-native'

// export default function JobsheetNew({ navigation }) {
class JobSheetNew extends React.Component {
  /* static navigationOptions = {
    headerTitle: 'New Jobsheet',
  } */

  componentDidMount() {
    console.log('componentDidMount in JobSheetNew')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in JobSheetNew')
  }

  render() {
    const { navigation } = this.props

    return (
      <View>
        <Text>Create New Jobsheet</Text>
      </View>
    )
  }
}

export default JobSheetNew
