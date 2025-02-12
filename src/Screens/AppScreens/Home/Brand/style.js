import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    container:{
        paddingLeft:20,
        width:'100%',
    },
    index:{
        marginRight:20,
        paddingVertical:20
        
        
    },
    heading:{
        flexDirection:'row',
        alignItems:'center',
        gap:10, 
        justifyContent:'space-between',
        paddingRight:15

    },
    title:{
        fontSize:18,
        color:'black',
        fontWeight:'600'
    },
    viewall:{
        fontSize:13,
        color:'black',
        fontWeight:'700'
    },
    layout:{
        width:150,
        height:225,
    },
    imageC:{
        width:150,
        height:180,

    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:16,
    },
    prize:{
       flexDirection:'row',
       justifyContent:'space-between',
       paddingTop:7,
       paddingBottom:2,
       alignItems:'center',
       
    }
})
export default styles