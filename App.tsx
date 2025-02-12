import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, NativeModules, ActivityIndicator, View, Text } from 'react-native';
import 'react-native-reanimated';
import Toast, { BaseToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RNFS from 'react-native-fs'; 
import {store ,persistor} from './src/Store/Store';
import RootNavigator from './src/Navigation';
import axios from 'axios';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const saveBundleLocally = async (bundle: string) => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/newBundle.js';
      await RNFS.writeFile(path, bundle, 'utf8');
      console.log('Bundle saved locally to', path);
    } catch (error) {
      console.error('Failed to save the bundle locally:', error);
    }
  };

  const checkForUpdates = async () => {
    try {
      const response = await axios.get('https://slayd-1085b.web.app/Versio.json?' + new Date().getTime());
      const remoteVersionConfig = response.data;
      console.log('Remote version config:', remoteVersionConfig);
      const localVersion = await AsyncStorage.getItem('app_version');
      console.log('Local version:', localVersion);
  
      // Compare the remote version with the local version
      if (remoteVersionConfig.version !== localVersion) {
        const bundleUrl = remoteVersionConfig.android_bundle_url;
        console.log('New bundle URL:', bundleUrl);

        const bundle = await fetch(bundleUrl).then((res) => res.text());
        console.log('Downloaded bundle:', bundle);

        // Save the new bundle locally
        await saveBundleLocally(bundle);

        // Update AsyncStorage with the new version
        await AsyncStorage.setItem('app_version', remoteVersionConfig.version);

        // Show success toast
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Update Available',
          text2: 'A new version has been downloaded and applied!',
        });
        console.log('App updated successfully!');

        // Reload the app if on Android (use fallback for production)
        if (Platform.OS === 'android') {
          if (__DEV__) {
            NativeModules.DevSettings.reload();
          } else {
            // For production, you might want to prompt the user to restart the app
            Toast.show({
              type: 'info',
              position: 'bottom',
              text1: 'App Updated',
              text2: 'Please restart the app to apply the update.',
            });
          }
        }
      } else {
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'App is Up-to-Date',
          text2: 'You are already on the latest version.',
        });
        console.log('App is up-to-date');
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
      // Show error toast in case of failure
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error Checking for Updates',
        text2: 'An error occurred while checking for updates. Please try again later.',
      });
    } finally {
      setLoading(false); // Update loading state to false once the check is complete
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {loading ? (
        <View style={{flex:1, backgroundColor:'white',alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size="large" color="black" style={{ flex: 1, justifyContent: 'center' }} />
          <Text style={{color:'black'}}>App is updating......</Text>
        </View>
      ) : (
        <RootNavigator />
      )}
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: 'green', marginBottom: 50 }}
              text1Style={{ fontSize: 15, fontWeight: '600' }}
              text2Style={{ fontSize: 14 }}
            />
          ),
          info: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: 'blue', marginBottom: 50 }}
              text1Style={{ fontSize: 15, fontWeight: '600' }}
              text2Style={{ fontSize: 14 }}
            />
          ),
          error: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: 'red', marginBottom: 50 }}
              text1Style={{ fontSize: 15, fontWeight: '600' }}
              text2Style={{ fontSize: 14 }}
            />
          ),
        }}
      />
      </PersistGate>
    </Provider>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
