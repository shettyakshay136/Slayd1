import React , {useState , useRef , useEffect, useCallback } from 'react';
import { View, Text, Image , StatusBar , TouchableOpacity , StyleSheet , Dimensions , ScrollView , Modal , TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useDerivedValue
} from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BackSvg, SearchSvg, LikeThumb, RightArrow, BooksmarkSvg , DisLikeThumb, ShareSvg, LeftArrowSvg ,ColoredBookMark } from '../../../../Assets/Svg';
import MediaHome from '../../../../Componets/MediaHome'
import MediaList from '../../../../Componets/Media';
import SimilarProducts from '../SimilarProducts';
import Products from '../Products'
import ImageModal from './Modal'; 
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import { useIsFocused  } from '@react-navigation/native';

import AWS from 'aws-sdk';
import { useNavigation } from '@react-navigation/native';
import { useProductContext ,ProductProvider } from './ProductContext';
import { useInfiniteQuery } from '@tanstack/react-query';




const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');




const App = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product , source } = route.params;
  const { productData, setSimilarProducts } = useProductContext();
  const similarProducts1 = productData[product.id] || [];



  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLength, setMediaLength] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(true);
  const [presignedUrls, setPresignedUrls] = useState([]);
  // const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [similarProducts, setSimilarProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrolly, setScrolly] = useState(0);


  const userId = useSelector(state => state.auth.userId);


  
 





  // const fetchSimilarProducts = useCallback(async () => {

    
  //   if (loading || !hasMore ) return;

  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.slayd.in/api/posts/${product.id}/similar-posts/?page=${pageParam}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching similar products:', error.response?.data || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [loading, hasMore, product.id, productData, setSimilarProducts, similarProducts]);


  const fetchSimilarProducts = useCallback(async ({ pageParam = 1, productId }) => {
    if (!productId) return;
    
    try {
      const response = await axios.get(
        `https://api.slayd.in/api/posts/${productId}/similar-posts/?page=${pageParam}`
      );
      return response.data; // Assuming response.data contains the pagination data
    } catch (error) {
      console.error('Error fetching similar products:', error.response?.data || error.message);
      throw new Error('Error fetching similar products');
    }
  }, []);


  console.log('check product id',product.id)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    pageParam = 1, 
  } = useInfiniteQuery(
    {
      queryKey: ['similar-products', product.id], 
      queryFn: ({ pageParam = 1 }) => fetchSimilarProducts({ pageParam, productId: product.id }), 
      getNextPageParam: (lastPage, pages) => {
        return lastPage.results.length ? pages.length + 1 : undefined; 
      },
      keepPreviousData: true, 
      staleTime: 1000 * 60 * 5, 
    }
  );

  const similarProducts2 = data?.pages.flatMap((page) => page.results) || [];

  const handleScroll = useCallback(
    (event) => {
      const nativeEvent = event.nativeEvent;
      if (nativeEvent && nativeEvent.contentOffset) {
        const offsetY = nativeEvent.contentOffset.y;
        const contentHeight = nativeEvent.contentSize.height;
        const layoutHeight = nativeEvent.layoutMeasurement.height;
        setScrolly(offsetY);

        if (offsetY + layoutHeight >= contentHeight - 20 && !loading && hasMore) {
          fetchNextPage();
        }
      }
    },
    [loading, hasMore, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (product.id) {
      if (!similarProducts.length) {
        fetchNextPage(); // Trigger the initial fetch for similar products
        setPage(1); // Reset to page 1
      }
    }
  }, [product.id, similarProducts, fetchNextPage]);






  const openUrl = async () => {
    try {
      if (InAppBrowser) {
        const link = product?.product?.product_link;
        
        if (link) {
          await InAppBrowser.open(link, {
            toolbarColor: 'white',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
          });
        } else {
          console.log('No link available for this product');
        }
      } else {
        console.log('InAppBrowser is not available');
      }
    } catch (error) {
      console.error('Error opening in-app browser: ', error);
    }
  };


  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const handleToggleTexthide = () => {
    setIsExpanded(false);
  };
  const handleImagePress = () => {
    setModalVisible(true);
  };
  const handleSwipeLeft = () => {
    // animateSwipe(-500);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);

    console.log('swipe left')
  };

  const handleSwipeRight = () => {
    // animateSwipe(500);
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + productImages.length) % productImages.length
    );
  
    console.log('right')
  };

  const productImages =
    source === 'HomeComponent'
      ? (product.product
          ? [product.product.image_url, ...(product.product.secondary_images || [])]
          : []
        )
        .concat(
          product.tagged_products && product.tagged_products[0]
            ? [product.tagged_products[0].product.image_url, ...(product.tagged_products[0].product.secondary_images || [])]
            : []
        )
      : [product.media[0]?.url];


      console.log('check url product images',productImages)



    useEffect(() => {
      if (modalVisible) {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('white');
        }
        StatusBar.setBarStyle('dark-content');
      } else {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.01)');
        }
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.01)');
      }
    }, [modalVisible]);

    // const handleWishList1 = async () => {
    //   if (!userId && !isAuthenticated) {
    //     console.error('User not authenticated');
    //     return;
    //   }
  
    //   const productId = product.id;
    //   const savedUserId = await AsyncStorage.getItem('userId');
  
  
    //   axios.post('https://api.slayd.in/activity/activity/', {
    //     post_id: productId,
    //     user_id: savedUserId,
    //     action: 'save',
    //   })
    //   // console.log( productId,userId)
    //   .then(response => {
    //     console.log('Product liked successfully');
    //     dispatch(addToWishlist(mediaData));
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Product Saved successfully',
    //       text2: 'Welcome to the app!',
    //       position: 'bottom',
    //     });
    //     setIsPressed(!isPressed);
    //   })
    //   .catch(error => {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Product Already added to saved',
    //       position: 'bottom',
    //     });
    //     console.error('Error posting wishlist action', error);
    //   });
    // };

    const handleWishList  = async () => {
      
  
      const productId = product.id;

      const savedUserId = await AsyncStorage.getItem('userId');


      console.log(productId, savedUserId)
  
  
      axios.post('https://api.slayd.in/activity/activity/', {
        post_id: productId,
        user_id: savedUserId,
        action: 'save',
      })
      .then(response => {
        console.log('Product liked successfully');
        // dispatch(addToWishlist(mediaData));
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
          // text2: 'Welcome to the app!',
        });
        console.error('Error posting like action', error);
      });
    };


    const handleATC  = async () => {
      
  
      const productId = product.id;

      const savedUserId = await AsyncStorage.getItem('userId');


      console.log(productId, savedUserId)
  
  
      axios.post('https://api.slayd.in/activity/activity/', {
        post_id: productId,
        user_id: savedUserId,
        action: "wishlist",
      })
      .then(response => {
        console.log('Product liked successfully');
        // dispatch(addToWishlist(mediaData));
        Toast.show({
          type: 'success',
          text1: 'Product Saved successfully',
          text2: 'Welcome to the app!',
          position: 'bottom',
        });
        // setIsPressed(!isPressed);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Product Already added to saved',
          position: 'bottom',
          // text2: 'Welcome to the app!',
        });
        console.error('Error posting like action', error);
      });
    };

    // const handleATC = async () => {
    //   // if (!userId && !isAuthenticated) {
    //   //   console.error('User not authenticated');
    //   //   return;
    //   // }
  
    //   const productId = product.id;
    //   const savedUserId = await AsyncStorage.getItem('userId');
  
  
    //   axios.post('https://api.slayd.in/activity/activity/', {
    //     post_id: productId,
    //     user_id: savedUserId,
    //     action: 'wishlist',
    //   })
    //   // console.log( productId,userId)
    //   .then(response => {
    //     console.log('Product liked successfully');
    //     dispatch(addToWishlist(mediaData));
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Product Saved successfully',
    //       text2: 'Welcome to the app!',
    //       position: 'bottom',
    //     });
    //     setIsPressed(!isPressed);
    //   })
    //   .catch(error => {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Product Already added to saved',
    //       position: 'bottom',
    //     });
    //     console.error('Error posting wishlist action', error);
    //   });
    // };
    
    
    useEffect(() => {
      // Configure AWS
      AWS.config.update({
        accessKeyId: 'AKIA2YICAAKWC6GILFFB',
        secretAccessKey: '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',
        region: 'ap-south-1',
      });
  
      const s3 = new AWS.S3();
      const bucketName = 'feed-images-01';
  
      const fetchPresignedUrls = async () => {
        const urls = await Promise.all(
          productImages.map((url) => {
            const objectKey = source === 'HomeComponent'
            ? url.split('/').slice(-2).join('/')
            : url.split('/')
            .slice(-2)
            .join('/')
            .replace(/\+/g, ' ')
            .replace(/%26/g, '&');
            const params = {
              Bucket: bucketName,
              Key: objectKey,
              Expires: 60, 
            };
            return new Promise((resolve, reject) => {
              s3.getSignedUrl('getObject', params, (err, presignedUrl) => {
                if (err) {
                  console.log('Error generating presigned URL', err);
                  reject(err);
                } else {
                  resolve(presignedUrl);
                }
              });
            });
          })
        );
        setPresignedUrls(urls);
        setLoading(false);
      };
  
      fetchPresignedUrls();
    }, []);

    const onShare = async () => {
      try {
        const shareOptions = {
          title: product.product?.name || product.tagged_products[0].product.name,
          message: 'Check out this amazing content!',
          url: product.product.product_link || product.tagged_products[0].product.product_link, 
          subject: 'Amazing Content',  
        };
  
        const result = await Share.open(shareOptions);
        console.log('Shared successfully', result);
      } catch (error) {
        console.error('Error sharing content: ', error);
      }
    };

    const aspectRatio = source === 'HomeComponent' ? 0.7 : 1.0;




    // const imageSource = product. === 'PRODUCT_POST' 
    // ? { uri: presignedUrls } 
    // : { uri: product.media[0]?.url };





    console.log('check product data in pdp',product)



    console.log('check typw in pdp' , product.post_type)



  


   

    


    

  return (
    <>
    <View style={{justifyContent:'space-between' , display:'flex' , width:'100%' , flexDirection:'row',paddingHorizontal:20 ,position: 'absolute', top: 80,left: 0,right: 0, zIndex:1}}>
              <View style={[styles.iconLeft,]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={[]}>
                      <LeftArrowSvg fill={'black'}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.iconLeft,]}>
                  <TouchableOpacity>
                  <View style={[]}>
                      <SearchSvg width={23} height={23}/>
                  </View>
                  </TouchableOpacity>
              </View>
            </View>
    <Animated.ScrollView showsVerticalScrollIndicator={false}  scrollEventThrottle={16}
    onScroll={handleScroll}>
      <StatusBar translucent />
      {/* {Platform.OS === 'ios' && (
        <View
          style={[
            styles.statusBarBackground,
            { backgroundColor: modalVisible ? 'white' : 'transparent' },
          ]}
        />
      )} */}
      <SafeAreaView>
      <View style={styles.container}>
        <GestureRecognizer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        style={{height:'100%'}}
        > 
        <View style={styles.mediaContainer}>
          <TouchableOpacity style={styles.mediaContainer}>
            <View
              style={[
                  styles.media,
                  // { transform: [{ translateX: translateXAnim }] }
              ]}
              >  
              <TouchableWithoutFeedback style={styles.media} onPress={handleImagePress} >
                {source === 'HomeComponent'? (
                  <Image
                    source={{ uri: presignedUrls[currentIndex] }}
                    style={styles.media}
                    resizeMode="cover"
                  />

                ):(
                  <Video
                    source={{ uri: product.media[0].url }}
                    style={styles.media}
                    paused={!isFocused} 
                    resizeMode="cover"
                    repeat
                    muted
                  />
                )}
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>

            <LinearGradient
            colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
            style={styles.gradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            />
            {/* <View style={{justifyContent:'space-between' , display:'flex' , width:'100%' , flexDirection:'row',paddingHorizontal:20 ,position: 'absolute', top: 30,left: 0,right: 0,}}>
              <View style={[styles.iconLeft,]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={[]}>
                      <LeftArrowSvg fill={'black'}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.iconLeft,]}>
                  <TouchableOpacity>
                  <View style={[]}>
                      <SearchSvg width={23} height={23}/>
                  </View>
                  </TouchableOpacity>
              </View>
            </View> */}
        </View>

        <View style={styles.carouselIndicatorContainer}>
            <View style={[styles.size]}>
            <AnimatedDotsCarousel
                length={productImages.length}
                currentIndex={currentIndex}
                maxIndicators={3}
                interpolateOpacityAndColor={true}
                activeIndicatorConfig={{
                color: 'black',
                opacity: 1,
                size: 4.5,
                margin: 3,
                }}
                inactiveIndicatorConfig={{
                color: 'gray',
                opacity: 0.5,
                size: 4,
                margin: 3,
                }}
                decreasingDots={[
                {
                    config: { color: 'gray', size: 4, margin: 1, opacity: 1 },
                    quantity: 0,
                },
                {
                    config: { color: 'gray', size: 4, margin: 2, opacity: 1 },
                    quantity: 0,
                },
                ]}
            />
            </View>
        </View>

        <View style={styles.bottom}>
            <View style={{gap:4}}>
            <View style={[{flexDirection:'row' , alignItems:"center" , gap:10},]}>
                <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                  <View style={[{ borderRadius:50 , overflow:'hidden' , height:32 , width:32} ,]}>
                      <Image cover style={{height:'100%' , width:'100%' ,}} source={require('../../../../Assets/Images/new.jpg')}/>
                  </View>
                  <Text style={[{ fontWeight:500 , color:"white", fontS:15},]}>{product.product?.brand || product.tagged_products[0]?.product.brand || 'Brand'}</Text>
                </View>
                <TouchableOpacity style={[{borderStyle:'solid', borderWidth:1 , borderColor:'white', borderRadius:20 , paddingBottom:1.5 , paddingHorizontal:10}]}>
                  <Text style={[{color:'white'},]}>Follow</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'90%'}}>
              <Text style={[styles.text]}>
                  {product.product?.name || product.tagged_products[0]?.product.name || 'name'}
              </Text>
            </View>
            {product.product ? (
              <View style={{flexDirection:'row',alignItems:'baseline'}}>
                <Text style={{
                  marginRight: 5,
                  fontSize: 20,
                  color: 'white',
                  fontWeight:'700'
                }}>
                  ₹{product.product?.discount_price || product.product?.price }
                </Text>

                {product.product.discount_price ? (
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '400',textDecorationLine: 'line-through', }}>
                    ₹{product.product.price}
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
                  ₹{product.tagged_products[0]?.product.discount_price ||  product.tagged_products[0]?.product.price}
                </Text>


                {product.tagged_products[0].product && product.tagged_products[0].product.discount_price ? (
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '400',textDecorationLine: 'line-through', }}>
                    ₹{product.tagged_products[0].product.price}
                  </Text>
                ) : null}

              </View>
              
            )}
            {/* <Text style={{fontSize:20 , color: '#FFFFFF',fontWeight:'600'}}>
            ₹{product.product?.price  || product.tagged_products[0]?.product.price || 'Price'}
            </Text> */}
            </View>
            <View style={styles.ibottom}>
            <View style={[styles.iconBottom,]}>
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
            </View>
            <View style={[styles.iconBottom,]}>
                <TouchableOpacity  onPress={onShare}>
                <View style={[]}>
                    <ShareSvg width={23} height={23}/>
                </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </GestureRecognizer>
      </View>
      <View style={{backgroundColor:'white', paddingHorizontal:20 , gap:15,display:'flex', borderBottomWidth:1 , borderBottomColor:"#F4F5FA" , paddingVertical:15}}>
        {source === 'HomeComponent' ? (
          <View style={{gap:10}}>
            {product.product?.description ? (
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={handleToggleTexthide}>
                  <Text
                    numberOfLines={isExpanded ? null : 1}
                    style={{ color: '#818181', fontSize: 15 }}
                  >
                    {product.product?.description || 'The description of the Product shown here'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggleText}>
                  <Text style={{ color: '#818181', fontSize: 15, fontWeight:'700' }}>
                    {isExpanded ? '' : 'more'}
                  </Text>
                </TouchableOpacity>
              </View>

            ):(null)}
            <View style={{flexDirection:'row' , gap:10, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity style={{backgroundColor:'#F0F0F0' , width:'40%' , paddingVertical:10, borderRadius:24 , alignItems:'center', paddingHorizontal:5}} onPress={openUrl}>
                <Text style={{color:"black" , fontSize:16 , fontWeight:'500'}}>Buy now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleATC} style={{backgroundColor:'#080928' , width:'40%' , paddingVertical:10, borderRadius:24 , alignItems:'center', paddingHorizontal:5}}>
                <Text style={{color:"white", fontSize:16 , fontWeight:'500'}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Products data={product} />
        )}
      </View>
        <View style={{backgroundColor:'white' , paddingVertical:15}}>
          <SimilarProducts scrollY={scrolly} similarProducts={similarProducts2} loading={isFetchingNextPage}/>
        </View>
        <ImageModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageSource={productImages}
          type={product.post_type}

        />
      </SafeAreaView>
    </Animated.ScrollView>
    </>
  );
};

const ProductDetails = () => {
  return (
    <ProductProvider>
      <App />
    </ProductProvider>
  );
};
const styles = StyleSheet.create({
    container: {
      width:'100%',
      // height: height * 0.59,
      aspectRatio:0.7,
    },
    mediaContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    media: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius:20,
    },
    gradient: {
      position: 'absolute',
      width: '100%',
      height: '30%',
      bottom: height * 0.00,
      left: width * 0.0,
      borderRadius:20,
      
    },
    ibottom:{
        gap:15
    },
    iconLeft: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 20,
      alignItems:'center',
      justifyContent:'center',
      // padding:7,
      width:35,
      height:35
    },
    iconRight: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 20,
      padding: 10,
    },
    iconBottom: {
      backgroundColor:'rgba(255, 255, 255, 0.4)',
      borderRadius: 95,
      alignItems:'center',
      justifyContent:'center',
      position:'relative',
      padding:7
    },
    ProductName: {
      gap: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'flex-end',
      bottom: height * -0.01,
      paddingBottom:25,
      width: '100%',
      paddingHorizontal: 20,
      position:'absolute'
    },
    text: {
      fontSize: 15,
      color: '#FFFFFF',
      fontWeight:'600'
    },
    priceText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    carouselIndicatorContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      top:20
    },
    size: {
      // width: 55,
      // height: 13,
      alignItems: 'center',
      justifyContent:'center',
      display:'flex',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingVertical:2,
      paddingHorizontal:11,
    },
    overlayIconContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -70 }, { translateY: -70 }],
      zIndex: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dislikeText: {
      color: 'red',
      fontSize: 40,
      fontWeight: 'bold',
    },
    statusBarBackground: {
      height: Platform.OS === 'ios' ? StatusBar.currentHeight || 60 : 0,
      width: '100%',
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
  });

export default ProductDetails;
