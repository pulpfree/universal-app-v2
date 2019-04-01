import { Types } from 'mongoose'

export const prepareQuote = (quote) => {
  const newQuote = { ...quote }

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
