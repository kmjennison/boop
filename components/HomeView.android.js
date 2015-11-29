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
import { colors } from './globalStyle';


class HomeView extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedButton: null,
      selectedButtonSize: 80,
      navigateToBoopViewInProgress: false,
    };
  }

  increaseButtonSize() {
    this.setState({
      selectedButtonSize: 100,
    });
  }
  
  navigateToBoopView() {
    this.props.navigator.push({
      name: 'boop-view',
    });
  }

  navigateToBoopViewDelay() {
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
    }, 1000);
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
    const friendElems = data.friends.map(function(friend, index) {
      const color = colors[index % colors.length];
      const buttonSize = (
        self.state.selectedButton == friend.id ?
        self.state.selectedButtonSize :
        80
      );
      const circleButtonStyle = {
        width: buttonSize,
        height: buttonSize,
      };
      return (
        <View key={index} style={styles.friendElem}>
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
              <View style={[styles.circle, circleButtonStyle, {backgroundColor: color}]} />
            </TouchableHighlight>
            <Text
              style={styles.friendName}>
                {friend.firstName}
            </Text>
          </View>
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
  friendElem: {
    height: 120,
    width: 100,
    margin: 4,
  },
  friendButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  circle: {
    borderRadius: 100/2,
    backgroundColor: 'red'
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
