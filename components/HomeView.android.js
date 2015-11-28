'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Text,
  View,
} from 'react-native';


class HomeView extends Component {
  render() {
    return (
      <View>
        <Text>Home view!</Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('HomeView', () => HomeView);
export default HomeView;
