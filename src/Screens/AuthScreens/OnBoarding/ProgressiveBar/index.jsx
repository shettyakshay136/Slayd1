// ProgressBar.js
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progress }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: '100%',
    backgroundColor: '#F4F5FA',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#C0EA4A',
    borderRadius: 5,
  },
});

export default ProgressBar;
