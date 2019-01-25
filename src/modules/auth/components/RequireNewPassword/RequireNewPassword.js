import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import { Auth, Logger } from 'aws-amplify'
import AuthPiece from 'aws-amplify-react-native/dist/Auth/AuthPiece'

import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-paper'

import theme from '../../../../config/paperTheme'
import { Container } from '../Container'
import { styles } from './index'

const logger = new Logger('RequireNewPassword')

function convertToPlaceholder(str) {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase()).join(' ')
}

export default class RequireNewPassword extends AuthPiece {
  constructor(props) {
    super(props)

    this._validAuthStates = ['requireNewPassword']
    this.state = {
      password: null,
      error: null,
      requiredAttributes: {},
    }

    this.change = this.change.bind(this)
  }

  change() {
    const user = this.props.authData
    const { password, requiredAttributes } = this.state
    logger.debug(`Require new password for ${user.username}`)
    Auth.completeNewPassword(user, password, requiredAttributes).then((user) => {
      if (user.challengeName === 'SMS_MFA') {
        this.changeState('confirmSignIn', user)
      } else {
        this.checkContact(user)
      }
    }).catch(err => this.error(err))
  }

  generateForm(attribute) {
    return (
      <View style={styles.inputCell}>
        <TextInput
          label={convertToPlaceholder(attribute)}
          key={convertToPlaceholder(attribute)}
          placeholder={convertToPlaceholder(attribute)}
          theme={theme}
          onChangeText={(text) => {
            const attributes = this.state.requiredAttributes
            if (text !== '') attributes[attribute] = text; else delete attributes[attribute]
            this.setState({ requiredAttributes: attributes })
          }}
        />
      </View>
    )
  }

  showComponent = () => {
    const user = this.props.authData
    const { requiredAttributes } = user.challengeParam

    return (
      <Container>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Change Password</Text>
        </View>
        <View style={styles.inputCell}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            label="Password"
            name="password"
            onChangeText={text => this.setState({ password: text })}
            placeholder="Enter your password"
            // ref={(input) => { this.password = input }}
            // returnKeyType="next"
            secureTextEntry
            theme={theme}
            value={this.state.password}
          />
        </View>
        {requiredAttributes.map((attribute) => {
          logger.debug('attributes', attribute)
          return this.generateForm(attribute)
        })}
        <Button
          buttonStyle={styles.submitButton}
          disabled={!(this.state.password && Object.keys(this.state.requiredAttributes).length === Object.keys(requiredAttributes).length)}
          onPress={this.change}
          title="CHANGE PASSWORD"
        />
        <View style={styles.footer}>
          <TouchableHighlight onPress={() => this.changeState('signIn')}>
            <Text style={styles.footerText}>Back to Sign In</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.errorRow}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
      </Container>
    )
  }
}
