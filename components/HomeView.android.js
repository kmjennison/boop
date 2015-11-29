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
      return (
        <View key={index} style={styles.friendElem}>
          <TouchableHighlight
            onPress={self.onButtonPress.bind(self)}
            underlayColor='#CDCDCD'>
              <View style={styles.friendButton}>
                <View style={[styles.circle, {backgroundColor: color}]} />
                <Text
                  style={styles.friendName}>
                    {friend.firstName}
                </Text>
              </View>
          </TouchableHighlight>
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
    width: 80,
    height: 80,
    borderRadius: 100/2,
    backgroundColor: 'red'
  },
  friendName: {
    textAlign: 'center',
    fontSize: 16,
  },
});

AppRegistry.registerComponent('HomeView', () => HomeView);
export default HomeView;
