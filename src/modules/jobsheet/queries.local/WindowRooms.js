import gql from 'graphql-tag'

export default gql`
{
  windowRooms @client {
    rooms
  }
}`
