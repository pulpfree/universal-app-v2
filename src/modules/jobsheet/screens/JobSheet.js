import React, { useEffect } from 'react'
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
import { GroupList } from '../components/GroupList'
import { Header, Menu } from '../components/JobSheetHeader'
import { Loader } from '../../common/components/Loader'
import { OtherList } from '../components/OtherList'
import { WindowList } from '../components/WindowList'


const JobSheet = ({ navigation, setProducts }) => {
  // const defJobSheetID = __DEV__ ? '5b1846d52aac0450227ebfe9' : null // eslint-disable-line
  const jobSheetID = navigation.getParam('jobSheetID')
  console.log('jobSheetID in JobSheet:', jobSheetID)

  useEffect(() => {
    setProducts()
  }, [])

  return (
    <Query
      query={JOBSHEET_DATA}
      variables={{ jobSheetID }}
      // fetchPolicy="cache-and-network"
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
          <View>
            <Header jobSheet={jobsheet} />
            <ScrollView>
              <Menu jobSheet={jobsheet} navigation={navigation} />
              <WindowList data={windows} jobSheet={jobsheet} />
              <GroupList data={groups} jobSheet={jobsheet} />
              <OtherList data={other} jobSheet={jobsheet} />
            </ScrollView>
          </View>
        )
      }}
    </Query>
  )
}
JobSheet.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  setProducts: PropTypes.func.isRequired,
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
