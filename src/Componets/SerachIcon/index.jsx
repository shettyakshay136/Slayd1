import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const SerachIcon = ({ visible, onClose }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  const openModal = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  const closeModal = () => {
    Keyboard.dismiss();
    Animated.timing(animation, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  const animatedWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [44, width - 87.5],
  });

  // Start animation when modal is opened
  if (visible) {
    openModal();
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 1)"
        />
        <TouchableOpacity onPress={closeModal} style={styles.modalTouchable} />
        <View style={styles.modalContent}>
          <Animated.View style={[styles.animatedCircle, { width: animatedWidth }]}>
            <TextInput
              ref={inputRef}
              placeholder="Search..."
              placeholderTextColor={'black'}
              style={styles.searchInput}
            />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  circle: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: 'transparent',
    flex: 1,
    top: height - 729,
    right: width - 345,
  },
  animatedCircle: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
    position: 'absolute',
    right: 0, 
  },
  searchInput: {
    flex: 1,
    padding: 8.2,
    color: 'black',
  },
});

export default SerachIcon;
