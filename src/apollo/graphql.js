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

/* export default {
  Mutation: {
    updatePageName
  }
} */
const graphql = {
  defaults: merge(
    windowDefaults,
    jobSheetDefaults,
  ),
  resolvers: merge(
    windowResolvers,
    jobSheetResolvers,
  ),
  typeDefs: [
    windowTypeDefs,
    jobSheetTypeDefs,
  ],
}

export default graphql
