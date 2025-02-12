import React, { useState, useRef,useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View ,Button } from 'react-native';

import { BottomSvg, FilterSvg } from '../../Assets/Svg';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Filter = ({ title = '', options = [], selectedOption = '', onPress = () => {} , borderColor ,onOptionSelect = () => {},}) => {
  const [selected, setSelected] = useState(selectedOption);
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOptionPress = (option) => {
    setSelected(option);
    onPress(option);
    onOptionSelect(option);
    // handlePresentModal(option)
    // bottomSheetModalRef.current?.present();
  };

  // const bottomSheetModalRef = useRef(null); // Ref for BottomSheet
  // const [isVisible, setIsVisible] = useState(false);

  // // Memoize snap points for optimization
  // const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // const handlePresentModal = () => {
  //   bottomSheetModalRef.current?.present();
  //   setIsVisible(true)
  // };

  // const handleDismissModal = () => {
  //   bottomSheetModalRef.current?.dismiss(); 
  //   setIsVisible(false)
  // };

  return (
    <GestureHandlerRootView>
    <View style={styles.filter}>
      {/* <Pressable style={[styles.icon , {borderColor}]}>
        <FilterSvg />
      </Pressable> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleOptionPress(option)}
            // style={[styles.filterOption, option === selected && styles.selectedOption , {borderColor}]}
            style={[styles.filterOption,]}
          >
            <Text style={[styles.filterOptionText, option === selected && styles.selectedOptionText]}>
              {option}
            </Text>
            <BottomSvg/>
          </Pressable>
        ))}
      </ScrollView>

      {/* {isVisible && (
          <View style={styles.overlay} />
        )} */}

      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1} 
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        
      >
        <BottomSheetView style={{borderTopLeftRadius:12}}> 
          <Text style={styles.text}>This is a Bottom Sheet</Text>
          <Button title="Close" onPress={handleDismissModal} />
        </BottomSheetView>
      </BottomSheetModal> */}
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    marginRight: 6,
    borderWidth:1
  },
  scrollView: {
    flexGrow: 0,
  },
  filterOption: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // borderWidth:1, 
    flexDirection:'row',
    alignItems:'center',
    gap:6
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

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with opacity
  },
});

export default React.memo(Filter);
