/* eslint-disable import/prefer-default-export */
import ramda from 'ramda'

const removeTypename = ramda.omit(['__typename'])

export const prepareCustomer = (customer) => {
  const doc = ramda.clone(removeTypename(customer))
  const address = removeTypename(doc.address)

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
