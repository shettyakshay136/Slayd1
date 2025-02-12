import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';

import {} from '../../../../../Assets/Svg/Add';
import { RightArrow, AddSvg, RightTickSvg } from '../../../../../Assets/Svg';

const index = ({ setOnBoardingPreference, }) => {
  const [activeIndex, setActiveIndex] = useState({});
  const screenWidth = Dimensions.get('window').width;
  const columnWidth = screenWidth / 2.35;
  const data = [
    { id: 1, name: 'Off-Shoulder', image: require('../../../../../Assets/Images/pre1.png') },
    { id: 2, name: 'Deep neck', image: require('../../../../../Assets/Images/pre2.png') },
    { id: 3, name: 'Backless', image: require('../../../../../Assets/Images/pre3.png') },
    { id: 5, name: 'Visible tummy', image: require('../../../../../Assets/Images/pre4.png') },
    { id: 6, name: 'Short', image: require('../../../../../Assets/Images/pre5.png') },
    { id: 7, name: 'Tight fitting', image: require('../../../../../Assets/Images/pre6.png') },
  ];

  const handlePress = (id, name) => {
    setActiveIndex((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setOnBoardingPreference((prevState) => {
      const updatedItems = prevState.avoid_styles
        ? prevState.avoid_styles.includes(name)
          ? prevState.avoid_styles.filter((item) => item !== name)
          : [...prevState.avoid_styles, name]
        : [name]; 
    return {
        ...prevState, 
        avoid_styles: updatedItems,
      };
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{gap:10}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFE6F5',
            borderRadius: 16,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <Text style={{ color: '#080928', fontWeight: '600', fontSize: 16 }}>Nothing</Text>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
          >
            <RightArrow fill={'black'} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 13,
            paddingVertical: 10,
          }}
        >
          {data.map((item, index) => (
            <View key={item.id} style={{ width: columnWidth, height: 180 }}>
              <TouchableOpacity onPress={() => handlePress(item.id, item.name)}>
                <ImageBackground
                  source={item.image}
                  style={{ width: '100%', height: '100%' }}
                  imageStyle={{ borderRadius: 16 }}
                >
                  {activeIndex[item.id] && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <RightTickSvg width={81} height={53} color={'white'} />
                    </View>
                  )}
                  <View
                    style={{
                      bottom: 0,
                      position: 'absolute',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: activeIndex[item.id] ? '#D7FC70' : 'white',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {activeIndex[item.id] ? (
                        <RightTickSvg width={13} height={13} color={'black'} />
                      ) : (
                        <AddSvg width={13} height={13} />
                      )}
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default index;