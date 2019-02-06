import React from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import { GroupList } from '../GroupList'
import { WindowList } from '../WindowList'
import { OtherList } from '../OtherList'
import { QuoteFormFooter } from '../QuoteFormFooter'
import styles from './styles'
import clr from '../../../../config/colors'
import { fmtMoney } from '../../../../util/fmt'

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

const QuoteForm = ({ data }) => {
  const { groups, other, windows } = data.jobSheetData
  const {
    customerID,
    discount,
    items,
    itemCosts,
    jobsheetID,
    quotePrice,
    number,
    version,
  } = data.getQuote

  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <Text style={styles.titleText}>
          {`${customerID.name.first} ${customerID.name.last} - ${jobsheetID.addressID.street1}, ${jobsheetID.addressID.city} - ${number}/${version}`}
        </Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.navBar}>
          <Button
            icon={(
              <Icon
                name="ios-checkbox-outline"
                type="ionicon"
                size={35}
                containerStyle={styles.navButtonIconCont}
                iconStyle={styles.navButtonIcon}
              />
          )}
            title="Toggle All"
            type="clear"
            buttonStyle={styles.navButton}
            titleStyle={styles.navButtonTitle}
          />
          <Button
            icon={(
              <Icon
                name="ios-eye"
                type="ionicon"
                size={35}
                containerStyle={styles.navButtonIconCont}
                iconStyle={styles.navButtonIcon}
              />
          )}
            title="Preview"
            type="clear"
            buttonStyle={styles.navButton}
            titleStyle={styles.navButtonTitle}
          />
          <Button
            icon={(
              <Icon
                name="ios-trash"
                type="ionicon"
                size={35}
                containerStyle={styles.navButtonIconCont}
                iconStyle={styles.navButtonIcon}
              />
          )}
            title="Delete"
            type="clear"
            buttonStyle={styles.navButton}
            titleStyle={styles.navButtonTitle}
          />
        </View>

        {windows.length > 0
          && (
            <React.Fragment>
              <View style={styles.secondaryHeader}>
                <Text style={styles.secondaryText}>Windows</Text>
              </View>
              <WindowList jobSheetWindows={windows} quoteWindows={items.window || null} />
              {itemCosts.window > 0 && <SubTotal subTotal={itemCosts.window} />}
            </React.Fragment>
          )
        }

        {groups.length > 0
          && (
            <React.Fragment>
              <View style={styles.secondaryHeader}>
                <Text style={styles.secondaryText}>Window Groups</Text>
              </View>
              <GroupList jobSheetGroups={groups} quoteGroups={items.group || null} />
              {itemCosts.group > 0 && <SubTotal subTotal={itemCosts.group} />}
            </React.Fragment>
          )
        }

        {other.length > 0
          && (
            <React.Fragment>
              <View style={styles.secondaryHeader}>
                <Text style={styles.secondaryText}>Other Items</Text>
              </View>
              <OtherList jobSheetOther={other} quoteOther={items.other || null} />
              {itemCosts.other > 0 && <SubTotal subTotal={itemCosts.other} />}
            </React.Fragment>
          )
        }

        <View style={styles.secondaryHeader}>
          <Text style={styles.secondaryText}>Summary</Text>
        </View>
        <QuoteFormFooter discount={discount} quotePrice={quotePrice} />
        <Button
          title="Save Quote"
          raised
          color={clr.primary}
          buttonStyle={styles.submitButton}
          containerStyle={styles.submitButtonCont}
        />
      </ScrollView>
    </View>
  )
}
QuoteForm.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}

export default QuoteForm
