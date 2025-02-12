import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    // flex:1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width : '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black shade with 50% opacity
    zIndex: 1, // Ensure it appears above other content
  },
  filter:{
    paddingLeft:20,
  },
  Product:{
    paddingHorizontal:20,
    paddingVertical:15,
  },
  Brand:{
    paddingTop:15,
    backgroundColor:'white'

  }
});
