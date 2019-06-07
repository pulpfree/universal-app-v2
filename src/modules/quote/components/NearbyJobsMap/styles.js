import { Dimensions, StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: height - 220, // offset for customer details
    // height,
    // flex: 1,
  },
})
