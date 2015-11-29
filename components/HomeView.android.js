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


class HomeView extends Component {
  
  onButtonPress() {
    this.props.navigator.push({
      name: 'boop-view',
    });
  }

  render() {
    return (
      <View>
        <Text>Home view!</Text>
        <TouchableHighlight onPress={this.onButtonPress.bind(this)}>
          <Text
            style={styles.button}>
              Go booping
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

AppRegistry.registerComponent('HomeView', () => HomeView);
export default HomeView;
