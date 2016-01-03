'use strict';

import React from 'react-native'
import {
  Animated,
  AppRegistry,
  Component,
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
    this.fetchFriends();
  }

  fetchFriends() {
    // TODO: use real data
    const friends = [
      {
        id: 102,
        firstName: 'Katniss',
        lastName: 'Everdeen',
      },
      {
        id: 145,
        firstName: 'Dean',
        lastName: 'Thomas',
      },
      {
        id: 4456,
        firstName: 'Leah',
        lastName: 'Price',
      },
      {
        id: 73,
        firstName: 'Elphaba',
        lastName: 'Thropp',
      },
      {
        id: 1,
        firstName: 'Meg',
        lastName: 'Murry',
      },
      {
        id: 89,
        firstName: 'Joe',
        lastName: 'Hardy',
      },
    ];
    this.setState({
      friends: friends,
    })
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
    const self = this;
    const t = setTimeout(function() {
      self.navigateToBoopView();
      self.setState({
        navigateToBoopViewInProgress: false,
      });
    }, 300);
  }

  render() {
    const user = this.props.user;
    const self = this;
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
    // console.log('Parse data', this.data);

    // Build all the friend buttons.
    const friendElems = this.state.friends.map(function(friend, index) {
      // Cycle through the colors for each friend button.
      const color = colors[index % colors.length];
      // If this button is selected, give it the selected
      // tranform value.
      var circleButtonTranformVal = 1;
      if (self.state.selectedButton == friend.id) {
        circleButtonTranformVal = self.state.selectedButtonScale;
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
      return (
        <View style={styles.friendButton}>
          <TouchableHighlight
            style={styles.circleTouchable}
            onPress={() => {
              self.setState({
                selectedButton: friend.id,
              });
              self.increaseButtonSize();
              self.navigateToBoopViewDelay();
            }}
            underlayColor='#CDCDCD'>
              <Animated.View style={[styles.circle, circleButtonStyle, {backgroundColor: color}]} />
          </TouchableHighlight>
          <Text
            style={styles.friendName}>
              {friend.firstName}
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
