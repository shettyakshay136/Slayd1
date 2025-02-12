import React, { useState, useRef, useEffect } from 'react';
import { Animated, ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { height: viewportHeight } = Dimensions.get('window');

const imageHeights = [200, 230, 260, 240, 250, 190];

const CustomList = ({videoData}) => {
  const [visibleVideoIds, setVisibleVideoIds] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const onScrollEnd = () => {
    if (!scrollViewRef.current) return;

    scrollViewRef.current.measureInWindow((x, y, width, height) => {
      const visibleIds = [];
      videoData.forEach((item, index) => {
        const itemHeight = imageHeights[index % imageHeights.length];
        const offsetTop = index * itemHeight;
        const offsetBottom = offsetTop + itemHeight;

        if (offsetTop < scrollY._value + viewportHeight && offsetBottom > scrollY._value) {
          visibleIds.push(item.id);
        }
      });

      setVisibleVideoIds(visibleIds);
    });
  };



  const renderItem = (item, index) => {
    const itemHeight = imageHeights[index % imageHeights.length];
    const isVisible = visibleVideoIds.includes(item.id);

    return (
      <View
        key={item.id}
        style={[styles.item, { height: itemHeight, backgroundColor: isVisible ? '#ddd' : '#f5f5f5' }]}
      >
        <Text>{item.name}</Text>
        <Video
          source={item.videoUrl}
          style={styles.video}
          paused={!isVisible}
          resizeMode="cover"
        />
      </View>
    );
  };

  const columnOne = [];
  const columnTwo = [];
  videoData.forEach((item, index) => {
    if (index % 2 === 0) {
      columnOne.push(renderItem(item, index));
    } else {
      columnTwo.push(renderItem(item, index));
    }
  });

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      onScroll={handleScroll}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      scrollEventThrottle={16}
    >
      <View style={styles.columnContainer}>
        <View style={styles.column}>{columnOne}</View>
        <View style={styles.column}>{columnTwo}</View>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  item: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default CustomList;
