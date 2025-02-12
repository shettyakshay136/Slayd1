import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import  styles  from './style'
import { ScrollView } from 'react-native-gesture-handler'

import { LikeSvg, LineArrowSvg, RightArrow } from '../../../../Assets/Svg'
import {BrandProducts} from '../../../../../Data'

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Shop by Brand</Text>
        <View style={{flexDirection:"row" , alignItems:'center', gap:5}}>
          <Text style={styles.viewall}>View All</Text>
          <LineArrowSvg fill={'black'}/>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
        {BrandProducts.map((BrandProducts ,index) => (
          <View key={index} style={styles.index}>
            <View style={styles.layout}>
                <View style={styles.imageC}>
                    <Image resizeMode='cover' style={styles.img} source= {BrandProducts.image}/>
                </View>
                <View style={styles.prize}>
                    <Text style={{fontSize:16, color:'black' , fontWeight:'500'}}>{BrandProducts.price}</Text>
                    <LikeSvg/>
                </View>
                <View>
                    <Text numberOfLines={2} style={{color: '#9E9E9E' ,}}>{BrandProducts.des}</Text>
                </View>
            </View>
          </View>
        ))}
        </ScrollView>
        {/* <View style={{paddingRight:20}}>
          <TouchableOpacity style={{width:'100%' , paddingVertical:10 , justifyContent:'center', alignItems:'center' , backgroundColor:"white" , borderRadius:5}}>
              <Text style={{color:'black'}}>Shop Brand</Text>
          </TouchableOpacity>
        </View> */}
      
    </View>
  )
}

export default index