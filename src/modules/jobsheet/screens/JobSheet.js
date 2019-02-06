import React from 'react'
import PropTypes from 'prop-types'

import {
  ScrollView,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { Query } from 'react-apollo'

import GetJobSheetData from '../queries/GetJobSheetData'
import { Error } from '../../common/components/Error'
import { GroupList } from '../components/GroupList'
import { Loader } from '../../common/components/Loader'
import { OtherList } from '../components/OtherList'
import { WindowList } from '../components/WindowList'
import { Header, Menu } from '../components/JobSheetHeader'

const JobSheet = ({ navigation }) => {
  const defJobSheetID = __DEV__ ? '5b1846d52aac0450227ebfe9' : null // eslint-disable-line
  const jobSheetID = navigation.getParam('jobSheetID', defJobSheetID)

  return (
    <Query
      query={GetJobSheetData}
      variables={{ jobSheetID }}
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
              <Menu navigation={navigation} />
              <WindowList data={windows} jobSheet={jobsheet} />
              <GroupList data={groups} />
              <OtherList data={other} />
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
export default withNavigation(JobSheet)
