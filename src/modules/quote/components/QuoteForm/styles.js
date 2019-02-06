import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: clr.ltGray,
  },
  navButton: {
    margin: 0,
    paddingBottom: 4,
    paddingTop: 4,
  },
  navButtonTitle: {
    fontSize: 16,
    color: clr.black,
  },
  navButtonIcon: {
    color: clr.primary,
    marginBottom: -10,
    marginTop: -10,
  },
  navButtonIconCont: {
    margin: 0,
    marginLeft: 6,
    marginRight: 5,
  },
  secondaryHeader: {
    backgroundColor: clr.mdGray,
    padding: 6,
  },
  secondaryText: {
    color: clr.black,
    fontSize: 16,
  },
  scrollContainer: {
    // paddingBottom: 150,
    marginBottom: 60,
  },
  submitButton: {
    backgroundColor: clr.primary,
  },
  submitButtonCont: {
    marginLeft: 20,
    marginRight: 20,
  },
  subTotal: {
    backgroundColor: clr.ltGray,
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    paddingRight: 18,
    textAlign: 'right',
  },
  titleHeader: {
    backgroundColor: clr.secondary,
    padding: 10,
  },
  titleText: {
    color: clr.white,
    fontSize: 18,
  },
})
