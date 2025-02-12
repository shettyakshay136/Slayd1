import { View, Text, ScrollView , Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {} from '../../../../../Assets/Svg/Add'
import { AddSvg , RightTickSvg } from '../../../../../Assets/Svg'

const index = ({setOnBoardingPreference, onInputComplete}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [activeIndex, setActiveIndex] = useState({});



    const data = [
        { id: 1, name: 'Soft Girl Core', Text:'Soft, delicate and highly feminine styles', image: require('../../../../../Assets/Images/p1.png') },
        { id: 2, name: 'Urban and Edgy', Text:'Bold or urban looks with street & rebellious edge', image: require('../../../../../Assets/Images/p2.png') },
        { id: 3, name: 'Timeless n Classic', Text:'Timeless and high quality elegant styles', image: require('../../../../../Assets/Images/S1.png') },
        { id: 4, name: 'Artistic and Alternative', Text:'Creative, unique and experimental styles', image: require('../../../../../Assets/Images/S2.png') },
        { id: 5, name: 'Sporty and Functional', Text:'Comfortable, functional and athletic-inspired', image: require('../../../../../Assets/Images/S3.png') },
        { id: 6, name: 'Nightlife and Glam', Text:'Designed for a night out or to make a statement', image: require('../../../../../Assets/Images/s4.png') },
    ];
    const handlePress = (id, name) => {
        setActiveIndex((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      
        setOnBoardingPreference((prevState) => {
          const updatedItems = prevState.aesthetics.includes(name)
            ? prevState.aesthetics.filter((item) => item !== name)
            : [...prevState.aesthetics, name];
          if (updatedItems.length >= 3) {
            onInputComplete(true); 
          } else if (updatedItems.length < 3) {
            onInputComplete(false); 
          }
      
          return {
            ...prevState, 
            aesthetics: updatedItems,
          };
        });
      };
      
  return (
    
    <View scrollEnabled={false} style={{flex:1, backgroundColor:"white"}}>
        <View style={{}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
            <View style={{rowGap:20, columnGap:10, paddingVertical:10}}>
                {data.map((item , index) => (
                    <View key={item.id} style={{width:'100%', minHeight:325, borderRadius:16, overflow:'hidden'}}>
                        <TouchableOpacity onPress={() => handlePress(item.id, item.name)} >
                            <View style={{height:260, width:'100%'}}>
                                <Image resizeMode='cover' style={{width:'100%', height:'100%'}} source={item.image}/>
                            </View>
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
                                    <RightTickSvg width={81} height={53} color={'white'}/> 
                                </View>
                            )}
                            <View style={{backgroundColor:'#F4F5FA',flexDirection:"row", justifyContent:'space-between', alignItems:'center', paddingVertical:15, borderBottomLeftRadius:16, borderBottomRightRadius:16, paddingHorizontal:15}}>
                                <View style={{width:'80%'}}>
                                    <Text style={{color:'#080928', fontWeight:'600', fontSize:16}}>{item.name}</Text>
                                    <Text style={{color:'#71738A', fontSize:12 , fontWeight:'400'}}>{item.Text}</Text>
                                </View>
                                <View style={{width:35, height:35, backgroundColor: activeIndex[item.id] ? '#D7FC70' : 'white', justifyContent:"center", alignItems:"center", borderRadius:50}}>
                                    {activeIndex[item.id] ? (
                                        <RightTickSvg width={18} height={18} color={'black'}/>
                                    ):(
                                        <AddSvg width={16} height={16}/>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default index