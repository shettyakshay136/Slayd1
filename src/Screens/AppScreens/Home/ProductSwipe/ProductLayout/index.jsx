import React, { useState, useEffect , useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet , ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MediaList from '../../../../../Componets/Media'; 
import { LikeThumb, DisLikeThumb, Greeting } from '../../../../../Assets/Svg'; 
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import Animated, { useAnimatedStyle, interpolate, Extrapolate, useSharedValue, withTiming, runOnUI } from 'react-native-reanimated';
import axios from 'axios';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SearchSvg, BackSvg, BooksmarkSvg, ShareSvg , ColoredBookMark ,SwipeDown , SwipeRight , SwipeLeft} from '../../../../../Assets/Svg';
import SerachIcon from '../../../../../Componets/SerachIcon';
import CustomCarousel from '../../../../../Componets/CustomCarousal';

import { useDispatch , useSelector } from 'react-redux';
import { addToWishlist, } from '../../../../../Store/activitySlice';
import { useIsFocused } from '@react-navigation/native';
import { GreengrassV2 } from 'aws-sdk';

import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';


const SwipeableLayout = ({ mediaData , isActive, isUpcoming , guideStep , setHasSeenGuide }) => {
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const [showDislikeIcon, setShowDislikeIcon] = useState(false);
  const [followStatus, setFollowStatus] = useState('Follow');
  const [isPressed, setIsPressed] = useState(true);
  const [productImagesLength, setProductImagesLength] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeline, setTimeline] = useState(0);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isFocused = useIsFocused();
  // const [showWelcomeText, setShowWelcomeText] = useState(true);  
  const [currentGuideStep, setCurrentGuideStep] = useState(guideStep); 

  const [hasSeenGuide, setHasSeen] = useState(false);

  // console.log('check child',hasSeenGuide)

 
  const checkGuideStatus = async () => {

    const savedUserId = await AsyncStorage.getItem('userId');
    try {
      const userId = savedUserId; 
      const tutorialKey = `tutorial_${userId}`;
      const hasSeen = await AsyncStorage.getItem(tutorialKey);

      if (hasSeen === 'true') {
        setHasSeenGuide(true);
        setHasSeen(true)
      } else {
        setHasSeenGuide(false);
        setHasSeen(false)
      }
    } catch (error) {
      console.error('Error checking guide status:', error);
    }
  };


  useEffect(() => {
    checkGuideStatus();
  }, []);

 
  const completeGuide = async () => {

    const savedUserId = await AsyncStorage.getItem('userId');
    
    try {
      const userId = savedUserId; 
      const tutorialKey = `tutorial_${userId}`;
      await AsyncStorage.setItem(tutorialKey, 'true');
      setHasSeenGuide(true); 
    } catch (error) {
      console.error('Error saving guide status:', error);
    }
  };

  const handleProductImagesLength = (length) => {
    setProductImagesLength(length);
  };
  const handleCurrentIndex = (index) => {
    setCurrentIndex(index);
  };
  const handleTimeline = (progress) => {
    setTimeline(progress);
  };

  // useEffect(() => {
  //   if (showWelcomeText) {
  //     const timer = setTimeout(() => {
  //       setShowWelcomeText(false); 
  //     }, 3000);

  //     return () => clearTimeout(timer);  
  //   }
  // }, [showWelcomeText]);
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const welcomeTextShown = useRef(false);

  useEffect(() => {
    if (showWelcomeText && !welcomeTextShown.current) {
      welcomeTextShown.current = true; // Mark as shown
      const timer = setTimeout(() => {
        setShowWelcomeText(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showWelcomeText]);





  const handleWishList = async () => {
    if (!userId && !isAuthenticated) {
      console.error('User not authenticated');
      return;
    }

    const productId = mediaData.id;
    const savedUserId = await AsyncStorage.getItem('userId');


    axios.post('https://api.slayd.in/activity/activity/', {
      post_id: productId,
      user_id: savedUserId,
      action: 'save',
    })
    // console.log( productId,userId)
    .then(response => {
      console.log('Product liked successfully');
      dispatch(addToWishlist(mediaData));
      Toast.show({
        type: 'success',
        text1: 'Product Saved successfully',
        text2: 'Welcome to the app!',
        position: 'bottom',
      });
      setIsPressed(!isPressed);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Product Already added to saved',
        position: 'bottom',
      });
      console.error('Error posting wishlist action', error);
    });
  };

  // const publisher = mediaData.product?.brand || mediaData.tagged_products[0]?.product.brand || 'brand';
  const handleFollow = async () => {
    const data = {
      user_id: userId,
      publisher_type: 'brand',
      // publisher: publisher,
    };

    try {
      const response = await fetch('https://api.slayd.in/activity/follow/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      // Check if the response is successful
      if (response.ok) {
        const result = await response.json();
        console.log('Follow successful:', result);

        // Update the button text to "Following"
        setFollowStatus('Following');
      } else {
        console.log('Follow failed:', response.status);
      }
    } catch (error) {
      console.error('Error while following:', error);
    }
  };


  if (!mediaData) {
    return  <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
             <ActivityIndicator size="large" color="black" />
            </View>; 
  }
  const onShare = async () => {
    try {
      const shareOptions = {
        title: mediaData.product.name,
        message: 'Check out this amazing content!',
        url: mediaData.product.product_link, 
        subject: 'Amazing Content',  
      };

      const result = await Share.open(shareOptions);
      console.log('Shared successfully', result);
    } catch (error) {
      console.error('Error sharing content: ', error);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'info', 
      position: 'bottom',
      text1: 'Back Button disabled', 
    });
  };
  const showToastSerach = () => {
    Toast.show({
      type: 'info', 
      position: 'bottom',
      text1: 'Serach Button disabled', 
    });
  };

  


  const renderGuideContent = () => {
    if (hasSeenGuide) {
      
      return null;
    }
  
    if (showWelcomeText) {
      // Show welcome text for 1 second
      return (
        <View style={styles.overlay}>
          <View style={{alignItems:'center', gap:10}}>
            <Text style={{fontSize:54}}>👋</Text>
            <Text style={{color:'white', fontSize:25 , fontWeight:'700',textAlign:"center"}}>Welcome to Slayd</Text>
          </View>
        </View>
      );
    } else {
      // After welcome text, show swipe instruction based on guideStep
      switch (guideStep) {
        case 0:
          return (
            <View style={styles.overlay}>
              <View style={{alignItems:'center', gap:10}}>
                <SwipeRight />
                <Text style={{color:'white', fontSize:25 , fontWeight:'700',textAlign:"center"}}>Swipe right if you like something</Text>
              </View>
            </View>
          );
        case 1:
          return (
            <View style={styles.overlay}>
              <View style={{alignItems:'center',gap:10}}>
                <SwipeLeft />
                <Text style={{color:'white', fontSize:25 , fontWeight:'700',textAlign:"center"}}>Swipe left if you don’t like it</Text>
              </View>
            </View>
          );
        case 2:
          return (
            <View style={styles.overlay}>
              <View style={{alignItems:'center',gap:10}}>
                <SwipeDown />
                <Text style={{color:'white', fontSize:25 , fontWeight:'700',textAlign:"center"}}>Swipe down to see tagged and similar products</Text>
                <TouchableOpacity onPress={completeGuide} style={{paddingHorizontal:20, paddingVertical:10, backgroundColor:'white', borderRadius:26}}>
                  <Text style={{color:'black'}}>Completed</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        default:
          return null;
      }
    }
  };



  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log('Double tap detected in parent');
      // Alert.alert('Double Tap!', 'Parent component double tap detected.');
    });


    // const [isSingleTapDetected, setIsSingleTapDetected] = useState(false);
    // const tapTimeoutRef = useRef(null); // useRef for controlling time-sensitive logic
  
    // // Double Tap Gesture for the parent
    // const doubleTapGesture = Gesture.Tap()
    //   .numberOfTaps(2)
    //   .onEnd(() => {
    //     if (!isSingleTapDetected) {
    //       console.log('Double tap detected in parent');
    //       Alert.alert('Double Tap!', 'Parent component double tap detected.');
    //     }
    //   });
  
    // // Single Tap Gesture for resetting single-tap state in the parent
    // const singleTapGesture = Gesture.Tap().onEnd(() => {
    //   setIsSingleTapDetected(true); // Mark single tap detected
  
    //   // Reset single tap detection after a timeout to avoid conflict
    //   if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    //   tapTimeoutRef.current = setTimeout(() => {
    //     setIsSingleTapDetected(false); // Reset single tap state
    //   }, 300); // Adjust the timeout based on your use case
  
    //   console.log('Single tap detected in parent');
    // });

  
  

  

  return (
    <GestureHandlerRootView>
    <GestureDetector gesture={doubleTap}>
    <Animated.View style={[styles.container]}>
      <View style={styles.mediaContainer}>
        {/* {hasSeenGuide === 'false' && renderGuideContent()}\ */}
        {!hasSeenGuide && renderGuideContent()}
        {/* {renderGuideContent()} */}
        <Animated.View pointerEvents="box-none" style={[styles.media,]}>
          <MediaList
            post={mediaData}
            isActive={isActive}
            isUpcoming={isUpcoming}
            resize={'cover'}
            onProductImagesLength={handleProductImagesLength}
            onCurrentIndex={handleCurrentIndex}
            onTimeline={handleTimeline}
            isFocused={isFocused}
            style={{ flex: 1, backgroundColor: 'rgba(255, 0, 0, 0.4)',zIndex:500 }}
          />
        </Animated.View>

        <LinearGradient
          colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          pointerEvents="none"
        />

        <View pointerEvents="none" style={{ position: 'absolute', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: "row", paddingHorizontal: 20, paddingVertical: 20 }}>
          <Animated.View style={[{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: 10, borderRadius: 50 }]}>
            <TouchableOpacity onPress={showToast}>
              <Animated.View>
                <BackSvg width={20} height={20} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: 7, borderRadius: 50 }]}>
            <TouchableOpacity onPress={showToastSerach}>
              <Animated.View style={[]}>
                <SearchSvg width={25} height={25} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <View style={styles.carouselIndicatorContainer}>
        <Animated.View style={[styles.size]}>
          <CustomCarousel
            dataLength={productImagesLength}
            activeIndex={currentIndex}
            timeline={timeline}
          />
        </Animated.View>
      </View>

      <View pointerEvents="none" style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal:20, bottom: 0, position: "absolute", paddingVertical: 20, }}>
        <View style={{ gap: 5, justifyContent:"flex-end", width: '85%' }}>
          <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Animated.View style={[{ borderRadius: 50, overflow: 'hidden', height: 30, width: 30 }]}>
                <Image cover style={{ height: '100%', width: '100%' }} source={require('../../../../../Assets/Images/new.jpg')} />
              </Animated.View>
              <Animated.Text style={[{ fontWeight: 500, color: "white",fontSize:15, fontFamily: 'Poppins-Regular', }]}>
                {mediaData.product?.brand || mediaData.tagged_products[0]?.product.brand}
              </Animated.Text>
            </View>

            <TouchableOpacity onPress={handleFollow} style={[{ borderStyle: 'solid', borderWidth: 1, borderColor: 'white', borderRadius: 20, paddingBottom: 1, paddingHorizontal: 10 }]}>
              <Animated.Text style={[{ color: 'white' }]}>{followStatus}</Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          {mediaData.product ? (
            <Animated.Text style={[styles.text, {fontWeight:'600',fontFamily: 'Poppins-Regular',}]}>
              {mediaData.product.name}
            </Animated.Text>
          ): (null)}
          <View style={{flexDirection:'row',gap:5,alignItems:'baseline'}}>
            {mediaData.product ? (
              <View style={{flexDirection:'row',alignItems:'baseline'}}>
                <Text style={{
                  marginRight: 5,
                  fontSize: 20,
                  color: 'white',
                  fontWeight:'700'
                }}>
                  ₹{mediaData.product?.discount_price || mediaData.product?.price }
                </Text>

                {mediaData.product.discount_price ? (
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '400',textDecorationLine: 'line-through', }}>
                    ₹{mediaData.product.price}
                  </Text>
                ) : null}
              </View>

            ):(

              <View style={{flexDirection:'row',alignItems:'baseline'}}>
                <Text style={{
                  marginRight: 5,
                  fontSize: 20,
                  color: 'white',
                  fontWeight:'700'
                }}>
                  ₹{mediaData.tagged_products[0]?.product.discount_price ||  mediaData.tagged_products[0]?.product.price}
                </Text>


                {mediaData.tagged_products[0]?.product && mediaData.tagged_products[0].product.discount_price ? (
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '400',textDecorationLine: 'line-through', }}>
                    ₹{mediaData.tagged_products[0].product.price}
                  </Text>
                ) : null}

              </View>
              
            )}

            {/* <Text
               
            >
              ₹{mediaData.product?.price || mediaData.tagged_products[0]?.product.price || "" }
            </Text>
                                    
            <Text
              style={{
                textDecorationLine: 'line-through',
                // marginRight: 5,
                fontSize: 12,
                color: 'white',
                fontWeight:'600',
              }}
            >
              ₹{mediaData.product?.price || mediaData.tagged_products[0]?.product.price || "" }
            </Text> */}

          </View>
        </View>

        <View style={{ gap: 18,}}>
          <Animated.View style={[{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: 10, borderRadius: 50 }]}>
            <TouchableOpacity onPress={handleWishList}>
              <Animated.View style={[]}>
                {isPressed ? (
                  <BooksmarkSvg width={20} height={20} />
                ) : (
                  <ColoredBookMark width={20} height={20} />
                )}
                {/* <BooksmarkSvg width={20} height={20} /> */}
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: 10, borderRadius: 50 }]}>
            <TouchableOpacity onPress={onShare}>
              <Animated.View style={[]}>
                <ShareSvg width={20} height={20}  />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
    </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    position: 'relative',
  },
  media: {
    flex: 1,
    backgroundColor: 'white',
    height:'100%'
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
  },
  iconLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  overlayIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  carouselIndicatorContainer: {
    position: 'absolute',
    top: 20,
    width:'100%',
    paddingHorizontal:10,
    alignItems:'center'
  },
  size: {
    backgroundColor: '#08092880',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 12,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  ibottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconBottom: {
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  overlay: {
    zIndex:1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap:15
  },
});

export default SwipeableLayout;
