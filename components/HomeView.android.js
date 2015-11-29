'use strict';

import React from 'react-native'
import {
  Animated,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { colors } from './globalStyle';
import Dimensions from 'Dimensions';


class HomeView extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      defaultButtonSize: 80,
      animationDuration: 400,
      selectedButton: null,
      selectedButtonScale: new Animated.Value(1),
      navigateToBoopViewInProgress: false,
    };
  }

  increaseButtonSize() {
    // Find out how much we have to scale the button to cover
    // the entire screen. We don't want to pick an arbitrary scale
    // value because we might fail to cover the screen or we might
    // cover the screen too quickly.
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const maxScreenDimension = Math.max(screenWidth, screenHeight);
    const currentButtonSize = this.state.defaultButtonSize;
    const multipleToScale = 2 * (maxScreenDimension / currentButtonSize);

    // Animate the button scaling.
    this.state.selectedButtonScale.setValue(1);
    Animated.timing(
      this.state.selectedButtonScale,
      {
        toValue: multipleToScale,
        duration: this.state.animationDuration,
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
    }, self.state.animationDuration + 100);
  }

  render() {
    const { data } = this.props;
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
    // Build all the friend buttons.
    const friendElems = data.friends.map(function(friend, index) {

      // Create the button style.
      // Cycle through the colors for each friend button.
      const color = colors[index % colors.length];
      // If this button is selected, give it the selected
      // tranform value.
      var circleButtonTranformVal = 1;
      const circleDiameter = self.state.defaultButtonSize;
      const isSelected = self.state.selectedButton == friend.id;
      const circleButtonStyle = {
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleDiameter/2,
        transform: [
          {
            scale: (
              isSelected ?
              self.state.selectedButtonScale :
              1
            ),
          },
        ],
        backgroundColor: color,
        overflow: 'visible',
      };

      // Build the button element.
      var friendButtonCircle;
      var key;
      if (isSelected) {
        key = 'friend-button-' + index + '-selected';
        friendButtonCircle = (
          <Animated.View style={[styles.circle, circleButtonStyle]} />
        );
      } else {
        key = 'friend-button-' + index + '';
        friendButtonCircle = (
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
              <View style={[styles.circle, circleButtonStyle]} />
          </TouchableHighlight>
        );
      }

      return (
        <View key={key} style={styles.friendButton}>
          {friendButtonCircle}
          <Text
            style={styles.friendName}>
              {friend.firstName}
          </Text>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        {friendElems}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: colors.darkTheme.primary,
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
