import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native';
import { CancelSvg, CartSvg, ClikeSvg, SaveSvg } from '../../../Assets/Svg';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLikedItems, fetchWishlistItems } from '../../../Store/activitySlice'; 
import { fetchPresignedUrls } from '../../../Utils/Aws'; 
import { useScreenContext , ActivityProvider } from './ActivityContext';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import MasonryList from 'react-native-masonry-list';

const cartItems = [];

const App = () => {
  const [activeTab, setActiveTab] = useState('Cart');
  const [presignedUrls, setPresignedUrls] = useState({});

  const { likeData, wishlistData, loading, error, fetchData , ATCData } = useScreenContext();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000); 
  
    return () => clearInterval(interval); 
  }, []);


  // console.log("check ATC data",ATCData)





  const getData = () => {
    switch (activeTab) {
      case 'Cart':
        return ATCData;
      case 'Saved':
        return wishlistData;
      case 'Liked':
        return likeData;
      default:
        return [];
    }
  };


  const fetchItemUrls = async (items) => {
    const urls = {};
    for (const item of items) {
      const imageKey = item.post.product?.image_url || item.post.tagged_products[0]?.product?.image_url;
      if (imageKey) {
        try {
          const url = await fetchPresignedUrls(imageKey);
          urls[item.post.id] = url;
        } catch (error) {
          console.error('Error fetching presigned URL:', error);
        }
      }
    }
    setPresignedUrls(urls); 
  };

  useEffect(() => {
    const items = getData();
    fetchItemUrls(items);
  }, [activeTab]);


  const openUrl = async (item) => {
    try {
      if (InAppBrowser) {
        const link = item.post.product?.product_link || item.post.tagged_products[0]?.product.product_link ;
        console.log(link)
        
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

  

  

  const imageHeights = [200, 230, 260, 240, 250, 190];

  const renderItem = ({ item, index }) => {
    const isLikedTab = activeTab === 'Liked';
    const imageHeight = imageHeights[index % imageHeights.length]; // Use imageHeights for height
    const productItem = (
      <View style={{ 
        width: '100%', 
        height: imageHeight, 
        borderRadius: 8, 
        overflow: 'hidden',
        // paddingBottom:5 
        marginBottom: 5,
      }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={{
            uri: presignedUrls[item.post.id] || 'https://via.placeholder.com/100x115',
          }}
        />
      </View>
    );
  
    if (isLikedTab) {
      return productItem; // Only show the image in the 'Liked' tab
    }
  
    return (
      <View style={styles.itemContainer}>
      <View style={{ width: 100, height: 115, borderRadius: 8, overflow: 'hidden' }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={{  uri: presignedUrls[item.post.id] || 'https://via.placeholder.com/100x115', }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <View style={{ width: '90%', maxHeight: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#212121' }}>
              ₹{item.post.product?.price ||item.post.tagged_products[0]?.product.price ||'the price'}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#9E9E9E' }}>
              {item.post.product?.description || item.post.tagged_products[0]?.product.description ||'The description of the product shown here'}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderColor: '#9E9E9E',
              borderWidth: 1,
              paddingHorizontal: 16,
              borderRadius: 8,
              paddingVertical: 5,
              width: '50%',
            }}
            onPress={() => openUrl(item)}
          >
            <Text style={{ color: '#212121', fontSize: 14, fontWeight: '500', paddingBottom: 1 }}>
              Go to Site
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <CancelSvg />
        </TouchableOpacity>
      </View>
    </View>
    );
  };
  
  const renderColumns = (data) => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];
  
    // Distribute items into three columns
    data.forEach((item, index) => {
      const productItem = renderItem({ item, index });
  
      if (index % 3 === 0) {
        columnOne.push(productItem);
      } else if (index % 3 === 1) {
        columnTwo.push(productItem);
      } else {
        columnThree.push(productItem);
      }
    });
  
    return (
      <View style={styles.columnContainer}>
        <View style={styles.column}>{columnOne}</View>
        <View style={styles.column}>{columnTwo}</View>
        <View style={styles.column}>{columnThree}</View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={{ color: '#212121', fontSize: 21, fontWeight: '600' }}>Your Collection</Text>
        <View style={{ paddingTop: 15, gap: 20 }}>
          <View style={styles.tabContainer}>
            {['Cart', 'Saved', 'Liked'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {tab === 'Cart' && <CartSvg fill={activeTab === 'Cart' ? '#212121' : '#9E9E9E'} />}
                  {tab === 'Saved' && <SaveSvg fill={activeTab === 'Saved' ? '#212121' : '#9E9E9E'} />}
                  {tab === 'Liked' && <ClikeSvg fill={activeTab === 'Liked' ? '#212121' : '#9E9E9E'} />}
                  <Text
                    style={[
                      styles.tabText,
                      { color: activeTab === tab ? '#212121' : '#9E9E9E' },
                    ]}
                  >
                    {tab}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: '85%' }}>
            {activeTab === 'Liked' ? (
              renderColumns(getData()) // Render items in 2 columns for the 'Liked' tab
            ) : (
              <FlatList
                data={getData()}
                keyExtractor={(item) => item.id}
                renderItem={renderItem} // Full render for other tabs
                contentContainerStyle={styles.listContainer}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
  

const Activity = () => {
  return (
    <ActivityProvider>
      <App />
    </ActivityProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 3,
    borderRadius: 8,
  },
  tab: {
    paddingHorizontal: 25,
    paddingVertical: 13,
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  listContainer: {
    gap: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  columnContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap:5,
    paddingTop:1,
    // backgroundColor:'purple'
  },
  column: {
    width: '32%',
  },
});

export default Activity;
