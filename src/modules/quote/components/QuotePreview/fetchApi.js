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

const fetchApi = (args) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: '',
  })

  useEffect(() => {
    let didCancel = false
    let fp

    const fetchFile = async () => {
      dispatch({ type: 'FETCH_INIT' })

      let queryRet
      try {
        queryRet = await client.query({
          query: PDF_SIGNED_URL,
          variables: { input: args },
          fetchPolicy: 'network-only',
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
        return
      }
      let blobRet
      try {
        blobRet = await RNFetchBlob
          .config({ fileCache: true })
          .fetch('GET', queryRet.data.pdfSignedURL.data.url)

        if (!didCancel) {
          fp = blobRet.path()
          dispatch({ type: 'FETCH_SUCCESS', payload: fp })
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
      RNFetchBlob.fs.unlink(fp).then(() => {
        console.log('fp unlinked') // eslint-disable-line no-console
      })
    }
  }, [args])

  return { ...state }
}

export default fetchApi
