import React, { useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ResizableScrollView = ({ children, scrollY }) => {
  const animatedStyle = {
    width: scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [screenWidth, screenWidth * 0.8],
      extrapolate: 'clamp',
    }),
    height: scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [ screenHeight * 0.85, screenHeight * 0.5],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default ResizableScrollView;
