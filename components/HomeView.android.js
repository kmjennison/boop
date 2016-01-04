'use strict';

import React from 'react-native'
import {
  Animated,
  AppRegistry,
  Component,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { colors } from './globalStyle';
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native';
const ParseComponent = ParseReact.Component(React);
import FacebookLoginButton from './FacebookLoginButton';


class HomeView extends ParseComponent {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedButton: null,
      selectedButtonScale: new Animated.Value(1),
      navigateToBoopViewInProgress: false,
      friends: [],
    };
  }

  observe(props, state) {
    return {
      user: ParseReact.currentUser,
      test: (new Parse.Query('Test')),
    };
  }

  componentDidMount() {
    this.fetchFacebookFriends();
    NativeModules.ParseInstallation.show('Awesome', NativeModules.ParseInstallation.SHORT);
  }

  /**
   * Make an HTTP request to endpoint. Returns a promise.
   *
   * @param {string} endpoint - The URL of the endpoint.
   * @param {string} method - The HTTP method to use. Should be one of:
   * 'get', 'post', 'head', 'put', 'delete'.
   * @param {object} data - Data to send with the request. This is an optional
   *  parameter.
   * @param {object} headers - Headers to send with the request. This is an optional
   *  parameter.
   */
  makeRequest(endpoint, method, data, headers) {

    // Form the final headers.
    var headers = headers || {};
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const finalHeaders = Object.assign({}, defaultHeaders, headers);

    const options = {
      method: method,
      headers: headers
    };
    if (method != 'get' && method != 'head') {
      // `data` parameter is optional.
      var data = data || {};
      options.body = data;
    }

    return fetch(endpoint, options);
  }

  /**
   * Make an HTTP request to a Facebook graph API endpoint. Returns a promise.
   * This function automatically includes the user's token in the request.
   *
   * @param {string} endpoint - The relative URL of the endpoint.
   * @param {string} method - The HTTP method to use. Should be one of:
   * 'get', 'post', 'head', 'put', 'delete'.
   */
  makeFacebookRequest(endpoint, method) {
    const urlBase = 'https://graph.facebook.com/v2.5/';
    const accessToken = this.data.user.authData.facebook.access_token;
    const finalUrl = urlBase + endpoint + '&access_token=' + accessToken;
    return this.makeRequest(finalUrl, method)
  }

  fetchFacebookFriends() {
    const friendsUrl = '/me/friends?fields=first_name,last_name,picture';
    this.makeFacebookRequest(friendsUrl, 'get')
      .then((response) => {
        return response.json()
      }).then((json) => {
        const friends = json.data;
        this.setState({
          friends: friends,
        });
      }).catch((exception) => {
        console.log('Parsing failed', exception)
      });
  }

  increaseButtonSize() {
    // this.state.selectedButtonScale.setValue(1.1);
    Animated.timing(
      this.state.selectedButtonScale,
      {
        toValue: 1.4,
        duration: 200,
      }
    ).start();
  }
  
  navigateToBoopView() {
    this.props.navigator.push({
      name: 'boop-view',
    });
  }

  navigateToBoopViewDelay() {
    // Make sure we're not already in the process of navigating.
    if (this.state.navigateToBoopViewInProgress) {
      return;
    }
    this.setState({
      navigateToBoopViewInProgress: true,
    });
    const t = setTimeout(() => {
      this.navigateToBoopView();
      this.setState({
        navigateToBoopViewInProgress: false,
      });
    }, 300);
  }

  render() {
    const user = this.props.user;
    const colors = [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf',
    ];

    // Build all the friend buttons.
    const friendElems = this.state.friends.map((friend, index) => {
      // Cycle through the colors for each friend button.
      const color = colors[index % colors.length];
      // If this button is selected, give it the selected
      // tranform value.
      var circleButtonTranformVal = 1;
      if (this.state.selectedButton == friend.id) {
        circleButtonTranformVal = this.state.selectedButtonScale;
      }
      const circleDiameter = 80;
      const circleButtonStyle = {
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleDiameter/2,
        transform: [
          {scale: circleButtonTranformVal},
        ],
      };
      const profilePic = friend.picture.data.url;
      return (
        <View style={styles.friendButton}>
          <TouchableHighlight
            style={styles.circleTouchable}
            onPress={() => {
              this.setState({
                selectedButton: friend.id,
              });
              this.increaseButtonSize();
              this.navigateToBoopViewDelay();
            }}
            underlayColor='#CDCDCD'>
              <Animated.View style={[styles.circle, circleButtonStyle, {backgroundColor: color}]}>
                <Image
                  source={{uri: profilePic}}
                  style={styles.profilePicture} />
              </Animated.View>
          </TouchableHighlight>
          <Text
            style={styles.friendName}>
              {friend.first_name}
          </Text>
        </View>
      );
    });
    
    return (
      <View style={styles.container}>
        <FacebookLoginButton />
        <View style={styles.friendsContainer}>
          {friendElems}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.darkTheme.primary,
  },
  friendsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  friendButton: {
    height: 120,
    width: 100,
    margin: 4,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 70/2,
    margin: 5,
  },
  circle: {
    borderRadius: 80/2,
    backgroundColor: 'red',
    height: 80,
    width: 80,
  },
  circleTouchable: {
    borderRadius: 100/2,
  },
  friendName: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.darkTheme.text1,
  },
});

AppRegistry.registerComponent('HomeView', () => HomeView);
export default HomeView;
