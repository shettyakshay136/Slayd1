import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [likeData, setlikedata] = useState(null);
  const [wishlistData, setwishlistdata] = useState(null);
  const [ATCData, setATCdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = useSelector(state => state.auth.userId);


  const LikeApi = async () => {
    try {
      const savedUserId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`https://api.slayd.in/activity/activity?user_id=${savedUserId}&action=like`);
      setlikedata(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const WishlistApi = async () => {
    try {
      const savedUserId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`https://api.slayd.in/activity/activity?user_id=${savedUserId}&action=save`);
      setwishlistdata(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const ATCApi = async () => {
    try {
      const savedUserId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`https://api.slayd.in/activity/activity?user_id=${savedUserId}&action=wishlist`);
      setATCdata(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Combined Fetch Function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([LikeApi(), WishlistApi() , ATCApi()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        likeData,
        wishlistData,
        loading,
        error,
        fetchData,
        ATCData
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};


export const useScreenContext = () => {
  return useContext(ActivityContext);
};
