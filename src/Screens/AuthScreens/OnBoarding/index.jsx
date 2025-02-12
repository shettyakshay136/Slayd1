import React, { useState } from 'react';
import { StyleSheet, View, Animated, Text, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, SafeAreaView } from 'react-native';
import ProgressBar from './ProgressiveBar';
import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';
import Screen3 from './Screens/Screen3'
import Screen4 from './Screens/Screen4'
import { RightArrow } from '../../../Assets/Svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login , setAuthenticated } from '../../../Store/authSlice';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const YourFormComponent = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(new Animated.Value(30));
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isScreen1Complete, setIsScreen1Complete] = useState(false);
  const [isScreen2Complete, setIsScreen2Complete] = useState(false);
  const [isScreen3Complete, setIsScreen3Complete] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const userId = useSelector(state => state.auth.userId);

  const [formData, setFormData] = useState({
    username: '',
    age: 0,
    phone: '',
    gender: '',
    password: ''
  });

  const [OnBoardingPreferences , setOnBoardingPreference] = useState({
    user_id: userId,
    aesthetics: [] ,
    avoid_styles:[],
  });

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);
  const [isSecondApiLoading, setIsSecondApiLoading] = useState(false);

  const updateProgress = (step) => {
    const progressValues = { 1: 25, 2: 50, 3: 75 , 4:100 };
    Animated.timing(progress, {
      toValue: progressValues[step],
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = async () => {
    const screenCompletion = {
      1: isScreen1Complete,
      2: isScreen2Complete,
      3: isScreen3Complete,
      4: isScreen3Complete,
    };
  
    if (!screenCompletion[currentScreen]) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Input',
        text2: 'Please complete all fields on this screen.',
      });
      return;
    }
  
    try {
      // Step 1: Signup API (Screen 2)
      if (currentScreen === 2 && isScreen1Complete && isScreen2Complete) {
        setIsLoading(true);  // Start loading for first API call
        const response = await axios.post('https://api.slayd.in/account/signup/', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(formData)
        if (response.status === 201) {
          const userId = response.data.user_id[0];
          console.log(userId)
          await AsyncStorage.setItem('userId', userId.toString());
          dispatch(login({ userId })); 
          Toast.show({
            type: 'success',
            text1: 'Signup Successful',
            text2: 'Welcome to the app!',
          });
        }
        setIsLoading(false);  
      }
  
      // Step 2: Preferences API (Screen 4)
      if (currentScreen === 4 && isScreen3Complete) {
        setIsSecondApiLoading(true);  // Start loading for second API call
        const savedUserId = await AsyncStorage.getItem('userId');
        const preferencesWithUserId = {
          ...OnBoardingPreferences,
          user_id: savedUserId,
        };
  
        const preferencesResponse = await axios.post(
          'https://api.slayd.in/account/preferences/',
          preferencesWithUserId,
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (preferencesResponse.status === 200 || preferencesResponse.status === 201) {
          Toast.show({
            type: 'success',
            text1: 'Preferences Submitted',
            text2: 'Your preferences have been saved!',
          });
          dispatch(setAuthenticated()); // Update Redux state
        }
        setIsSecondApiLoading(false);  // Stop loading after second API request
      }
  
      if (currentScreen < 4) {
        setCurrentScreen(currentScreen + 1);
        updateProgress(currentScreen + 1);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    
      // Log the error status code if available
      if (error.response) {
        console.error('Error response status:', error.response.status);
      } else {
        console.error('No response received:', error.message);
      }
    
      const errorMessage = error.response?.data?.message || error.message || 'Network error. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
      setIsSecondApiLoading(false);
    }
    
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Screen1 formData={formData} setFormData={setFormData} onInputComplete={setIsScreen1Complete} />;
      case 2:
        return <Screen2 formData={formData} setFormData={setFormData} onInputComplete={setIsScreen2Complete} />;
      case 3:
        return <View style={{flex:1}}>
                  <View style={{paddingBottom:5}}>
                    <Text style={{ fontSize: 32, fontWeight: '700', color: '#080928' }}>Choose 3 or more favourite aesthetics</Text>
                  </View>
                  <Screen3 setOnBoardingPreference={setOnBoardingPreference} onInputComplete={setIsScreen3Complete} />
              </View>;
      case 4:
        return <View style={{flex:1}}>
        <View style={{paddingBottom:5}}>
          <Text style={{ fontSize: 32, fontWeight: '700', color: '#080928' }}>Choose styles that you usually avoid</Text>
        </View>
        <Screen4 setOnBoardingPreference={setOnBoardingPreference} />
    </View>;
      default:
        return null;
    }
  };

  const getButtonBackgroundColor = () => {
    if (currentScreen === 1 && isScreen1Complete) return '#080928';
    if (currentScreen === 2 && isScreen2Complete) return '#080928';
    if (currentScreen === 3 && isScreen3Complete) return '#080928';
    if (currentScreen === 4) return '#080928';
    return '#71738A';
  };

  const handleBack = () => {
    setCurrentScreen(currentScreen - 1); 
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ProgressBar progress={progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] })} />
      <View style={styles.screenContainer}>
        {renderScreen()}
        {uploadSuccess && (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessage}>Data uploaded successfully!</Text>
          </View>
        )}
        {isLoading || isSecondApiLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View style={{flexDirection:'row', paddingVertical: 20 , justifyContent: currentScreen !== 1  ? 'space-between' : 'flex-end',backgroundColor:'white' }}>
            {currentScreen !== 1 ? (
              <View>
                <TouchableOpacity onPress={handleBack} style={[styles.button, { backgroundColor: '#080928' }]}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={{ alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: getButtonBackgroundColor() }]}
              >
                <Text style={styles.buttonText}>Next</Text>
                <RightArrow fill={'white'} />
              </TouchableOpacity>
            </View>

          </View>
        )}
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  screenContainer: { flex: 1, paddingTop: 25, justifyContent: 'space-between' },
  button: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, borderRadius: 24, paddingVertical: 15, gap: 10 },
  buttonText: { fontSize: 16, fontWeight: "600", color: 'white' },
  successMessageContainer: { 
    position: 'absolute', 
    bottom: 100, 
    left: 20, 
    right: 20, 
    backgroundColor: '#DFF0D8', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  successMessage: { color: '#3C763D', fontSize: 16, fontWeight: '600' },
});

export default YourFormComponent;
