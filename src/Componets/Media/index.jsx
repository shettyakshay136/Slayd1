import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated, ActivityIndicator , AppState } from 'react-native';
import Video from 'react-native-video';
import AWS from 'aws-sdk';
import { useIsFocused  } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Fonts from '../../Styles';
import { MuteSvg } from '../../Assets/Svg';
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const MediaList = ({ post, resize, onMiddlePress, onProductImagesLength, onCurrentIndex, onTimeline, isActive, isUpcoming }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [timeline, setTimeline] = useState(0); 
  const [productPresignedUrls, setProductPresignedUrls] = useState([]); 
  const [taggedPresignedUrls, setTaggedPresignedUrls] = useState([]);   
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [pause , setPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false); 
  const urlsFetched = useRef(false); 
  const videoRef = useRef(null);  
  const intervalRef = useRef(null);
  const pressTimer = useRef(null); 
  const translateX = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();


    // console.log("check mute",isMuted)



  console.log("checklong pause",pause)


  



  





  const isScrolledBelow30 = useSelector(
    (state) => state.scroll.isScrolledBelow30,
    (prev, next) => prev === next 
  );

  // console.log("paused",isPaused1)

  React.useEffect(() => {
   
  }, [isScrolledBelow30]);

  
  


  const isPaused1 = !isFocused || isScrolledBelow30 || isUpcoming || pause;


  // console.log('chec focused',!isFocused)
  // console.log('check30',isScrolledBelow30)
  // console.log('cpimhup',isUpcoming)
  // console.log('pause',pause)


  

  

  const productImages = post.product
    ? [post.product.image_url, ...(post.product.secondary_images || [])]
    : [];
  
  const Tagged = post.media;
  const mediaList = post.post_type === "PRODUCT_POST" ? productImages : Tagged;

  useEffect(() => {
    if (!urlsFetched.current) {
      AWS.config.update({
        accessKeyId: 'AKIA2YICAAKWC6GILFFB',
        secretAccessKey: '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',
        region: 'ap-south-1',
      });

      const s3 = new AWS.S3();
      const bucketName = 'feed-images-01';

      const fetchPresignedUrls = async () => {
        let productUrls = [];
        let taggedUrls = [];

        if (post.post_type === "PRODUCT_POST") {
          productUrls = await Promise.all(
            productImages.map((url) => {
              const objectKey = url.split('/').slice(-2).join('/');
              const params = {
                Bucket: bucketName,
                Key: objectKey,
                Expires: 60,
              };
              return new Promise((resolve, reject) => {
                s3.getSignedUrl('getObject', params, (err, presignedUrl) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(presignedUrl);
                  }
                });
              });
            })
          );
        } else if (post.post_type === "TAGGED_POST") {
          const url = Tagged[0].url;
          const objectKey = url
            .split('/')
            .slice(-2)
            .join('/')
            .replace(/\+/g, ' ')
            .replace(/%26/g, '&');
          const params = {
            Bucket: bucketName,
            Key: objectKey,
            Expires: 60,
          };
          try {
            const presignedUrl = await new Promise((resolve, reject) => {
              s3.getSignedUrl('getObject', params, (err, presignedUrl) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(presignedUrl);
                }
              });
            });
            taggedUrls.push(presignedUrl);
          } catch (err) {
            console.log('Error during presigning: ', err);
          }
        }

        setProductPresignedUrls(productUrls);
        setTaggedPresignedUrls(taggedUrls);
        urlsFetched.current = true;
        setLoading(false);
      };

      fetchPresignedUrls();
    }
  }, [post.post_type, productImages, Tagged]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const handleAppStateChange = (nextAppState) => {
  //       if (nextAppState === "active") {
  //         setIsPaused(!(isActive || isUpcoming)); // Resume or pause based on state
  //       } else {
  //         setIsPaused(true); // Pause when the app is not active
  //       }
  //     };

  //     const subscription = AppState.addEventListener("change", handleAppStateChange);

  //     return () => subscription.remove(); // Cleanup on unfocus
  //   }, [isActive, isUpcoming])
  // );

  useEffect(() => {
    if (post.post_type === "PRODUCT_POST" && productPresignedUrls.length > 1) {
      if (onProductImagesLength) onProductImagesLength(productPresignedUrls.length);
      if (onCurrentIndex) onCurrentIndex(mediaIndex);

      intervalRef.current = setInterval(() => {
        setMediaIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % productPresignedUrls.length;
          if (onCurrentIndex) onCurrentIndex(newIndex);
          return newIndex;
        });

        setTimeline((prevTime) => {
          const newTime = prevTime + 2;
          if (onTimeline) onTimeline(newTime);
          return newTime;
        });
      }, 2000);

      return () => clearInterval(intervalRef.current);
    }
  }, [productPresignedUrls]);

  const handleTap = (event) => {
    // Stop the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // console.log('Touch location:', event.nativeEvent.locationY);

    const { locationX } = event.nativeEvent;
    const oneThirdWidth = width / 3;
    const twoThirdWidth = (2 * width) / 3;

    if (locationX < oneThirdWidth) {
      setMediaIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : mediaList.length - 1;
        if (onCurrentIndex) onCurrentIndex(newIndex);
        return newIndex;
      });
    } else if (locationX > twoThirdWidth) {
      setMediaIndex((prevIndex) => {
        const newIndex = prevIndex < mediaList.length - 1 ? prevIndex + 1 : 0;
        if (onCurrentIndex) onCurrentIndex(newIndex);
        return newIndex;
      });
    } else {
      // Handle mute/unmute based on holding state
      if (isHolding) {
        // While holding, mute/unmute the video
        setIsMuted((prevMuted) => {
          const newMutedState = !prevMuted;
          if (newMutedState) {
            console.log("Media muted");
          } else {
            console.log("Media unmuted");
          }
          return newMutedState;
        });
      } else {
        // If not holding, just toggle mute on tap without affecting pause state
        setIsMuted((prevMuted) => {
          const newMutedState = !prevMuted;
          if (newMutedState) {
            console.log("Media muted");
          } else {
            console.log("Media unmuted");
          }
          return newMutedState;
        });
      }
      if (onMiddlePress) onMiddlePress();
    }
  };
  
  const handleVideoEnd = () => {
    setMediaIndex((prevIndex) => (prevIndex + 1) % taggedPresignedUrls.length);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  // const [isMuted, setIsMuted] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);


  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // const handlePause = () => {
  //   setIsPaused(true);
  // };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(toggleMute)(); // Executes `toggleMute` on the JS thread
  });


  const handlePause = (paused) => {
    console.log("Setting isPaused to:", paused);
    setPaused(paused);
  };

  const longPress = Gesture.LongPress()
  .onStart(() => {
    // console.log("Long pressed - onStart");
    runOnJS(handlePause)(true);
  })
  .onEnd(() => {
    console.log("Long pressed - onEnd");
    runOnJS(handlePause)(false);
  });

  const combinedGestures = Gesture.Exclusive(singleTap);

  return (
    <GestureHandlerRootView>
    <GestureDetector gesture={combinedGestures}>
      <TouchableWithoutFeedback
      onLongPress={() => setPaused(true)}
      onPressOut={() => setPaused(false)}>
      <View style={styles.container}>
        {post.post_type === "PRODUCT_POST" && productPresignedUrls.length > 1 ? (
          <View style={styles.slideContainer}>
            <Animated.Image
              source={{ uri: productPresignedUrls[mediaIndex] }}  
              style={[styles.media, { resizeMode: resize, transform: [{ translateX }] }]}/>
            {/* <Animated.Image
              source={{ uri: productPresignedUrls[(mediaIndex + 1) % productPresignedUrls.length] }} // Upcoming image
              style={[styles.media, { resizeMode: resize, position: 'absolute', transform: [{ translateX }] }]}/> */}
          </View>
        ) : post.post_type === "TAGGED_POST"  ? (
          <View style={styles.mediaContainer}>
            {taggedPresignedUrls && taggedPresignedUrls.length > 0 && (
              <Video
                ref={videoRef}
                source={{
                  uri: 
                  // (isActive && isUpcoming)
                  //   ? taggedPresignedUrls[Math.random() > 0.5 ? 0 : 1]
                  //   : isActive
                  //   ? taggedPresignedUrls[0]  
                  //   : isUpcoming
                  //   ? taggedPresignedUrls[1]  
                  //   : null, 
                  post.media[0].url
                }}
                style={styles.media}
                paused={isPaused1} 
                resizeMode="cover"
                repeat
                onEnd={handleVideoEnd}
                ignoreSilentSwitch="ignore"
                muted={isMuted}

              />
            )}
            {isMuted && (
              <View style={{
                position: 'absolute',
                top: '45%', // Adjust the position as needed
                left: '50%',
                transform: [{ translateX: -20 }], // Center the icon
              }}>
                <MuteSvg/>
              </View>
            )}
          </View>
        ) : null}
      </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
    </GestureHandlerRootView>
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
