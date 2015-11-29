'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';
import BoopView from './BoopView';
import HomeView from './HomeView';


class BoopNavigator extends Component {

  renderScene(route, navigator) {
    var Component;
    switch (route.name) {
      case 'home':
        Component = HomeView;
        break;
      case 'boop-view':
        Component = BoopView;
        break;
      default:
        Component = HomeView;
    }
    return (
      <Component
        name={route.name}
        navigator={navigator}
      />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'home',
        }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
};

AppRegistry.registerComponent('BoopNavigator', () => BoopNavigator);
export default BoopNavigator;
