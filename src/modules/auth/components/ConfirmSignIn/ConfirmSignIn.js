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

const logger = new Logger('ConfirmSignIn')


export default class ConfirmSignIn extends AuthPiece {
  constructor(props) {
    super(props)

    this._validAuthStates = ['confirmSignIn']
    this.state = {
      code: null,
      error: null,
    }

    this.confirm = this.confirm.bind(this)
    this.checkContact = this.checkContact.bind(this)
  }

  confirm() {
    const user = this.props.authData
    const { code } = this.state
    logger.debug(`Confirm Sign In for ${user.username}`)
    Auth.confirmSignIn(user, code).then(data => this.checkContact(user)).catch(err => this.error(err))
  }

  showComponent = () => (
    <Container>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Confirm Sign In</Text>
      </View>
      <View style={styles.inputCell}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          label="Confirmation Code"
          name="code"
          onChangeText={text => this.setState({ code: text })}
          placeholder="Enter your confirmation code"
          returnKeyType="next"
          theme={theme}
          value={this.state.code}
        />
      </View>
      <Button
        buttonStyle={styles.submitButton}
        disabled={!this.state.code}
        onPress={this.confirm}
        // ref={(input) => { this.submitButton = input }}
        title="CONFIRM"
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
