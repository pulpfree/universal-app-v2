import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  headerCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: clr.mdGray,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
  },
  headerIcon: {
    color: clr.black,
  },
  itemRow: {
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 1,
    borderBottomColor: clr.mdGray,
  },
  itemCell: {
    flex: 1,
  },
  itemCost: {
    textAlign: 'right',
  },
})
