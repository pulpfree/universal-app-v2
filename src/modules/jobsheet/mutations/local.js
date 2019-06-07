import gql from 'graphql-tag'

/**
 * JobSheet mutations
 */

const SET_PRODUCTS = gql`
mutation setProductsFromRemote {
  setProductsFromRemote @client
}`

/**
 * Window mutations
 */

const ADD_ROOMS = gql`
mutation AddRooms($rooms: [String]) {
  addWindowRooms(rooms: $rooms) @client
}`

const SET_FIELD = gql`
mutation setField($field: String!, $value: String!) {
  setField(field: $field, value: $value) @client
}`

const SET_WINDOW = gql`
mutation setWindowFromRemote($windowID: ID!) {
  setWindowFromRemote(windowID: $windowID) @client
}`

const CLEAR_WINDOW = gql`
mutation clearWindow($windowID: ID) {
  clearWindow(windowID: $windowID) @client
}`

const SET_SIZES = gql`
mutation setSizes($window: Window) {
  setSizes(window: $window) @client
}`

const DUPLICATE_WINDOW = gql`
mutation setDuplicate {
  setDuplicate @client
}`

const SET_JOBSHEET_ID = gql`
mutation setJobSheetID($jobSheetID: ID) {
  setJobSheetID(jobSheetID: $jobSheetID) @client
}`

/**
 * Group mutations
 */

const SET_GROUP = gql`
mutation setGroupFromRemote($groupID: ID!) {
  setGroupFromRemote(groupID: $groupID) @client
}`

const CLEAR_GROUP = gql`
mutation clearGroup {
  clearGroup @client
}`

const CLEAR_GROUP_WINDOW = gql`
mutation clearGroupWindow {
  clearGroupWindow @client
}`

const SET_GROUP_FIELD = gql`
mutation setGroupField($field: String!, $value: String!) {
  setGroupField(field: $field, value: $value) @client
}`

const SET_GROUP_WINDOW_FIELD = gql`
mutation setGroupWindowField($field: String!, $value: String!) {
  setGroupWindowField(field: $field, value: $value) @client
}`

const SET_GROUP_JOBSHEET_ID = gql`
mutation setGroupJobSheetID($jobSheetID: ID) {
  setGroupJobSheetID(jobSheetID: $jobSheetID) @client
}`

const PERSIST_GROUP_WINDOW = gql`
mutation persistGroupWindow {
  persistGroupWindow @client
}`

const REMOVE_GROUP_WINDOW = gql`
mutation removeGroupWindow($windowID: ID!) {
  removeGroupWindow(windowID: $windowID) @client
}`

const SET_WINDOW_FROM_GROUP = gql`
mutation setWindowFromGroup($windowID: ID!) {
  setWindowFromGroup(windowID: $windowID) @client
}`

const DUPLICATE_GROUP = gql`
mutation setGroupDuplicate {
  setGroupDuplicate @client
}`

/**
 * Other mutations
 */

const SET_OTHER = gql`
mutation setOtherFromRemote($otherID: ID!) {
  setOtherFromRemote(otherID: $otherID) @client
}`

const SET_OTHER_FIELD = gql`
mutation setOtherField($field: String!, $value: String!) {
  setOtherField(field: $field, value: $value) @client
}`

const CLEAR_OTHER = gql`
mutation clearOther {
  clearOther @client
}`

const SET_OTHER_JOBSHEET_ID = gql`
mutation setOtherJobSheetID($jobSheetID: ID) {
  setOtherJobSheetID(jobSheetID: $jobSheetID) @client
}`

export {
  ADD_ROOMS,
  CLEAR_GROUP,
  CLEAR_GROUP_WINDOW,
  CLEAR_OTHER,
  CLEAR_WINDOW,
  DUPLICATE_GROUP,
  DUPLICATE_WINDOW,
  PERSIST_GROUP_WINDOW,
  REMOVE_GROUP_WINDOW,
  SET_FIELD,
  SET_GROUP,
  SET_GROUP_FIELD,
  SET_GROUP_JOBSHEET_ID,
  SET_GROUP_WINDOW_FIELD,
  SET_JOBSHEET_ID,
  SET_OTHER,
  SET_OTHER_FIELD,
  SET_OTHER_JOBSHEET_ID,
  SET_PRODUCTS,
  SET_SIZES,
  SET_WINDOW,
  SET_WINDOW_FROM_GROUP,
}
