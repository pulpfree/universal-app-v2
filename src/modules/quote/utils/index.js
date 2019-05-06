import ramda from 'ramda'
import { Types } from 'mongoose'
import constants from '../config/constants'

export const prepareQuote = (quote) => {
  const newQuote = ramda.clone(quote)

  newQuote._id = newQuote.quoteID
  newQuote.version += 1
  newQuote.jobsheetID = Types.ObjectId(newQuote.jobsheetID._id)
  newQuote.customerID = Types.ObjectId(newQuote.customerID._id)

  // Remove anything not necessary for updating quote from jobsheet (in QuoteEdit)
  delete newQuote.__typename
  delete newQuote.closed
  delete newQuote.id
  delete newQuote.invoiced
  delete newQuote.number
  delete newQuote.pdfCreated
  delete newQuote.quoteID
  delete newQuote.discount.__typename
  delete newQuote.itemCosts.__typename
  delete newQuote.items.__typename
  delete newQuote.quotePrice.__typename

  return newQuote
}

export const pdfPreviewArgs = quote => (
  {
    number: quote.number,
    type: quote.invoiced ? 'invoice' : 'quote',
    version: quote.version,
  }
)

export const workSheetArgs = quote => (
  {
    number: quote.number,
    type: 'worksheet',
  }
)

export const calculateDiscount = (quote, discount, description) => {
  const taxMultiplier = parseFloat(constants.HST / 100)
  const taxDivisor = parseFloat(1 + taxMultiplier)
  const { quotePrice } = quote

  const total = parseFloat(discount)
  const subtotal = parseFloat(total / taxDivisor)
  const tax = parseFloat(total - subtotal)
  const discountAmount = quote.itemCosts.subtotal - total
  const outstanding = parseFloat(total - quotePrice.payments)
  return {
    _id: quote._id,
    discount: {
      description,
      discount: parseFloat(discountAmount),
      subtotal,
      tax,
      total,
    },
    quotePrice: {
      outstanding,
      payments: parseFloat(quotePrice.payments),
      subtotal,
      tax,
      total,
    },
  }
}
