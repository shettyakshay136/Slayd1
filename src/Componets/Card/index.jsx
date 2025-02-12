import React , {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import MediaViewer from '../Media';

const Card = ({ media, type, imageHeight, imageWidth, videoHeight, videoWidth, shouldPlay, children }) => {
  return (
    <View style={styles.cardContainer}>
      <MediaViewer
        media={media}
        type={type}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        videoHeight={videoHeight}
        videoWidth={videoWidth}
        shouldPlay={shouldPlay}
      >
        <View style={styles.overlay}>
          {children}
        </View>
      </MediaViewer>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex:500
  },
});

export default Card;
