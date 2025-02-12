import { View, StatusBar, SafeAreaView, Platform , Text ,Button ,StyleSheet } from 'react-native';
import React, { useState, useEffect,useRef, useCallback , useMemo } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './style.js';
import CustomHeader from '../../../Componets/Customheader';
import Filter from '../../../Componets/Filter';
import ProductSwipe from './ProductSwipe/index.jsx';
import SimilarProduct from './SimilarProducts/index.jsx';
import { categories } from '../../../../Data';
import { setScrolledBelow30 } from '../../../Store/scrollySlice.js';
import { useDispatch , useSelector} from 'react-redux';
import SimilarProducts from './SimilarProducts/index.jsx';
import axios from 'axios';

import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const Index = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const scrollY = useSharedValue(0);
  const previousOffset = useSharedValue(0);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  
  const childRef = useRef();

  const currentMediaId = useSelector((state) => state.media.currentMediaId);


  const [scrollEnabled, setScrollEnabled] = useState(true);

  const scrollEnabledRef = useRef(true);

  const toggleScrollEnabled = (enabled) => {
    scrollEnabledRef.current = enabled; // Update ref immediately
    setScrollEnabled(enabled); // Update state for re-render
  };

  // console.log("log tej dqta ",scrollEnabled)

  useEffect(() => {
    // Ensure re-render after state change
    setScrollEnabled(true); // Force scroll to be enabled when necessary
  }, [scrollEnabled]);

  console.log('check',scrollY.value)


  const [similarProducts, setSimilarProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // console.log('page number',page)


  const fetchSimilarProducts = useCallback(async () => {
    if (!currentMediaId || loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.slayd.in/api/posts/${currentMediaId}/similar-posts/?page=${page}`
      );

      if (response.data && Array.isArray(response.data.results)) {
        setSimilarProductData((prevData) => [...prevData, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
        setPage((prevPage) => prevPage + 1); 
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  });

    useEffect(() => {
      if (currentMediaId) {
        setPage(1);
        setSimilarProductData([]);
        setHasMore(true);
        fetchSimilarProducts();
      }
    }, [currentMediaId]);



    const derivedScrollY = useDerivedValue(() => {
      return scrollY.value; // Ensure continuous updates
    }, [scrollY]);


  // console.log("scrolly main",scrollY)

  const isScrolledBelow30 = useSelector((state) => state.scroll.isScrolledBelow30);

  // useEffect(() => {
  //     if (scrollY.value > 150) {
  //       console.log('true')
  //       dispatch(setScrolledBelow30(true));
  //     } else if (scrollY.value <= 170) {
  //       console.log('beelow 130 false ')
  //       dispatch(setScrolledBelow30(false));
  //     }
  //   }, [scrollY.value,dispatch, isScrolledBelow30]);




  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#f0f0f0');
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  useEffect(() => {
    if (isHeaderVisible) {
      StatusBar.setBackgroundColor('white');
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBackgroundColor('#f0f0f0');
      StatusBar.setBarStyle('dark-content');
    }
  }, [isHeaderVisible]);

  let hasReachedBottom = false;

  const handleScroll = (currentOffset, previousOffset, dispatch) => {
    if (currentOffset > 150 && currentOffset > previousOffset.value) {
      // console.log('Scrolled above 150');
      runOnJS(() => dispatch(setScrolledBelow30(true)))();
    } else if (currentOffset < 150 && currentOffset > previousOffset.value) {
      // console.log('Below 150, set false');
      runOnJS(() => dispatch(setScrolledBelow30(false)))();
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;
      const layoutHeight = event.layoutMeasurement.height;
      const contentHeight = event.contentSize.height;
  
      scrollY.value = currentOffset;

      runOnJS(handleScroll)(currentOffset, previousOffset, dispatch);
  
      if (currentOffset + layoutHeight >= contentHeight - 20 && !loading && hasMore) {
        // if (!hasReachedBottom) {
        //   console.log("Reached bottom");
        //   hasReachedBottom = true; 
          runOnJS(fetchSimilarProducts)(); 
        // }
      } else {
        if (hasReachedBottom) {
          hasReachedBottom = false;
        }
      }

      if (currentOffset > 250 && currentOffset > previousOffset.value) {
        runOnJS(setHeaderVisible)(true);
      } else if (currentOffset < previousOffset.value) {
        runOnJS(setHeaderVisible)(false);
      }
  
      previousOffset.value = currentOffset;
    },
  });



  console.log('scroll',derivedScrollY.value)
  



  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(isHeaderVisible ? 0 : -100, { duration: 500 }),
      },
    ],
  }));

  const bottomSheetRef = useRef(null);

  const handleFilterSelection = useCallback((option) => {
    // setSelectedCategory(option);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const bottomSheetModalRef = useRef(null);
  
  // Memoize snap points for optimization
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
    setModalVisible(true);
    // setIsVisible(true)
  };

  const handleDismissModal = () => {
    bottomSheetModalRef.current?.dismiss(); 
    setSelectedCategory();
    setModalVisible(false);
  };

  // console.log(selectedCategory)

  const backgroundColor = isHeaderVisible ? 'white' : '#f0f0f0';

  return (
    <View style={{ flex: 1, }}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            height: StatusBar.currentHeight || 60,
            backgroundColor,
          }}
        />
      )}
      {isModalVisible && <View style={styles.overlay} />}
      <SafeAreaView style={{ flex: 1 , }}>
        <Animated.View style={[{ zIndex: 400 }, animatedHeaderStyle]}>
          <CustomHeader isVisible={isHeaderVisible} />
        </Animated.View>
        <View style={[styles.container]}>
          <Animated.ScrollView
            style={styles.scrollView}
            onScroll={scrollHandler}
            scrollEventThrottle={20}
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            // nestedScrollEnabled={false}
          >
            <View style={[styles.contentContainer]}>
              <View style={styles.filter}>
                <Filter
                  options={categories}
                  selectedOption={selectedCategory}
                  onPress={handleFilterSelection}
                  borderColor="#000000"
                  onOptionSelect={handlePresentModal}
                />
              </View>
              <View>
                <ProductSwipe scrollY={derivedScrollY} toggleScrollEnabled={toggleScrollEnabled}/>
              </View>
              <View style={styles.Brand}>
                <SimilarProduct scrollY={derivedScrollY}  similarProducts={similarProducts} loading={loading} />
                
              </View>
            </View>
          </Animated.ScrollView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1} 
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            
          >
            <BottomSheetView style={{borderTopLeftRadius:12}}> 
              <Text style={styles.text}>Sub category here</Text>
              <Button title="Close" onPress={handleDismissModal} />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </SafeAreaView>
    </View>
  );
};



export default Index;
