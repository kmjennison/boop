'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { colors } from './globalStyle';


class BoopView extends Component {

  onClickBackToHome() {
    this.props.navigator.push({
      name: 'home',
      sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >Boop view!</Text>
        <TouchableHighlight onPress={this.onClickBackToHome.bind(this)}>
          <Text
            style={styles.button}>
              Back to home
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkTheme.primary,
  },
  text: {
    color: colors.darkTheme.text1,
  },
  button: {
    color: '#FF0000',
  },
});

AppRegistry.registerComponent('BoopView', () => BoopView);
export default BoopView;
