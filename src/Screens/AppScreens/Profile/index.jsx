import { View, Text ,SafeAreaView, TouchableOpacity , StyleSheet ,Button} from 'react-native'
import React,{useState ,useRef,useMemo} from 'react'
import { RightArrow } from '../../../Assets/Svg'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const index = () => {

   const [isModalVisible, setModalVisible] = useState(false);
   const [isModalVisible2, setModalVisible2] = useState(false);

   const bottomSheetModalRef = useRef(null);
   const bottomSheetModalRef2 = useRef(null);
    
    // Memoize snap points for optimization
    const snapPoints = useMemo(() => ['23%'], []);
  
    const handlePresentModal = () => {
      bottomSheetModalRef.current?.present();
      setModalVisible(true);
      // setIsVisible(true)
    };
  
    const handleDismissModal = () => {
      bottomSheetModalRef.current?.dismiss(); 
      setModalVisible(false);
    };

    const handlePresentModal2 = () => {
      bottomSheetModalRef2.current?.present();
      setModalVisible2(true);
      // setIsVisible(true)
    };
  
    const handleDismissModal2 = () => {
      bottomSheetModalRef2.current?.dismiss(); 
      setModalVisible2(false);
    };
  return (
    <View style={{flex:1}}>
      {(isModalVisible || isModalVisible2) && <View style={styles.overlay} />}
    <SafeAreaView>
      <View style={{paddingHorizontal:15,paddingVertical:15,gap:44}}>
        <View>
          <Text style={{fontWeight:'700',color:'#080928',fontSize:24}}>Hi Ak</Text>
        </View>
        <View style={{gap:16}}>
          <TouchableOpacity style={{justifyContent:'space-between',width:'100%',flexDirection:'row',paddingVertical:5}}>
            <Text style={{color:'#080928',fontWeight:'600',fontSize:16}}>Report a Bug</Text>
            <RightArrow fill={'black'} />
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'space-between',width:'100%',flexDirection:'row',paddingVertical:5}}>
            <Text style={{color:'#080928',fontWeight:'600',fontSize:16}}>Privacy Policy</Text>
            <RightArrow fill={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePresentModal} style={{justifyContent:'space-between',width:'100%',flexDirection:'row',paddingVertical:5}}>
            <Text style={{color:'#080928',fontWeight:'600',fontSize:16}}>Sign out</Text>
            <RightArrow fill={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePresentModal2} style={{justifyContent:'space-between',width:'100%',flexDirection:'row',paddingVertical:5}}>
            <Text style={{color:'#080928',fontWeight:'600',fontSize:16}}>Delete Account</Text>
            <RightArrow fill={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    <BottomSheetModal
     ref={bottomSheetModalRef}
     index={1} 
     snapPoints={snapPoints}
     enablePanDownToClose={true}
     
    >
    <BottomSheetView style={{borderTopLeftRadius:12}}> 
      <View style={{paddingVertical:25 , paddingHorizontal:15,gap:25}}>
        <Text style={{color:'#080928',fontWeight:'600',color:'#080928'}}>Do you want to Sign Out?</Text>
        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
          <TouchableOpacity style={{width:'50%',paddingVertical:12,borderRadius:20}}>
            <Text style={{color:'black',fontSize:14,fontWeight:'600',textAlign:'center'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDismissModal}  style={{backgroundColor:'#080928',width:'50%',paddingVertical:12,borderRadius:20}}>
            <Text style={{color:'white',fontSize:14,fontWeight:'600',textAlign:'center'}}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     </BottomSheetView>
    </BottomSheetModal>

    <BottomSheetModal
     ref={bottomSheetModalRef2}
     index={1} 
     snapPoints={snapPoints}
     enablePanDownToClose={true}
     
    >
    <BottomSheetView style={{borderTopLeftRadius:12}}> 
      <View style={{paddingVertical:25 , paddingHorizontal:15,gap:25}}>
        <Text style={{color:'#080928',fontWeight:'600',color:'#080928'}}>Do you want to Delete Account?</Text>
        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
          <TouchableOpacity onPress={handleDismissModal2} style={{width:'50%',paddingVertical:12,borderRadius:20 ,backgroundColor:'#080928'}}>
            <Text style={{color:'white',fontSize:14,fontWeight:'600',textAlign:'center'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{width:'50%',paddingVertical:12,borderRadius:20}}>
            <Text style={{color:'#FF3B30',fontSize:14,fontWeight:'600',textAlign:'center'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     </BottomSheetView>
    </BottomSheetModal>
    
   </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width : '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black shade with 50% opacity
    zIndex: 1, // Ensure it appears above other content
  },
})

export default index