import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  col: {
    flex: 0.75,
  },
  main: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 400,
    maxWidth: 600,
  },
  loadView: {
    margin: 40,
  },
  loadText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})
