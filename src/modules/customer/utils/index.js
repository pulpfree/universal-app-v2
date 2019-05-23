/* eslint-disable import/prefer-default-export */
import ramda from 'ramda'
import Geocoder from 'react-native-geocoding'

import { GoogleAPIKey } from '../../../config/constants'

const removeTypename = ramda.omit(['__typename'])

export const prepareCustomer = async (customer) => {
  const doc = ramda.clone(removeTypename(customer))
  const address = removeTypename(doc.address)
  address.location = removeTypename(doc.address.location)

  if (!address.location.coordinates.length) {
    Geocoder.init(GoogleAPIKey)

    const addressStr = address.postalCode ? `${address.street1} ${address.postalCode}` : `${address.street1} ${address.city}`

    let res
    try {
      res = await Geocoder.from(addressStr)
    } catch (e) {
      console.error('error:', e) // eslint-disable-line no-console
    }
    const mapParams = res.results[0]
    address.location = {
      coordinates: [mapParams.geometry.location.lng, mapParams.geometry.location.lat],
      type: 'Point',
    }
  }
  // console.log('address in prepareCustomer:', address)

  let phones = []
  if (Array.isArray(doc.phones)) {
    phones = doc.phones.map(ph => removeTypename(ph))
  }

  const variables = {
    customerInput: {
      email: doc.email,
      name: removeTypename(doc.name),
      phones,
    },
    addressInput: {
      associate: 'customer',
      city: address.city,
      postalCode: address.postalCode,
      provinceCode: address.provinceCode,
      street1: address.street1,
      type: address.type,
      location: {
        ...address.location,
      },
    },
  }

  // Check if we're editing existing
  if (doc.customerID) {
    variables.customerInput._id = doc.customerID
    variables.addressInput._id = address.addressID
  }
  if (variables.customerInput.email === '' || variables.customerInput.email === null) {
    delete variables.customerInput.email
  }
  return variables
}
