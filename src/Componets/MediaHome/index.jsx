import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const MediaList = ({ post, resize, onMiddlePress }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const nextTranslateX = useRef(new Animated.Value(width)).current; // Initial position of next image

  // Combine primary_image and secondary_images into a single array
  const productImages = post.product
    ? [post.product.primary_image, ...(post.product.secondary_images || [])]
    : [];

  const mediaList = post.post_type === "PRODUCT_POST" ? productImages : post.assets;

 

  const handleTap = (event) => {
    const { locationX } = event.nativeEvent;
    const oneThirdWidth = width / 3;
    const twoThirdWidth = (2 * width) / 3;

    if (locationX < oneThirdWidth) {
      setMediaIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : mediaList.length - 1));
    } else if (locationX > twoThirdWidth) {
      setMediaIndex((prevIndex) => (prevIndex < mediaList.length - 1 ? prevIndex + 1 : 0));
    } else {
      if (onMiddlePress) {
        onMiddlePress();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        {post.post_type === "PRODUCT_POST" && productImages.length > 1 ? (
          <View style={styles.slideContainer}>
            <Animated.Image
              source={mediaList[mediaIndex]}
              style={[styles.media, { resizeMode: resize, transform: [{ translateX }] }]}
            />
            <Animated.Image
              source={mediaList[(mediaIndex + 1) % productImages.length]}
              style={[styles.media, { resizeMode: resize, position: 'absolute', transform: [{ translateX: nextTranslateX }] }]}
            />
          </View>
        ) : mediaList.length > 0 ? (
          <View key={mediaList[mediaIndex].id} style={styles.mediaContainer}>
            {mediaList[mediaIndex].media_type === 'image' ? (
              <Image
                source={mediaList[mediaIndex].url}
                style={[styles.media, { resizeMode: resize }]}
              />
            ) : (
              <Video
                source={mediaList[mediaIndex].url}
                style={styles.media}
                resizeMode="cover"
                repeat
                controls={false}
                paused={false}
              />
            )}
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  slideContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mediaContainer: {
    width: '100%',
    height: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default MediaList;
