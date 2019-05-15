import { merge } from 'lodash'

import {
  defaults as customerDefaults,
  resolvers as customerResolvers,
} from '../modules/customer/resolvers/customer'

import {
  defaults as windowDefaults,
  resolvers as windowResolvers,
  typeDefs as windowTypeDefs,
} from '../modules/jobsheet/resolvers/window'

import {
  defaults as jobSheetDefaults,
  resolvers as jobSheetResolvers,
  typeDefs as jobSheetTypeDefs,
} from '../modules/jobsheet/resolvers/jobSheet'

import {
  defaults as groupDefaults,
  resolvers as groupResolvers,
  typeDefs as groupTypeDefs,
} from '../modules/jobsheet/resolvers/group'

import {
  defaults as otherDefaults,
  resolvers as otherResolvers,
} from '../modules/jobsheet/resolvers/other'

import {
  defaults as quoteDefaults,
  resolvers as quoteResolvers,
} from '../modules/quote/resolvers/quote'

const graphql = {
  defaults: merge(
    customerDefaults,
    groupDefaults,
    jobSheetDefaults,
    otherDefaults,
    quoteDefaults,
    windowDefaults,
  ),
  resolvers: merge(
    customerResolvers,
    groupResolvers,
    jobSheetResolvers,
    otherResolvers,
    quoteResolvers,
    windowResolvers,
  ),
  typeDefs: [
    groupTypeDefs,
    jobSheetTypeDefs,
    windowTypeDefs,
  ],
}

export default graphql
