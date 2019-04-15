import {
  useEffect,
  useReducer,
} from 'react'
import RNFetchBlob from 'rn-fetch-blob'

import { PDF_SIGNED_URL } from '../../queries/remote'

import client from '../../../../apollo'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
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

const fetchApi = (args) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: { filePath: '', signedURL: '' },
  })

  useEffect(() => {
    let didCancel = false
    let filePath

    const fetchFile = async () => {
      dispatch({ type: 'FETCH_INIT' })

      let queryRet
      let signedURL
      try {
        queryRet = await client.query({
          query: PDF_SIGNED_URL,
          variables: { input: args },
          fetchPolicy: 'network-only',
        })
        signedURL = queryRet.data.pdfSignedURL.data.url
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
      let blobRet
      try {
        blobRet = await RNFetchBlob
          .config({ fileCache: true })
          .fetch('GET', signedURL)

        if (!didCancel) {
          filePath = blobRet.path()
          dispatch({ type: 'FETCH_SUCCESS', payload: { filePath, signedURL } })
        }
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: e })
        }
      }
    }

    fetchFile()

    return () => {
      didCancel = true
      RNFetchBlob.fs.unlink(filePath).then(() => {
        console.log('filePath unlinked in fetchApi') // eslint-disable-line no-console
      })
    }
  }, [args])

  return { ...state }
}

export default fetchApi
