import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  headerCont: {
    alignItems: 'center',
    backgroundColor: clr.secondaryHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 4,
  },
  headerText: {
    fontSize: 16,
    color: clr.dkGray,
  },
  headerIcon: {
    color: clr.black,
  },
})
