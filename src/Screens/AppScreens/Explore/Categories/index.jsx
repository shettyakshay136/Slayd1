import React, { useState, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View , Image } from 'react-native';

// import { FilterSvg } from '../../Assets/Svg';
// import BottomSheetModalView from '../BottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {Brand} from '../../../../../Data'

const Filter = ({ }) => {
  const [selected, setSelected] = useState(selectedOption);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOptionPress = (option) => {
    setSelected(option);
    onPress(option);
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={styles.filter}>
      <Pressable style={styles.icon}>
        {/* <FilterSvg /> */}
      </Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {Brand.map((Brand, index) => (
            <Pressable
                key={index}
                onPress={() => handleOptionPress(Brand)}
                style={[styles.filterOption, option === selected && styles.selectedOption]}
            >   
            <View style={styles.image}>
                <Image
                    source={Brand.image}
                    style={[styles.image]}
                    resizeMode="cover"
                />
            </View>
                <Text>{Brand.name}</Text>
            </Pressable>
        ))}
      </ScrollView>

      {/* <BottomSheetModalView bottomSheetModalRef={bottomSheetModalRef}>
        <Text style={styles.bottomSheetText}>This is the content of the BottomSheetModal.</Text>
      </BottomSheetModalView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    marginRight: 6,
  },
  scrollView: {
    flexGrow: 0,
  },
  image:{
    height:'100%',
    width:'100%'
  },
  filterOption: {
  },
  selectedOption: {
    backgroundColor: '#DDDDDD',
  },
  selectedOptionText: {
    color: 'black',
  },
  filterOptionText: {
    fontSize: 13,
    color: 'black',
  },
  bottomSheetText: {
    padding: 20,
  },
});

export default React.memo(Filter);
