import React, { useState, useRef , useEffect , useCallback } from 'react';
import { View, ScrollView, Text, Dimensions , TouchableOpacity , StyleSheet , Image, ActivityIndicator } from 'react-native';
import AWS from 'aws-sdk';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import Animated, { useDerivedValue, runOnJS } from 'react-native-reanimated';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,  
  useAnimatedRef,
  runOnJS,
  useDerivedValue,
  useAnimatedReaction
} from 'react-native-reanimated';
import { debounce } from 'lodash';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { Waypoint } from 'react-waypoint';

import { useInView } from "react-intersection-observer";

AWS.config.update({
  accessKeyId: 'AKIA2YICAAKWC6GILFFB',
  secretAccessKey: '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',
  region: 'ap-south-1',
});
const s3 = new AWS.S3();

const { height:screenHeight } = Dimensions.get('window');
// const { screenHeight } = Dimensions.get('window').height;

const SimilarProducts = React.memo(({scrollY ,similarProducts , loading}) => {
  // const [similarProducts, setSimilarProductData] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [presignedUrls, setPresignedUrls] = useState({});
  const currentMediaId = useSelector((state) => state.media.currentMediaId);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const[value , setvalue] = useState(0)


  



  

  const throttleThreshold = 10; 
  const lastLoggedValue = useRef(0);

  const derivedScrollY = useDerivedValue(() => {
    if (Math.abs(scrollY.value - lastLoggedValue.current) > throttleThreshold) {
      console.log('check in SP', scrollY.value);
      lastLoggedValue.current = scrollY.value;
      runOnJS(setvalue)(scrollY.value);
    }
    return scrollY.value;
  });


  // console.log('check in SP', value);




    

    // console.log("checkkkkk",derivedScrollY)


  // const fetchSimilarProducts = async () => {
  //   if (!currentMediaId || loading || !hasMore) return;

  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.slayd.in/api/posts/${currentMediaId}/similar-posts/?page=${page}`
  //     );

  //     if (response.data && Array.isArray(response.data.results)) {
  //       setSimilarProductData((prevData) => [...prevData, ...response.data.results]);
  //       setHasMore(response.data.results.length > 0);
  //       setPage((prevPage) => prevPage + 1); // Increment the page number
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Use effect to reset when currentMediaId changes
  // useEffect(() => {
  //   if (currentMediaId) {
  //     setPage(1);
  //     setSimilarProductData([]);
  //     setHasMore(true);
  //     fetchSimilarProducts();
  //   }
  // }, [currentMediaId]);

  // // Expose fetchSimilarProducts to the parent
  // useImperativeHandle(ref, () => ({
  //   fetchSimilarProducts,
  // }));
  // useEffect(() => {
  //   const fetchPresignedUrls = async () => { 
  //     const urls = {};
  //     for (const item of similarProducts) {
  //       const postType = item.post_type;
  //       let objectKey;

  //       if (postType === 'PRODUCT_POST') {
  //         const imageKey = item.product?.image_url;
  //         objectKey = imageKey.split('/').slice(-2).join('/');
  //       } else if (postType === 'TAGGED_POST') {
  //         const videoKey = item.media[0].url;
  //         objectKey = videoKey.split('/').slice(-2).join('/').replace(/\+/g, ' ').replace(/%26/g, '&');
  //       }

  //       if (objectKey) {
  //         const params = {
  //           Bucket: 'feed-images-01',
  //           Key: objectKey,
  //           Expires: 60,
  //         };

  //         try {
  //           const presignedUrl = await s3.getSignedUrlPromise('getObject', params);
  //           urls[item.id] = presignedUrl;
  //         } catch (err) {
  //           console.error(`Error generating presigned URL for Item ID: ${item.id}`, err.message);
  //         }
  //       }
  //     }
  //     setPresignedUrls(urls);
  //   };

  //   if (similarProducts.length > 0) {
  //     fetchPresignedUrls();
  //   }
  // }, [similarProducts]);




  

  // Use scroll listener to handle video visibility on scroll
  // const handleScroll = () => {
  //   checkVideoVisibility();
  // };



  // const handleScroll = (event) => {
  //   const scrollY = event.nativeEvent.contentOffset.y;
  //   console.log('Scroll Y:', scrollY);
  // };


  

  const handlePress = (item) => {
    navigation.push('ProductDetails', { product: item , source:'SimilarProduct' });
  };

  
  const handlePress1 = (item) => {
    navigation.push('ProductDetails', { product:item , source:'HomeComponent'  });
  };
  

  const columnOne = [];
  const columnTwo = [];
  const imageHeights = [200, 230, 260, 240, 250, 190];


  const [activeVideoId, setActiveVideoId] = useState(null);
  // const scrollY = useSharedValue(0);
  const windowHeight = Dimensions.get('window').height;
  const viewportCenter = windowHeight / 2;
  const range = 150;


  const isWithinRange = (videoPosition, viewportCenter, range) => {
    const videoTop = videoPosition.top;
    const videoBottom = videoTop + videoPosition.height;

    const viewportTop = viewportCenter - range;
    const viewportBottom = viewportCenter + range;

    return (
      (videoTop >= viewportTop && videoTop <= viewportBottom) ||
      (videoBottom >= viewportTop && videoBottom <= viewportBottom) ||
      (videoTop <= viewportTop && videoBottom >= viewportBottom)
    );
  };

  useEffect(() => {
    const checkVideosInRange = () => {
      similarProducts.forEach((item, index) => {
        const uniqueVideoId = `${item.id}-${index}`; 
        const videoElement = videoRefs.current[uniqueVideoId];

        if (videoElement) {
          videoElement.measure((x, y, width, height, pageX, pageY) => {
            const videoPosition = { top: pageY, height };
            if (isWithinRange(videoPosition, viewportCenter, range)) {
              console.log(`Video ID within range: ${uniqueVideoId}`);

              if (activeVideoId !== uniqueVideoId) {
                setActiveVideoId(uniqueVideoId);
              }
            } else {
              if (activeVideoId === uniqueVideoId) {
                setActiveVideoId(null);
              }
            }
          });
        }
      });
    };
    checkVideosInRange();
  }, [value, similarProducts,activeVideoId]);

  const videoRefs = useRef({});

  
  
  
 

  similarProducts && similarProducts.length > 0 && similarProducts.map((item, index) =>  {
    const imageHeight = imageHeights[index % imageHeights.length];
    const mediaSource = presignedUrls[item.id];
    const ispaused = activeVideoId !== uniqueVideoId
    // console.log('check',ispaused)
    // const isPlaying = currentPlaying === item.id;

    const uniqueVideoId = `${item.id}-${index}`;

    const productItem = (
      <View style={styles.productContainer} key={uniqueVideoId}>
        <TouchableOpacity>
          <View style={styles.mediaContainer}>
            {item.post_type === 'PRODUCT_POST' ? (
              <TouchableOpacity onPress={() => handlePress1(item)}>
              <Image
                source={{ uri: item.product.image_url }}
                style={{
                  width: '100%',
                  height: imageHeight,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View
                  style={{
                    height: screenHeight * 0.36,
                    width:'100%',
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                  ref={(ref) => (videoRefs.current[uniqueVideoId] = ref)} 
                  
                >
                  <Video
                    source={{ uri: item.media[0].url }}
                    style={{ height: '100%' , width:"100%"}}
                    repeat={true}
                    controls={false} 
                    paused = {activeVideoId !== uniqueVideoId}
                    
                    muted
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.prize}>
            {item.product? (
              <View style={{}}>
                {item.product?.discount_price != null ? (
                  <View style={{flexDirection:'row',gap:5, alignItems:'baseline'}}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#080928' }}>
                      ₹{item.product.discount_price}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        marginRight: 5,
                        fontSize: 14,
                        color: '#71738A',
                        fontWeight:'400'
                      }}
                    >
                      ₹{item.product.price}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#080928' }}>
                    ₹{item.product.price}
                  </Text>
                )}
                <Text style={styles.name}>{item.product.brand}</Text>
                <Text numberOfLines={1}  style={styles.name}>{item.product.name}</Text>
              </View>
            ):(
              <>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '600' }}>
                      ₹{item.tagged_products[0].product.discount_price || item.tagged_products[0].product.price}
                  </Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{item.tagged_products[0].product.brand}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );

    if (index % 2 === 0) {
      columnOne.push(productItem);
    } else {
      columnTwo.push(productItem);
    }
  });

  return (
    <View style={{ flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={6}
        // onScroll={onScroll}
      >
       <View style={styles.listContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>Similar Products</Text>
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.column}>{columnOne}</View>
          <View style={styles.column}>{columnTwo}</View>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </View>
  );
},

(prevProps, nextProps) => {
  return (
    prevProps.scrollY === nextProps.scrollY &&
    prevProps.similarProducts === nextProps.similarProducts &&
    prevProps.loading === nextProps.loading
  );
}

);

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
    paddingHorizontal: 10,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 10,
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
  name: {
    color: '#777',
  },
});
export default SimilarProducts;