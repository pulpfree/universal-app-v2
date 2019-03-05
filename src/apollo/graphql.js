// import ramda from 'ramda'
import { merge } from 'lodash'

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

const graphql = {
  defaults: merge(
    groupDefaults,
    jobSheetDefaults,
    otherDefaults,
    windowDefaults,
  ),
  resolvers: merge(
    groupResolvers,
    jobSheetResolvers,
    otherResolvers,
    windowResolvers,
  ),
  typeDefs: [
    groupTypeDefs,
    jobSheetTypeDefs,
    windowTypeDefs,
  ],
}

export default graphql
