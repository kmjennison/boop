'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';
import BoopView from './BoopView';
import HomeView from './HomeView';
import NavBar from './NavBar';


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
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <NavBar />
        }
      />
    );
  }
};

AppRegistry.registerComponent('BoopNavigator', () => BoopNavigator);
export default BoopNavigator;
