import { View, Text, Image, TouchableOpacity, StyleSheet , ScrollView } from 'react-native';
import React , {useState , useEffect} from 'react';
import TextLimit from '../../../../Componets/TextLimit';
import { BooksmarkSvg } from '../../../../Assets/Svg';
import { useNavigation } from '@react-navigation/native';
import AWS from 'aws-sdk';
import { products } from '../../../../../Data';

const Index = ({ data }) => {
  const [presignedUrl, setPresignedUrl] = useState(null);
  const [taggedPresignedUrls, setTaggedPresignedUrls] = useState([]);
  const navigation = useNavigation();




  


  useEffect(() => {
    AWS.config.update({
      accessKeyId: 'AKIA2YICAAKWC6GILFFB',
      secretAccessKey: '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',
      region: 'ap-south-1',
    });

    const s3 = new AWS.S3();
    const bucketName = 'feed-images-01';

    const fetchPresignedUrl = async (imageUrl) => {
      if (imageUrl) {
        const objectKey = imageUrl.split('/').slice(-2).join('/');
        const params = {
          Bucket: bucketName,
          Key: objectKey,
          Expires: 60,
        };

        try {
          return await s3.getSignedUrlPromise('getObject', params);
        } catch (err) {
          console.log('Error generating presigned URL', err);
          return null;
        }
      }
      return null;
    };
    const handleProductImage = async () => {
      if (data.product?.image_url) {
        const url = await fetchPresignedUrl(data.product.image_url);
        setPresignedUrl(url);
      }
    };
    const handleTaggedProducts = async () => {
      if (Array.isArray(data.tagged_products)) {
        const urls = await Promise.all(
          data.tagged_products.map((product) => fetchPresignedUrl(product.product?.image_url))
        );
        setTaggedPresignedUrls(urls);
      }
    };

    handleProductImage();
    handleTaggedProducts();
  }, [data]);

  if (!data || typeof data !== 'object') {
    return <Text>No data available</Text>;
  }

  // if (!data || !data.product) {
  //   console.error("Invalid data:", data); // Log if data is not available
  // }


  const onCardPress = () => {
    navigation.push('ProductDetails', { 
      product: data, 
      source: 'HomeComponent' 
    });
  };

  const handlePress = (product) => {
    navigation.push('ProductDetails', { product , source:'HomeComponent' });
  };

  // const handlePress2 = (product) = {
  //   navigation.navigate('ProductDetails', { product });
  // }

  console.log('current data',data)

  return (
    <View style={{}}>
      {data.post_type === 'PRODUCT_POST' ? (
        <TouchableOpacity onPress={onCardPress}>
          <View style={styles.itemContainer}>
            <View
              style={{
                width: 1.5,
                height: 45,
                backgroundColor: '#F4F5FA',
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: [{ translateY: -22.5 }],
              }}
            />
            <View style={{ width: 75, height: 90, borderRadius: 12, overflow: 'hidden' }}>
              <Image source={{ uri: presignedUrl }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ gap: 2 }}>
                  <TextLimit>{data.product?.name}</TextLimit>
                  {/* <Text style={{ fontSize: 11, fontWeight: '500', color: '#212121' }}>
                    ₹{data?.product?.discount_price ?? data?.product?.price}
                  </Text> */}
                  {data.product?.discount_price != null ? (
                    <>
                      <Text style={{ fontSize: 11, fontWeight: '500', color: '#212121' }}>
                        ₹{data.product.discount_price}
                      </Text>
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          marginRight: 5,
                          fontSize: 9,
                          color: '#71738A',
                        }}
                      >
                        ₹{data.product.price}
                      </Text>
                    </>
                  ) : (
                    <Text style={{ fontSize: 11, fontWeight: '500', color: '#212121' }}>
                      ₹{data.product?.price || 'no price'}
                    </Text>
                  )}
                  {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {data.product.price ? (
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          marginRight: 5,
                          fontSize: 9,
                          color: '#71738A',
                        }}
                      >
                        ₹{data.product.price}
                      </Text>
                    ) : null}
                  </View> */}
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F4F5FA',
                    paddingHorizontal: 10,
                    borderRadius: 26,
                    paddingVertical: 8,
                    width: 45,
                    alignItems: 'center',
                  }}
                >
                  <BooksmarkSvg width={15} height={15} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : data.post_type === 'TAGGED_POST' && data.tagged_products && data.tagged_products.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.tagged_products.map((products, index) => (
            <View style={{paddingRight:10}} key={products.id || index}>
              <View style={{flexDirection:'row' , gap:10 , paddingRight: 15, width:"95%"}}>
                <View
                  style={{
                    width: 1.5,
                    height: 45,
                    backgroundColor: '#F4F5FA',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: [{ translateY: -22.5 }],
                  }}
                />
                <TouchableOpacity onPress={() => handlePress(products)}   style={{flexDirection:'row', gap:10 , paddingRight: 15,}}>
                  <View style={{ width: 75, height: 90, borderRadius: 12, overflow: 'hidden' }}>
                    <Image source={{ uri: taggedPresignedUrls[index] }} style={{ width: '100%', height: '100%' }} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <View style={{ gap: 2 }}>
                        <TextLimit>{products.product.name}</TextLimit>
                        <Text style={{ fontSize: 13, fontWeight: '500', color: '#212121' }}>₹{products.product.discount_price || products.product.price}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {products.product.discount_price && (
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                marginRight: 5,
                                fontSize: 11,
                                color: '#71738A',
                              }}
                            >
                              ₹{products.product.price}
                            </Text>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F4F5FA',
                          paddingHorizontal: 10,
                          borderRadius: 26,
                          paddingVertical: 8,
                          width: 45,
                          alignItems: 'center',
                        }}
                      >
                        <BooksmarkSvg width={18} height={18} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  listContainer: {
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 15,
    maxWidth:'60%',
    // backgroundColor:'red'
  },
});

export default Index;
