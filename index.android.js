/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  Text,
  View,
} = React;
var Blah = require('./components/Hello');

var boop = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{
          name: 'My First Scene',
          index: 0,
        }}
        renderScene={(route, navigator) =>
          <Blah />
        }
      />
    );
  }
});

AppRegistry.registerComponent('boop', () => boop);