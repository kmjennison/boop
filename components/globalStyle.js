'use strict';

import React from 'react-native'
import {
  StyleSheet,
} from 'react-native';

export const colors = {
  darkTheme: {
    primary: '#1D1D1D',
    secondary: '#212121',
    text1: '#E4E4E4',
  },
  boopTouchColors: {
    green: '#35FF44',
    pink: '#FC28FF',
    blue: '#47F7FF',
  }
};

const globalStyle = StyleSheet.create({
  button: {
    color: '#FF0000',
  },
  toolbar: {
    color: colors.darkTheme.text1,
    backgroundColor: colors.darkTheme.secondary,
    height: 56,
    top: 0,
  },
});

export default globalStyle;
