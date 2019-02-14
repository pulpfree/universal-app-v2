import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  headerCont: {
    backgroundColor: clr.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    color: clr.ltGray,
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
})
