import gql from 'graphql-tag'

const SET_WINDOW = gql`
  mutation setWindowFromRemote($windowID: ID!) {
  setWindowFromRemote(windowID: $windowID) @client
}
`
const ADD_ROOMS = gql`
mutation AddRooms($rooms: [String]) {
  addWindowRooms(rooms: $rooms) @client
}
`

export {
  ADD_ROOMS,
  SET_WINDOW,
}
