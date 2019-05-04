import React from 'react'
import PropTypes from 'prop-types'

import {
  ScrollView,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { compose, graphql, Query } from 'react-apollo'

import { JOBSHEET_DATA } from '../queries'
import { SET_PRODUCTS } from '../mutations/local'

import { Error } from '../../common/components/Error'
import { FeatureList } from '../components/FeatureList'
import { GroupList } from '../components/GroupList'
import { Header, Menu } from '../components/JobSheetHeader'
import { Loader } from '../../common/components/Loader'
import { OtherList } from '../components/OtherList'
import { WindowList } from '../components/WindowList'


const JobSheet = ({ navigation }) => {
  const jobSheetID = navigation.getParam('jobSheetID')

  return (
    <Query
      query={JOBSHEET_DATA}
      variables={{ jobSheetID }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        const {
          jobsheet,
          other,
          groups,
          windows,
        } = data.jobSheetData

        return (
          <View style={{ paddingBottom: 50 }}>
            <Header jobSheet={jobsheet} />
            <ScrollView>
              <Menu jobSheet={jobsheet} navigation={navigation} />
              <WindowList data={windows} jobSheet={jobsheet} />
              <GroupList data={groups} jobSheet={jobsheet} />
              <OtherList data={other} jobSheet={jobsheet} />
              <FeatureList jobSheet={jobsheet} />
            </ScrollView>
          </View>
        )
      }}
    </Query>
  )
}
JobSheet.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

const SetProducts = graphql(SET_PRODUCTS, {
  props: ({ mutate }) => ({
    setProducts: () => mutate(),
  }),
})

export default compose(
  SetProducts,
  withNavigation,
)(JobSheet)
