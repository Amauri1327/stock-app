import React from 'react';
import { StyleSheet, View, Text, Button, Touchable, TouchableOpacity, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-yellow-50'>
      <Text className='text-3xl font-semibold text-gray-700'>Hello World</Text>
      <TouchableOpacity 
          className='absolute top-28 left-6  bg-blue-500 rounded-3xl'
          onPress={() => console.log('Press')}
      >
          <Ionicons name="add" size={70} color="white" /> 
      </TouchableOpacity>
    </View>
  );
}
