import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { ListHeader } from '../ListHeader'
import styles from './styles'

function FeatureList({ jobSheet, navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('SelectFeatures', { jobSheet })}>
        <ListHeader navigation={navigation} title="Features" />
      </TouchableOpacity>
      <View style={styles.featuresCont}>
        <Text style={styles.featureText}>{jobSheet.features}</Text>
      </View>
    </View>
  )
}
FeatureList.propTypes = {
  jobSheet: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(FeatureList)
