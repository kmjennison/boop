'use strict';

import React from 'react-native'
import {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { colors } from './globalStyle';


class BoopView extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      touching: false,
      touchLocation: {x: 0, y: 0},
    };
  }

  onClickBackToHome() {
    this.props.navigator.push({
      name: 'home',
      sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
    });
  }

  updateIsTouching(isTouching) {
    this.setState({
      touching: isTouching,
    });
  }

  updateTouchLocation(x, y) {
    this.setState({
      touchLocation: {
        x: x,
        y: y,
      }
    });
  }

  onTouch(e) {
    this.updateIsTouching(true);
    this.updateTouchLocation(e.nativeEvent.locationX,
      e.nativeEvent.locationY);
  }

  onTouchMove(e) {
    this.updateTouchLocation(e.nativeEvent.locationX,
      e.nativeEvent.locationY);
  }

  onTouchUp(e) {
    this.updateIsTouching(false);
    this.updateTouchLocation(e.nativeEvent.locationX,
      e.nativeEvent.locationY);
  }

  render() {

    // If the user is touching, show them a visual.
    var touchVisual;
    if (this.state.touching) {
      const touchVisualDiameter = 100;
      const touchVisualLocationStyle = {
        position: 'absolute',
        top: this.state.touchLocation.y - (touchVisualDiameter / 2),
        left: this.state.touchLocation.x - (touchVisualDiameter / 2),
        width: touchVisualDiameter,
        height: touchVisualDiameter,
        borderRadius: touchVisualDiameter/2,
      };
      touchVisual = (
        <View
          style={[styles.touchVisual, touchVisualLocationStyle]}>
        </View>
      )
    }

    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={() => { return true;}}
        onResponderTerminationRequest={() => { return false;}}
        onResponderGrant={this.onTouch.bind(this)}
        onResponderMove={this.onTouchMove.bind(this)}
        onResponderRelease={this.onTouchUp.bind(this)}>
        <Text style={styles.text} >Boop view!</Text>
        <TouchableHighlight onPress={this.onClickBackToHome.bind(this)}>
          <Text
            style={styles.button}>
              Back to home
          </Text>
        </TouchableHighlight>
        {touchVisual}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkTheme.primary,
  },
  text: {
    color: colors.darkTheme.text1,
  },
  button: {
    color: '#FF0000',
  },
  touchVisual: {
    width: 100,
    height: 100,
    backgroundColor: colors.boopTouchColors.pink,
    // Shadow is only available on iOS right now:
    // https://facebook.github.io/react-native/docs/known-issues.html#view-shadows
    // shadowColor: '#FFF',
    // shadowOffset: {width: 20, height: 20},
    // shadowRadius: 20,
    // shadowOpacity: 0.8,
    borderWidth: 2,
    borderColor: colors.boopTouchColors.pink,
    borderStyle: 'solid',
    opacity: 0.70,
  },
});

AppRegistry.registerComponent('BoopView', () => BoopView);
export default BoopView;
