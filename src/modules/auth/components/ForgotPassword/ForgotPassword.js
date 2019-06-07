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

const logger = new Logger('ForgotPassword')

export default class ForgotPassword extends AuthPiece {
  constructor(props) {
    super(props)

    this._validAuthStates = ['forgotPassword']
    this.state = { delivery: null }

    this.send = this.send.bind(this)
    this.submit = this.submit.bind(this)
  }

  send() {
    const { username } = this.state
    if (!username) {
      this.error('Username cannot be empty')
      return
    }
    Auth.forgotPassword(username).then((data) => {
      logger.debug(data)
      this.setState({ delivery: data.CodeDeliveryDetails })
    }).catch(err => this.error(err))
  }

  submit() {
    const { username, code, password } = this.state
    Auth.forgotPasswordSubmit(username, code, password).then((data) => {
      logger.debug(data)
      this.changeState('signIn')
    }).catch(err => this.error(err))
  }

  forgotBody() {
    return (
      <View>
        <View style={styles.inputCell}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            label="Username"
            name="username"
            onChangeText={text => this.setState({ username: text })}
            placeholder="Enter your username"
            returnKeyType="next"
            theme={theme}
            value={this.state.username}
          />
        </View>
        <Button
          buttonStyle={styles.submitButton}
          disabled={!this.state.username}
          onPress={this.send}
          title="SEND"
        />
      </View>
    )
  }

  submitBody() {
    return (
      <View>
        <View style={styles.inputCell}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            label="Confirmation Code"
            name="code"
            onChangeText={text => this.setState({ code: text })}
            onSubmitEditing={() => this.password.focus()}
            placeholder="Enter your confirmation code"
            returnKeyType="next"
            theme={theme}
            value={this.state.code}
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            label="Password"
            name="password"
            onChangeText={text => this.setState({ password: text })}
            placeholder="Enter your new password"
            ref={(input) => { this.password = input }}
            returnKeyType="go"
            secureTextEntry
            theme={theme}
            value={this.state.password}
          />
        </View>
        <Button
          buttonStyle={styles.submitButton}
          disabled={!this.state.username}
          onPress={this.submit}
          title="SUBMIT"
        />
      </View>
    )
  }

  showComponent = () => (
    <Container>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Forgot Password</Text>
      </View>
      {!this.state.delivery ? this.forgotBody() : this.submitBody()}
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
