'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class BoopView extends Component {

  onClickBackToHome() {
    this.props.navigator.push({
      name: 'home',
    });
  }

  render() {
    return (
      <View>
        <Text>Boop view!</Text>
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
  button: {
    color: '#FF0000',
  }
});

AppRegistry.registerComponent('BoopView', () => BoopView);
export default BoopView;
