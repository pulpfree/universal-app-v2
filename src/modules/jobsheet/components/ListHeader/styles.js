import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  headerCont: {
    alignItems: 'center',
    backgroundColor: clr.mdGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 4,
  },
  headerText: {
    fontSize: 18,
  },
  headerIcon: {
    color: clr.black,
  },
})
