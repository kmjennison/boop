'use strict';

import React from 'react-native'
import {
  Component,
} from 'react-native';
import FBLogin from 'react-native-facebook-login';


class FacebookLoginButton extends Component {

  render() {
    return (
      <FBLogin
          permissions={['email', 'user_friends']}
          onLogin={function(e){console.log(e)}}
          onLogout={function(e){console.log(e)}}
          onCancel={function(e){console.log(e)}}
          onPermissionsMissing={function(e){console.log(e)}}
        />
    );
  }
};

export default FacebookLoginButton;
