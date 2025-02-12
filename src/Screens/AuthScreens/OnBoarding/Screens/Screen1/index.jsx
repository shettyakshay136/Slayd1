import { View, Text, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

const Index = ({ formData, setFormData, onInputComplete }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  useEffect(() => {
    if (formData.username?.trim() && (String(formData.age)?.trim() || "") && formData.phone?.length === 10 && formData.password?.trim()) {
      onInputComplete(true);
    } else {
      onInputComplete(false);
    }
  }, [formData, onInputComplete]);

  return (
    <ScrollView>
      <View style={{ gap: 40 }}>
        <Text style={{ fontSize: 32, fontWeight: '700', color: '#080928' }}>
          Yo! Let’s start with an intro.
        </Text>
        <View style={{ gap: 15 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ color: '#080928', fontSize: 16, fontWeight: '400' }}>
              Your Name
            </Text>
            <TextInput
              style={{
                borderWidth: focusedInput === 'username' ? 2 : 1,
                borderColor: focusedInput === 'username' ? '#080928' : '#CECEDE',
                borderRadius: 12,
                color: '#080928',
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: '600',
                paddingVertical:10
              }}
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
              value={formData.username || ''}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ color: '#080928', fontSize: 16, fontWeight: '400' }}>
              Your password
            </Text>
            <TextInput
              style={{
                borderWidth: focusedInput === 'password' ? 2 : 1,
                borderColor: focusedInput === 'password' ? '#080928' : '#CECEDE',
                borderRadius: 12,
                color: '#080928',
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: '600',
                paddingVertical:10
              }}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              value={formData.password || ''}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ color: '#080928', fontSize: 16, fontWeight: '400' }}>
              Age
            </Text>
            <TextInput
              style={{
                borderWidth: focusedInput === 'age' ? 2 : 1,
                borderColor: focusedInput === 'age' ? '#080928' : '#CECEDE',
                borderRadius: 12,
                color: '#080928',
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: '600',
                paddingVertical:10
              }}
              keyboardType="numeric"
              onFocus={() => handleFocus('age')}
              onBlur={handleBlur}
              value={formData.age || ''}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, age: text }))}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ color: '#080928', fontSize: 16, fontWeight: '400' }}>
              Phone Number
            </Text>
            <View
              style={{
                borderWidth: focusedInput === 'phone' ? 2 : 1,
                borderColor: focusedInput === 'phone' ? '#080928' : '#CECEDE',
                borderRadius: 12,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text style={{ color: '#080928', fontSize: 16, fontWeight: '600' }}>
                +91
              </Text>
              <TextInput
                style={{
                  color: '#080928',
                  fontSize: 16,
                  fontWeight: '600',
                  flex: 1,
                  paddingVertical:10
                }}
                keyboardType="numeric"
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                value={formData.phone || ''}
                onChangeText={(text) => {
                  const validatedText = text.replace(/[^0-9]/g, '').slice(0, 10);
                  setFormData((prev) => ({ ...prev, phone: validatedText }));
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
