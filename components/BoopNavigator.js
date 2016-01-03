'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';
import BoopView from './BoopView';
import HomeView from './HomeView';
import LoginView from './LoginView';
import NavBar from './NavBar';
import ParseReact from 'parse-react/react-native';
const ParseComponent = ParseReact.Component(React);


class BoopNavigator extends ParseComponent {

  observe(props, state) {
    return {
      user: ParseReact.currentUser,
    };
  }

  renderScene(route, navigator) {
    var Component;
    
    // If the user isn't logged in, show the login view.
    if (!this.data.user) {
      Component = LoginView;
    }
    else {
      switch (route.name) {
        case 'home':
          Component = HomeView;
          break;
        case 'login-view':
          Component = LoginView;
          break;
        case 'boop-view':
          Component = BoopView;
          break;
        default:
          Component = HomeView;
      }
    }

    // TODO: get real data.
    const data = {
      user: {
        firstName: 'Frances',
        lastName: 'Jones',
      },
      friends: [
        {
          id: 102,
          firstName: 'Katniss',
          lastName: 'Everdeen',
        },
        {
          id: 145,
          firstName: 'Dean',
          lastName: 'Thomas',
        },
        {
          id: 4456,
          firstName: 'Leah',
          lastName: 'Price',
        },
        {
          id: 73,
          firstName: 'Elphaba',
          lastName: 'Thropp',
        },
        {
          id: 1,
          firstName: 'Meg',
          lastName: 'Murry',
        },
        {
          id: 89,
          firstName: 'Joe',
          lastName: 'Hardy',
        },
      ],
    };

    return (
      <Component
        name={route.name}
        navigator={navigator}
        data={data}
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
