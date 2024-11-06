import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [text, setText] = useState('');

  return (
    <View className="flex-1 justify-between items-center">
      <Text className="text-3xl font-semibold text-gray-700"></Text>
      <TouchableOpacity
        className="absolute top-28 left-6  bg-blue-500 rounded-3xl"
        onPress={() => console.log("Press")}
      >
        <Ionicons name="add" size={70} color="white" />
      </TouchableOpacity>
      <View className="flex-1 m-24">
        <TextInput
          className="bg-gray-200 text-black left-4 text-2xl w-64 p-2 rounded-lg border"
          placeholder="Pesquisar produto"
          onChangeText={setText}
          value={text}
          onSubmitEditing={()=> {
            console.log("Teclado");
            setText('');
          }}
        ></TextInput>
        <Feather className="left-56 -top-10" name="search" size={28} color="black" />
      </View>
    </View>
  );
}
