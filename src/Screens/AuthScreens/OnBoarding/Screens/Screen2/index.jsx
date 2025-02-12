import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Circle, CheckedCircel } from '../../../../../Assets/Svg';

const Screen2 = ({ formData, setFormData, onInputComplete }) => {
  const [selectedGender, setSelectedGender] = useState(formData.gender);

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setFormData({ ...formData, gender });
    if (gender) {
      onInputComplete(true);
    } else {
      onInputComplete(false);
    }
  };

  return (
    <ScrollView>
      <View style={{ gap: 25 }}>
        <Text style={{ fontSize: 32, fontWeight: '700', color: '#080928' }}>
          Select the gender that best describes you
        </Text>
        <View style={{ gap: 15 }}>
          <TouchableOpacity
            onPress={() => handleSelect('Female')}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            {selectedGender === 'Female' ? <CheckedCircel /> : <Circle />}
            <Text style={{ fontSize: 16, color: '#080928', marginLeft: 10, fontWeight: '400' }}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelect('Male')}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            {selectedGender === 'Male' ? <CheckedCircel /> : <Circle />}
            <Text style={{ fontSize: 16, color: '#080928', marginLeft: 10, fontWeight: '400' }}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelect('Non Binary')}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            {selectedGender === 'Non Binary' ? <CheckedCircel /> : <Circle />}
            <Text style={{ fontSize: 16, color: '#080928', marginLeft: 10, fontWeight: '400' }}>
              Non Binary
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Screen2;
