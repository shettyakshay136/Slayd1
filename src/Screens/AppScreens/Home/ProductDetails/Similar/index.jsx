import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { SimilarProductsData } from '../../../../../../Data';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProductList = () => {
  const [mediaStates, setMediaStates] = useState(
    SimilarProductsData.map(() => ({ videoDuration: 0, currentTime: 0 }))
  );

  const imageHeights = [200, 230, 230, 240, 250];
  const columnOne = [];
  const columnTwo = [];

  const handleLoad = (index, data) => {
    const updatedStates = [...mediaStates];
    updatedStates[index].videoDuration = data.duration;
    setMediaStates(updatedStates);
  };

  const handleProgress = (index, data) => {
    const updatedStates = [...mediaStates];
    updatedStates[index].currentTime = data.currentTime;
    setMediaStates(updatedStates);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  SimilarProductsData.forEach((item, index) => {
    const { videoDuration, currentTime } = mediaStates[index];
    const timeLeft = Math.max(0, videoDuration - currentTime);
    const formattedTimeLeft = formatTime(timeLeft);
    const imageHeight = imageHeights[index % imageHeights.length];

    const productItem = (
      <View style={styles.productContainer} key={item.id}>
        <View style={styles.mediaContainer}>
          {item.type === 'image' ? (
            <Image
              source={item.media}
              style={{
                width: '100%',
                height: imageHeight,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.videoContainer}>
              <Video
                source={item.media}
                style={{ width: '100%', height: screenHeight * 0.36 }}
                resizeMode="cover"
                repeat={true}
                controls={false}
                onLoad={(data) => handleLoad(index, data)}
                onProgress={(data) => handleProgress(index, data)}
              />
              <Text style={styles.timeLeft}>{formattedTimeLeft}</Text>
            </View>
          )}
        </View>
        <View style={styles.prize}>
          <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{item.price}</Text>
          <Text numberOfLines={2} style={styles.name}>{item.des}</Text>
        </View>
      </View>
    );

    if (index % 2 === 0) {
      columnOne.push(productItem);
    } else {
      columnTwo.push(productItem);
    }
  });

  return (
    <View style={styles.listContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.column}>{columnOne}</View>
        <View style={styles.column}>{columnTwo}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 20,
  },
  column: {
    flex: 1,
  },
  productContainer: {
    marginBottom: 10,
  },
  prize: {
    paddingVertical: 7,
    paddingHorizontal: 3,
  },
  mediaContainer: {
    position: 'relative',
  },
  videoContainer: {
    height: screenHeight * 0.36,
    borderRadius: 16,
    overflow: 'hidden',
  },
  name: {
    color: '#777',
    paddingBottom: 10,
  },
  timeLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 15,
  },
});

export default ProductList;
