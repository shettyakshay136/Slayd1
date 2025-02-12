import { View, Text } from 'react-native'
import React from 'react'
import CustomList from '../../../Componets/Customlayout'




const data = [
  { id: '1', name: 'Video 1', videoUrl: require('../../../Assets/Images/v1.mp4') }, // Local video 1
  { id: '2', name: 'Video 2', videoUrl: require('../../../Assets/Images/v2.mp4') }, // Local video 2
  { id: '3', name: 'Video 3', videoUrl: require('../../../Assets/Images/v1.mp4') }, // Local video 3
  { id: '4', name: 'Video 4', videoUrl: require('../../../Assets/Images/v2.mp4') }, // Local video 4
  { id: '5', name: 'Video 5', videoUrl: require('../../../Assets/Images/v1.mp4') },
  { id: '6', name: 'Video 6', videoUrl: require('../../../Assets/Images/v2.mp4') }, // Local video 5
  { id: '7', name: 'Video 7', videoUrl: require('../../../Assets/Images/v1.mp4') },
  { id: '8', name: 'Video 8', videoUrl: require('../../../Assets/Images/v2.mp4') },
  { id: '9', name: 'Video 9', videoUrl: require('../../../Assets/Images/v1.mp4') },
  { id: '10', name: 'Video 10', videoUrl: require('../../../Assets/Images/v2.mp4') },
  { id: '11', name: 'Video 11', videoUrl: require('../../../Assets/Images/v1.mp4') },
  { id: '12', name: 'Video 12', videoUrl: require('../../../Assets/Images/v2.mp4') },
  { id: '13', name: 'Video 13', videoUrl: require('../../../Assets/Images/v1.mp4') },

  // Add more items as needed
];


const index = () => {
  return (
    <View style={{flex:1}}>
      <CustomList videoData={data} />
    </View>
  )
}

export default index