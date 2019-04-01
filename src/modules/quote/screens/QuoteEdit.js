import React from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'

import { QuoteForm } from '../components/QuoteForm'

function QuoteEdit({ navigation }) {
  const isNew = navigation.getParam('isNew', false)
  return (
    <QuoteForm isNew={isNew} />
  )
}
QuoteEdit.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuoteEdit)
