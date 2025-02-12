import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import ProductLayout from '../ProductLayout';
import { mediaData } from '../../../../../../Data';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const SwipeableCards = () => {
  const [cardHeight, setCardHeight] = useState(0);

  const onSwiped = (index) => {
    console.log('Swiped card:', index);
  };

  const onCardLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(Math.max(cardHeight, height)); // Update with the tallest card
  };

  return (
    <View style={styles.container}>
    <Swiper
        cards={mediaData}
        renderCard={(card) => (
          <View style={styles.cardContainer}>
            <ProductLayout mediaData={card} />
          </View>
        )}
        onSwiped={onSwiped}
        onSwipedAll={() => console.log('All cards swiped')}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={2}
        showSecondCard={true}
        verticalSwipe={false}
        stackSeparation={0}
        inputRotationRange={[-width / 2, 0, width / 2]}
        outputRotationRange={['-10deg', '0deg', '10deg']}
        infinite
      />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  cardContainer: {
    borderRadius: 24,
    borderColor: 'white',
    borderWidth: 4,
    overflow: 'hidden',
    width: '100%',
    height:height,
  },
});

export default SwipeableCards;
