'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
  Text,
  View,
} from 'react-native';
import BoopNavigator from './components/BoopNavigator';


class boop extends Component {

  render() {
    return (
      <BoopNavigator />
    );
  }

};

AppRegistry.registerComponent('boop', () => boop);
