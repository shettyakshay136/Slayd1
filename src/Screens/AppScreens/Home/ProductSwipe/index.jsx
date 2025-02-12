import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { View, StyleSheet, Dimensions, PanResponder , TouchableWithoutFeedback, TouchableOpacity , Pressable , ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ProductLayout from './ProductLayout';
import Products from '../Products';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, Easing, interpolate, Extrapolate , withTiming , useDerivedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { LikeThumb, DisLikeThumb } from '../../../../Assets/Svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { addToLiked } from '../../../../Store/activitySlice';
import { setCurrentMediaId } from '../../../../Store/mediaSlice';
import { setScrolledBelow30 } from '../../../../Store/scrollySlice'; 

const { width, height: screenheight } = Dimensions.get('window');
const aspectRatio = screenheight / width;

const SwipeableCards = ({ scrollY ,setScrollEnabled ,toggleScrollEnabled }) => {
  const [isScrollingVertically, setIsScrollingVertically] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const translateXLeftView = useSharedValue(-width);
  const translateXRightView = useSharedValue(width);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  // console.log("check",hasSeenGuide)

  const handleGuideStatusChange = (status) => {
    setHasSeenGuide(status);
  };



  const [guideStep, setGuideStep] = useState(0); 

  // console.log("guidestep Parent",guideStep)

  const handleStepChange = () => {
    setGuideStep(guideStep + 1);
  };



  const [page, setPage] = useState(1);


  // console.log("index",currentIndex)


  const isScrolledBelow30 = useSelector((state) => state.scroll.isScrolledBelow30);

  const derivedScrollY = useDerivedValue(() => {
    return scrollY.value;
  });

  // console.log("scrollvaluse",scrollY.value)

  


  // useEffect(() => {
  //   if (derivedScrollY.value > 150) {
  //     console.log('true')
  //     dispatch(setScrolledBelow30(true));
  //   } else if (derivedScrollY.value <= 150) {
  //     console.log('false')
  //     dispatch(setScrolledBelow30(false));
  //   }
  // }, [ derivedScrollY.value,dispatch, isScrolledBelow30]);
  

  const userId = useSelector((state) => state.auth.userId);


  console.log(userId)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);







  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.slayd.in/api/ranked_posts/?request_size=10&page=${page}`);
      if (Array.isArray(response.data)) {
        setMediaData((prevData) => [...prevData, ...response.data]); 
        setPage((prevPage) => prevPage + 1); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPosts();
  }, []);


  useEffect(() => {
    if (mediaData && mediaData[currentIndex]) {
      const currentId = mediaData[currentIndex].id; 
      dispatch(setCurrentMediaId(currentId)); 
    }
  }, [dispatch, currentIndex, mediaData]);

  const onSwiped = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % mediaData.length;
  
      // Check if the user is swiping the 9th card (index 8)
      if (newIndex === mediaData.length - 2 && !loading) {
        fetchPosts(); // Trigger data fetch
      }
  
      return newIndex;
    });
  
    // Animations for card swipe
    setTimeout(() => {
      translateXLeftView.value = withTiming(-width, { duration: 300 });
      translateXRightView.value = withTiming(width, { duration: 200 });
    }, 50);
  };
  
  const onSwipeIncomplete = () => {
    translateXLeftView.value = withSpring(-width, { stiffness: 200 });
    translateXRightView.value = withSpring(width, { stiffness: 200 });
  };


  const onSwipedLeft = () => {
    setGuideStep(guideStep + 1)
  }
  const onSwipedRight = async () =>  {

    setGuideStep(guideStep + 1)
    if (!userId && !isAuthenticated) {
      console.error('User not authenticated');
      return;
    }


 
  
  
    const productId = mediaData[currentIndex]?.id;
  
    if (!productId) {
      console.error('Product ID is missing');
      return;
    }


    const savedUserId = await AsyncStorage.getItem('userId');
  
    const payload = {
      post_id: productId,
      user_id: savedUserId,
      action: 'like',
    };
  
    console.log("Payload:", payload);
  
    axios.post('https://api.slayd.in/activity/activity/', payload)
      .then(response => {
        console.log('Product liked successfully', response.data);
      })
      .catch(error => {
        console.error('Error posting like action', error.response?.data || error.message);
      });
  
    setTimeout(() => {}, 1500);
  };
  

  const animatedContainerHeightStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 80], [0.81 * screenheight, 0.72 * screenheight], Extrapolate.CLAMP);
    const marginTop = interpolate(scrollY.value, [0, 80], [0, 60], Extrapolate.CLAMP);
    return { height, marginTop };
  });

  const animatedHeightStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 80], [0.783 * screenheight, 0.69  * screenheight], Extrapolate.CLAMP);
    return { height };
  });



  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const verticalThreshold = 5;
      const horizontalThreshold = 5;

      // Horizontal swipe
      if (Math.abs(gestureState.dx) > horizontalThreshold && Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
        toggleScrollEnabled(false); // Disable vertical scroll
        return false; // Prevent parent scrolling
      } 
      // Vertical swipe
      else if (Math.abs(gestureState.dy) > verticalThreshold) {
        toggleScrollEnabled(true); // Enable vertical scroll
        return true; // Allow parent scrolling
      }
      return false;
    },
    onPanResponderRelease: () => {
      toggleScrollEnabled(true); // Reset scroll to enabled
    },
    onPanResponderTerminate: () => {
      toggleScrollEnabled(true); // Ensure scroll is enabled on termination
    },
  });
  
  


  const handleSwipeLeftStart = () => {
    translateXLeftView.value = withTiming(120, { duration: 150 }); 
  };
  const handleSwipeRightStart = () => {
    translateXRightView.value = withTiming(120, { duration: 150 }); 
  };

  const handleSwiping = (x) => {
    if (x < 0) {
      handleSwipeLeftStart()
    } else if (x > 0) {
      handleSwipeRightStart()
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXLeftView.value }],
  }));

  const animatedRightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXRightView.value }],
  }));

  if (!mediaData) {
    return  <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
             <ActivityIndicator size="large" color="black" />
            </View>; 
  }


  // useEffect(() => {
  //   if (guideStep === 0) {
  //     const timer = setTimeout(() => {
  //       setGuideStep(guideStep + 1); 
  //     }, 1000); 
  //     return () => clearTimeout(timer); 
  //   }
  // }, [guideStep]);


  // console.log('checkguide',guideStep)




  
  

  return (
    <View {...panResponder.panHandlers}>
      <Animated.View style={[animatedContainerHeightStyle]}>
        <Swiper
          cards={mediaData}
          renderCard={(card, index) => {
            const isActive = index === currentIndex;
            const isUpcoming = index === currentIndex + 1;

            return (
              <Animated.View style={[animatedHeightStyle]}>
                <Pressable style={[styles.cardContainer]}>
                  <ProductLayout mediaData={card} isActive={isActive} isUpcoming={isUpcoming} guideStep={guideStep} onStepChange={handleStepChange} setHasSeenGuide={handleGuideStatusChange} />
                </Pressable>
              </Animated.View>
            );
          }}
          onSwiped={onSwiped}
          onSwipedAll={() => console.log('All cards swiped')}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={2}
          visibleCardsCount={2}
          stackSeparation={0} 
          showSecondCard={true}
          verticalSwipe={false} 
          // stackSeparation={0}
          inputRotationRange={[-width / 2, 0, width / 2]}
          outputRotationRange={['-20deg', '0deg', '20deg']}
          infinite
          disableTopSwipe={true}
          horizontalThreshold={width * 0.10}
          verticalThreshold={width * 50}
          // onTapCard={() => onTapCard(mediaData[currentIndex])}S
          onSwipedRight={onSwipedRight}
          onSwipedAborted={onSwipeIncomplete}
          onSwipedLeft={onSwipedLeft}
          disableLeftSwipe={!hasSeenGuide ? guideStep === 0 : false}
          disableRightSwipe={!hasSeenGuide ? guideStep === 1 : false}
          
          onSwiping={(x) => handleSwiping(x)}
          horizontalSwipe={isScrollingVertically ? false : true}
        />
      </Animated.View>

      <View style={styles.productsContainer}>
        {mediaData.length > 0 && <Products data={mediaData[currentIndex]} />}
      </View>

      <Animated.View style={[styles.overlayIconContainer,animatedRightStyle ]}>
        <LikeThumb fill={'green'} />
      </Animated.View>

<     Animated.View style={[styles.overlayIconContainer, animatedStyle]}>
        <DisLikeThumb />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    top: -50,
    borderRadius: 24,
    borderColor: 'white',
    borderWidth: 4,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor:'white'
  },
  overlayIconContainer: {
    position: 'absolute',
    top: '35%',
    
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ translateX: -500 }],
  },
  productsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: '#F4F5FA',
    borderBottomWidth: 1.5,
  },
});

export default SwipeableCards;
