'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
  ToolbarAndroid,
  View,
} from 'react-native';
import globalStyle, { colors } from './globalStyle';


class NavBar extends Component {

  onClickBackToHome() {
    this.props.navigator.push({
      name: 'home',
      sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
    });
  }

  getToolbarActions(route) {
    const actionsByRoute = {
      'home': [],
      'boop-view': [{
        title: 'Back',
        show: 'always'
      }],
    }
    if (actionsByRoute[route.name]) {
      return actionsByRoute[route.name];
    }
    return [];
  }

  render() {
    const { navigator } = this.props;
    const currentRoute = navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1];
    const toolbarActions = this.getToolbarActions(currentRoute);

    return (
      <ToolbarAndroid
        style={globalStyle.toolbar}
        title='boop'
        titleColor={colors.darkTheme.text1}
        actions={toolbarActions}
        onActionSelected={this.onClickBackToHome.bind(this)}
      />
    );
  }
};

AppRegistry.registerComponent('NavBar', () => NavBar);
export default NavBar;
