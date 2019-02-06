import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  // View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { Query } from 'react-apollo'

import EditQuoteData from '../queries/EditQuote'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'
import { QuoteForm } from '../components/QuoteForm'

const QuoteEdit = ({ navigation }) => {
  const quoteID = navigation.getParam('quoteID')
  const jobSheetID = navigation.getParam('jobSheetID')

  return (
    <Query
      query={EditQuoteData}
      variables={{ quoteID, jobSheetID }}
    >
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        return <QuoteForm data={data} />
      }}
    </Query>
  )
}
QuoteEdit.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuoteEdit)
