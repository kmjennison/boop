'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Text,
  View,
} from 'react-native';


class BoopView extends Component {
  render() {
    return (
      <View>
        <Text>Boop view!</Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('BoopView', () => BoopView);
export default BoopView;
