import { View, TextInput, StyleSheet, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SearchSvg } from '../../Assets/Svg';
import Filter from '../Filter';
import { categories } from "../../../Data";

const CustomHeader = ({ isVisible }) => {
  const inputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const animatedHeight = useRef(new Animated.Value(isVisible ? 82 : 0)).current;

  const handleCategoryPress = (option) => {
    setSelectedCategory(option);
    console.log(option);
  };

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isVisible ? 45 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View style={[styles.headerContainer, { height: animatedHeight }]}>
      {/* <View style={styles.searchBox}>
        <SearchSvg width={18} height={18} />
        <TextInput
          ref={inputRef}
          placeholder="Search..."
          placeholderTextColor={'black'}
          style={styles.searchInput}
        />
      </View> */}
      <Filter
        options={categories}
        selectedOption={selectedCategory}
        onPress={handleCategoryPress}
        borderColor={'#E7E7E7'}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: -3,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 8,
    gap: 7,
    zIndex:1000
  },
  searchBox: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 24,
    gap: 4,
    paddingVertical: 6,
    zIndex: 500,
  },
  searchInput: {
    paddingVertical: 0,
  },
});

export default CustomHeader;
