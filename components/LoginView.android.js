'use strict';

import React from 'react-native'
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native';
const ParseComponent = ParseReact.Component(React);
import FacebookLoginButton from './FacebookLoginButton';

class LoginView extends ParseComponent {

  observe(props, state) {
    return {
      user: ParseReact.currentUser,
    };
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FacebookLoginButton />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
  }
});

AppRegistry.registerComponent('LoginView', () => LoginView);
export default LoginView;
