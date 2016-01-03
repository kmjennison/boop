'use strict';

import React from 'react-native'
import {
  Component,
} from 'react-native';
import FBLogin from 'react-native-facebook-login';
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native';
const ParseComponent = ParseReact.Component(React);


class FacebookLoginButton extends Component {

  logIn(e) {
    console.log('User logging in: ', e);

    const userId = e.profile.id;
    const token = e.token;

    const authData = {
      id: userId,
      access_token: token,
      expiration_date: (new Date(e.expiration)).toISOString(),
    };

    Parse.FacebookUtils.logIn(authData, {
      success: (user) => {

        // Signup: update user data, e.g. email
        if (!user.existed()) {
          console.log('Signup; saving additional user information.');

          // Include the object ID to create the object format that ParseReact expects.
          // See: https://github.com/ParsePlatform/ParseReact/issues/45#issuecomment-119521213
          const userObj = {
            className: '_User',
            objectId: user.id,
          }
          ParseReact.Mutation.Set(userObj, {
            username: e.profile.email,
            email: e.profile.email,
            name: e.profile.name,
            firstName: e.profile.first_name,
            lastName: e.profile.last_name,
            photoUrl: e.profile.picture.data.url,
          }).dispatch({waitForServer: true});
        }
      },
      error: (user, error) => {
        console.log('Facebook login error:', error);
        switch (error.code) {
          case Parse.Error.INVALID_SESSION_TOKEN:
            // console.log('Login error: INVALID_SESSION_TOKEN');
            break;
          default:
            break;
        }
      }
    });
  }

  logOut(e) {
    console.log('Logging out', e);
    Parse.User.logOut();

  }

  render() {
    return (
      <FBLogin
          permissions={['email', 'user_friends']}
          onLogin={this.logIn}
          onLogout={this.logOut}
        />
    );
  }
};

export default FacebookLoginButton;
