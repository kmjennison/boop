'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
  Text,
  View,
} from 'react-native';
import HomeView from './components/HomeView';
import BoopView from './components/BoopView';


class boop extends Component {

  _renderScene(route) {
    var Component;
    switch (route) {
      case 'home':
        Component = HomeView;
        break;
      case 'boop-view':
        Component = BoopView;
        break;
      default:
        Component = HomeView;
    }
    return <Component />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'home',
          index: 0,
        }}
        renderScene={this._renderScene}
      />
    );
  }

};

AppRegistry.registerComponent('boop', () => boop);
