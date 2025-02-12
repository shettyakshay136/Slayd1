import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { BooksmarkSvg } from '../../../../Assets/Svg';
import TextLimit from '../../../../Componets/TextLimit';
import MediaHome from '../../../../Componets/MediaHome';

const ProductDetails = ({ data, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <View style={{
          width: 1,
          height: 45,
          backgroundColor: '#F4F5FA',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: [{ translateY: -22.5 }]
        }} />
        <View style={{ width: 75, height: 90, borderRadius: 12, overflow: 'hidden' }}>
          <MediaHome media={item.media} resize={'cover'} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
              <TextLimit>{item.name}</TextLimit>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#212121' }}>{item.price}</Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#F4F5FA',
              paddingHorizontal: 16,
              borderRadius: 26,
              paddingVertical: 8,
              width: 50,
              alignItems: 'center'
            }}>
              <BooksmarkSvg width={18} height={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 15, gap: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 0
  },
  listContainer: {
    gap: 10
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 15
  },
});

export default ProductDetails;
