// import gql from 'graphql-tag'

export const defaults = {
  jobSheet: {
    __typename: 'JobSheet',
    _id: 'new2',
  },
}

export const typeDefs = `
  type JobSheet {
    _id: ID
  }
`

export const resolvers = {
  Mutation: {
    createJobSheet: (_, { id }, { cache }) => {
      const data = {
        jobSheet: {
          __typename: 'JobSheet',
          _id: id,
        },
      }
      cache.writeData({ data })
      return null
    },
  },
}
