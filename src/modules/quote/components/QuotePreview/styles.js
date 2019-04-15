import { Dimensions, StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  menuCont: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  pdfCont: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  button: {
    backgroundColor: clr.primary,
  },
  buttonSecondary: {
    backgroundColor: clr.secondary,
  },
  buttonCont: {
    marginLeft: 10,
    marginRight: 10,
  },
})
