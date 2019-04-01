import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.35)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    paddingTop: 50,
  },
  body: {
    padding: 20,
  },
  modalBox: {
    backgroundColor: clr.white,
    borderRadius: 6,
    flexDirection: 'column',
    height: 470,
    shadowColor: '#333',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 560,
  },
})
