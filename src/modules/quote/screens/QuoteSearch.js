import React from 'react'

import { QuoteSearchHeader } from '../components/QuoteSearchHeader'
import { QuoteSearchList } from '../components/QuoteSearchList'
import { SearchProvider } from '../components/SearchContext'

const Quotes = () => (
  <SearchProvider>
    <QuoteSearchHeader />
    <QuoteSearchList />
  </SearchProvider>
)

export default Quotes
