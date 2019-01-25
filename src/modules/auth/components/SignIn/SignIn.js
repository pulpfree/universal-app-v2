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
import styles from './styles'

const logger = new Logger('SignIn')


export default class SignIn extends AuthPiece {
  constructor(props) {
    super(props)

    this._validAuthStates = ['signIn', 'signedOut', 'signedUp']
    this.state = {
      username: null,
      password: null,
      error: null,
    }

    this.checkContact = this.checkContact.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  signIn() {
    const { username, password } = this.state
    logger.debug(`Sign In for ${username}`)
    Auth.signIn(username, password).then((user) => {
      logger.debug(user)
      const requireMFA = user.Session !== null
      if (user.challengeName === 'SMS_MFA') {
        this.changeState('confirmSignIn', user)
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        logger.debug('require new password', user.challengeParam)
        this.changeState('requireNewPassword', user)
      } else {
        this.checkContact(user)
      }
    }).catch(err => this.error(err))
  }

  showComponent = () => (
    <Container>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputCell}>
        <TextInput
          // blurOnSubmit={false}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          label="Username"
          name="username"
          onChangeText={text => this.setState({ username: text })}
          onSubmitEditing={() => this.password.focus()}
          placeholder="Enter your username"
          ref={(input) => { this.username = input }}
          returnKeyType="next"
          theme={theme}
          value={this.state.username}
        />
      </View>
      <View style={styles.inputCell}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          label="Password"
          name="password"
          onChangeText={text => this.setState({ password: text })}
          placeholder="Enter your password"
          ref={(input) => { this.password = input }}
          returnKeyType="next"
          secureTextEntry
          theme={theme}
          value={this.state.password}
        />
      </View>
      <Button
        buttonStyle={styles.submitButton}
        disabled={!this.state.username || !this.state.password}
        onPress={this.signIn}
        title="SIGN IN"
      />
      <View style={styles.footer}>
        <TouchableHighlight onPress={() => this.changeState('forgotPassword')}>
          <Text style={styles.footerText}>Forgot Password</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.errorRow}>
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    </Container>
  )
}
