import gql from 'graphql-tag'

export default gql`
mutation AddRooms($rooms: [String], $windowID: ID) {
  addWindowRooms(rooms: $rooms, windowID: $windowID) @client
}
`
