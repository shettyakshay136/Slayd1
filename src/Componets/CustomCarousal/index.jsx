import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomCarousel = ({ dataLength, activeIndex, setActiveIndex }) => {
  const progress = new Animated.Value(0);

  // Sync active index with progress bar animation
  useEffect(() => {
    // Reset the progress when active index changes
    progress.setValue(0); // Reset the progress
    Animated.timing(progress, {
      toValue: 1, // Animate from 0 to 100% (full progress)
      duration: 2000, // Duration of 2 seconds for the progress animation
      useNativeDriver: false,
    }).start();
  }, [activeIndex]); // Trigger when activeIndex changes

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        {Array.from({ length: dataLength }).map((_, index) => {
          const isActive = activeIndex === index;
          const itemWidth = isActive ? 30 : 5; // Active item width = 70, inactive item width = 5

          return (
            <View
              key={index}
              style={[
                styles.timelineItem,
                {
                  width: itemWidth,
                  backgroundColor: isActive ? 'white' : '#FFFFFF99', // Green for active, transparent for inactive
                },
              ]}
            >
              {isActive && (
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 30], 
                        extrapolate: 'clamp',
                      }),
                      backgroundColor: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#FFFFFF99', 'white'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timelineItem: {
    height: 3,
    marginHorizontal: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
  },
});

export default CustomCarousel;
