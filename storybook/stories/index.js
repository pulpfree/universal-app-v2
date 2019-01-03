import React from 'react';
import { ScrollView, Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

import QuoteSearchHeader from '../../src/components/QuoteSearchHeader/QuoteSearchHeader'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

/*
 * ======================== QuoteSearchHeader =====================================
 */
storiesOf('QuoteSearchHeader', module)
  .addDecorator(getStory => <ScrollView>{getStory()}</ScrollView>)
  .add('default', () => (
    <QuoteSearchHeader />
  ))