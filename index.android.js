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
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native';


// Initialize Parse.
Parse.initialize('FvWH4KxfFMphTtmHuJZCxGdof0PPLh8GkiFLVyEO', 'FTVGQmGroNWEwCWATzvfBhgwZiH9A3AtuM3dj7lv');

class boop extends Component {

  render() {
    return (
      <BoopNavigator />
    );
  }

};

AppRegistry.registerComponent('boop', () => boop);
