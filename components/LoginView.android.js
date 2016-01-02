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
import FBLogin from 'react-native-facebook-login';

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
        <FBLogin
            onLogin={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
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
