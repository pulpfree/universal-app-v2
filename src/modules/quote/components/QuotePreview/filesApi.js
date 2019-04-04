import {
  useEffect,
  useReducer,
} from 'react'

import RNFS from 'react-native-fs'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.payload,
      }
    default:
      throw new Error()
  }
}

const filesApi = (fileArgs, filePath) => {
  // console.log('fileArgs in fileApi:', fileArgs)
  // console.log('filePath in fileApi:', filePath)
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: '',
  })
  // console.log('state in filesApi:', state)
  return { ...state }
}

export default filesApi
