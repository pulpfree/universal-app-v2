import React from 'react'
import { Button, Text, View } from 'react-native'
import gql from 'graphql-tag'

import { Mutation, Query } from 'react-apollo'

const GET_TODOS = gql`
{
  todos @client {
    id
    completed
    text
  }
}
`

const GET_ORDERS = gql`
{
  listOrders {
    items {
      id
      name
    }
  }
}
`

const ADD_TODO = gql`
mutation addTodo($text: String!) {
  addTodo(text: $text) @client {
    id
  }
}
`

const TestApollo = () => (
  <Query query={GET_TODOS}>
    {({ data }) => (
      <Mutation mutation={ADD_TODO}>
        {addTodo => (
          <>
            <View><Text>{JSON.stringify(data)}</Text></View>
            <Button
              onPress={() =>
                addTodo({
                  variables: { text: "gyandeep" }
                })
              }
              title='Add'
            />
          </>
        )}
      </Mutation>
    )}
  </Query>
)

export default TestApollo
