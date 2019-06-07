import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: clr.white,
  },
  iconCont: {
    padding: 5,
  },
})
