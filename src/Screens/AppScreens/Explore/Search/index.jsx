import { View, Text , TextInput, StyleSheet } from 'react-native'
import React from 'react'

import {SearchSvg} from '../../../../Assets/Svg'

const index = () => {
  return (
    <View style={style.container}>
        <SearchSvg/>
        <TextInput
            placeholder="Search..."
            placeholderTextColor={'black'}
            style={style.searchInput}
        />
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'#F0F0F0',
        borderRadius:24,
        paddingHorizontal:10,
        // paddingVertical:2,
        flexDirection:"row",
        alignItems:'center'
    },
    searchInput:{
        flex: 1,
        padding: 8.2,
        color: 'black',
    }
})
export default index