import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  View,
} from 'react-native'

import { QuoteSearchHeader } from '../components/QuoteSearchHeader'
import { QuoteSearchList } from '../components/QuoteSearchList'

import { quotes } from '../../../../storybook/mockData/quotes'

class Quotes extends React.Component {
  componentDidMount() {
    console.log('componentDidMount in QuoteSearch')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in QuoteSearch')
  }

  render() {
    const { navigation } = this.props
    return (
      <React.Fragment>
        <QuoteSearchHeader />
        <QuoteSearchList data={quotes} />
      </React.Fragment>
    )
  }
}
Quotes.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default Quotes
