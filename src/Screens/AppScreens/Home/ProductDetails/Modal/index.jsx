import React, { useState, useRef } from 'react';
import { View, Modal, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions , SafeAreaView} from 'react-native';
import { LeftArrowSvg } from '../../../../../Assets/Svg';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

import Video from 'react-native-video';


const { width, height } = Dimensions.get('window');

const ImageModal = ({ visible, onClose, imageSource , type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  console.log('check in modal',type)


  console.log('image source in modal new', imageSource)



  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ backgroundColor: 'white', flex:1}}>
      <View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <LeftArrowSvg fill={'black'} />
        </TouchableOpacity>

        <View style={styles.modalBackground}>
          <View style={styles.carouselIndicatorContainer}>
            <View style={styles.size}>
            <AnimatedDotsCarousel
                length={imageSource.length}
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
          {type === 'PRODUCT_POST' || type === undefined  ? (
            <FlatList
              data={imageSource}
              renderItem={({ item }) => (
                <View style={styles.fullScreenImage}>
                  <Image
                    source={{ uri: item }}
                    style={{height:'100%', width:'100%'}}
                    resizeMode="contain"
                  />
                </View>
              )}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={handleViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              ref={flatListRef}
            />

          ) : (
            <View style={{height:500 , width:'100%',top:80}}>

              <Video
                source={{ uri : imageSource[0] }}
                style={{height:'100%', width:'100%'}}
                paused={false} 
                resizeMode="cover"
                repeat
                ignoreSilentSwitch="ignore"
                muted={false}

              />

            </View>

          )}
        </View>
      </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    top: 10,
    left: 20,
    backgroundColor: '#F4F5FA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  modalBackground: {
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height * 0.8,
  },
  carouselIndicatorContainer: {
    position: 'absolute',
    top: 100,
    zIndex: 1,
  },
  size: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});

export default ImageModal;
