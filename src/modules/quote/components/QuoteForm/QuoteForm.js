import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import { Mutation, Query } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { CREATE_INVOICE, PERSIST_QUOTE, REMOVE_QUOTE } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../../customer/queries'
import { QUOTE_JOBSHEET } from '../../queries.local'
import { TOGGLE_ALL } from '../../mutations/local'

import clr from '../../../../config/colors'
import styles from './styles'
import { Error } from '../../../common/components/Error'
import { GroupList } from '../GroupList'
import { OtherList } from '../OtherList'
import { QuoteFormFooter } from '../QuoteFormFooter'
import { WindowList } from '../WindowList'
import { fmtMoney } from '../../../../util/fmt'
import { pdfPreviewArgs, prepareQuote } from '../../utils'

const extractAddress = (quote) => {
  const { addressID: addr } = quote.jobsheetID
  return {
    city: addr.city,
    street1: addr.street1,
    coordinates: addr.location.coordinates,
  }
}

const SubTotal = ({ subTotal }) => {
  if (!subTotal) return null
  return (
    <View>
      <Text style={styles.subTotal}>{fmtMoney(subTotal, 2, true)}</Text>
    </View>
  )
}
SubTotal.propTypes = {
  subTotal: PropTypes.number.isRequired,
}

const QuoteForm = ({ isNew, navigation }) => {
  const [toggleAll, setToggleAll] = useState(true)

  useEffect(() => (
    () => setToggleAll(true)
  ), [])

  const _handleRemove = (func, quoteID) => {
    Alert.alert(
      'Confirm Delete Quote',
      'Are you sure you want to delete this quote?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            func({ variables: { id: quoteID } })
          },
        },
      ]
    )
  }

  const toggleIcon = toggleAll ? 'ios-checkbox' : 'ios-checkbox-outline'

  return (
    <Query query={QUOTE_JOBSHEET}>
      {({ data: { jobSheet, quote } }) => {
        const { groups, other, windows } = jobSheet
        const customerID = quote.customerID._id

        return (
          <View style={styles.container}>
            <View style={styles.titleHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('CustomerInfo', { customerID })}>
                <Text style={styles.titleText}>
                  {quote.customerID.name.first}
                  &nbsp;
                  {quote.customerID.name.last}
                  &nbsp;&mdash;&nbsp;
                  {quote.jobsheetID.addressID.street1}
                  ,&nbsp;
                  {quote.jobsheetID.addressID.city}
                  &nbsp;&mdash;&nbsp;
                  {`${quote.number}/${quote.version}`}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.navBar}>
                <Mutation
                  mutation={TOGGLE_ALL}
                  onCompleted={() => setToggleAll(!toggleAll)}
                  variables={{ toggleAll }}
                >
                  {toggleQuoteAll => (
                    <Button
                      onPress={() => toggleQuoteAll(toggleAll)}
                      icon={{
                        containerStyle: styles.navButtonIconCont,
                        iconStyle: styles.navButtonIcon,
                        name: toggleIcon,
                        size: 35,
                        type: 'ionicon',
                      }}
                      title="Toggle All"
                      type="clear"
                      buttonStyle={styles.navButton}
                      titleStyle={styles.navButtonTitle}
                    />
                  )}
                </Mutation>
                <Button
                  disabled={isNew || quote.version <= 0}
                  icon={{
                    containerStyle: styles.navButtonIconCont,
                    iconStyle: styles.navButtonIcon,
                    size: 35,
                    type: 'ionicon',
                    name: 'ios-eye',
                  }}
                  onPress={() => navigation.navigate(
                    'QuotePreview',
                    { previewArgs: pdfPreviewArgs(quote), customerID: quote.customerID._id }
                  )}
                  title="Preview"
                  type="clear"
                  buttonStyle={styles.navButton}
                  titleStyle={styles.navButtonTitle}
                />
                <Button
                  icon={{
                    containerStyle: styles.navButtonIconCont,
                    iconStyle: styles.navButtonIcon,
                    size: 35,
                    type: 'ionicon',
                    name: 'ios-navigate',
                  }}
                  onPress={() => navigation.navigate(
                    'NearbyJobs',
                    { address: extractAddress(quote) }
                  )}
                  title="Nearby Jobs"
                  type="clear"
                  buttonStyle={styles.navButton}
                  titleStyle={styles.navButtonTitle}
                />
                <Mutation
                  mutation={REMOVE_QUOTE}
                  onCompleted={() => navigation.goBack()}
                  refetchQueries={[
                    { query: CUSTOMER_DATA, variables: { customerID: quote.customerID._id } },
                  ]}
                >
                  {(quoteRemove, { error, loading }) => (
                    <View style={{ flexDirection: 'column' }}>
                      <Button
                        buttonStyle={styles.navButton}
                        disabled={loading}
                        icon={{
                          containerStyle: styles.navButtonIconCont,
                          iconStyle: styles.navButtonIcon,
                          name: 'ios-trash',
                          size: 35,
                          type: 'ionicon',
                        }}
                        onPress={() => _handleRemove(quoteRemove, quote.quoteID)}
                        title={loading ? 'Stand by...' : 'Delete'}
                        type="clear"
                        titleStyle={styles.navButtonTitle}
                      />
                      {error && <Error error={error} />}
                    </View>
                  )}
                </Mutation>
              </View>

              {windows.length > 0 && (
                <React.Fragment>
                  <View style={styles.secondaryHeader}>
                    <Text style={styles.secondaryText}>Windows</Text>
                  </View>
                  <WindowList jobSheetWindows={windows} quoteWindows={quote.items.window || null} />
                  {quote.itemCosts.window > 0 && <SubTotal subTotal={quote.itemCosts.window} />}
                </React.Fragment>
              )}

              {groups.length > 0 && (
                <React.Fragment>
                  <View style={styles.secondaryHeader}>
                    <Text style={styles.secondaryText}>Window Groups</Text>
                  </View>
                  <GroupList jobSheetGroups={groups} quoteGroups={quote.items.group || null} />
                  {quote.itemCosts.group > 0 && <SubTotal subTotal={quote.itemCosts.group} />}
                </React.Fragment>
              )}

              {other.length > 0 && (
                <React.Fragment>
                  <View style={styles.secondaryHeader}>
                    <Text style={styles.secondaryText}>Other Items</Text>
                  </View>
                  <OtherList jobSheetOther={other} quoteOther={quote.items.other || null} />
                  {quote.itemCosts.other > 0 && <SubTotal subTotal={quote.itemCosts.other} />}
                </React.Fragment>
              )}

              <View style={styles.secondaryHeader}>
                <Text style={styles.secondaryText}>Summary</Text>
              </View>
              <QuoteFormFooter discount={quote.discount} quote={quote} />
              <View style={styles.buttonRow}>
                <Mutation
                  mutation={PERSIST_QUOTE}
                  onCompleted={() => navigation.navigate('CustomerInfo', { customerID: quote.customerID._id })}
                  refetchQueries={[
                    { query: CUSTOMER_DATA, variables: { customerID: quote.customerID._id } },
                  ]}
                >
                  {(quotePersist, { error, loading }) => (
                    <View style={{ flexDirection: 'column' }}>
                      <Button
                        disabled={loading}
                        onPress={() => quotePersist({
                          variables: { input: prepareQuote(quote) },
                        })}
                        title={loading ? 'Stand by...' : 'Save Quote'}
                        raised
                        color={clr.primary}
                        buttonStyle={styles.submitButton}
                        containerStyle={styles.submitButtonCont}
                      />
                      {error && <Error error={error} />}
                    </View>
                  )}
                </Mutation>
                <Mutation
                  mutation={CREATE_INVOICE}
                  onCompleted={() => navigation.navigate('CustomerInfo', { customerID: quote.customerID._id })}
                  refetchQueries={[
                    { query: CUSTOMER_DATA, variables: { customerID: quote.customerID._id } },
                  ]}
                >
                  {(createInvoice, { error, loading }) => (
                    <View style={{ flexDirection: 'column' }}>
                      <Button
                        disabled={quote.version <= 0 || loading}
                        onPress={() => createInvoice({
                          variables: { id: quote.quoteID },
                        })}
                        title={loading ? 'Stand by...' : 'Create Invoice'}
                        raised
                        color={clr.primary}
                        buttonStyle={styles.submitButton}
                        containerStyle={styles.submitButtonCont}
                      />
                      {error && <Error error={error} />}
                    </View>
                  )}
                </Mutation>
              </View>
            </ScrollView>
          </View>
        )
      }}
    </Query>
  )
}
QuoteForm.propTypes = {
  isNew: PropTypes.bool.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuoteForm)
