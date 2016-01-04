'use strict';

import React from 'react-native'
import {
  Component,
  NativeModules,
} from 'react-native';
import FBLogin from 'react-native-facebook-login';
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native';
const ParseComponent = ParseReact.Component(React);


class FacebookLoginButton extends Component {

  logIn(e) {
    console.log('User logging in: ', e);

    const fbUserId = e.profile.id;
    const token = e.token;

    const authData = {
      id: fbUserId,
      access_token: token,
      expiration_date: (new Date(e.expiration)).toISOString(),
    };

    Parse.FacebookUtils.logIn(authData, {
      success: (user) => {

        if (user.existed()) {
          return;
        }

        // Signup: update user data, e.g. email
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
          fbId: fbUserId,
        }).dispatch({waitForServer: true});

        // Get the user's Installation object and update it with their user ID.
        // This lets us target push notifications to specific users.
        this.getParseInstallationObjectId().then(
          (installationId) => {
            var query = new Parse.Query(Parse.Installation);
            return query.get(installationId);
        }).then(
          (installationObj) => {
            installationObj.set('user', user).save();
          }
        );
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

  getParseInstallationObjectId() {
    var promise = new Promise(function(resolve, reject) {
      NativeModules.ParseInstallation.getInstallationObjectId(
        (msg) => {
          reject(msg);
        },
        (installationId) => {
          resolve(installationId);
        }
      );
    });
    return promise;
  }

  render() {
    return (
      <FBLogin
          permissions={['email', 'user_friends']}
          onLogin={this.logIn.bind(this)}
          onLogout={this.logOut}
        />
    );
  }
};

export default FacebookLoginButton;
