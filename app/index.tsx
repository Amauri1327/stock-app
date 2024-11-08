import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
export default function HomeScreen() {

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (





    <View className="flex-1 justify-between items-center">
      <View className="-left-60">
        <Text className="text-3xl font-semibold text-gray-700"></Text>


        <TouchableOpacity
          className="absolute top-28 left-6  bg-blue-500 rounded-3xl"
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={70} color="white" />
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >  
        <View className="flex-1 justify-center items-center bg-gray-300">
          <View className="w-72 p-20 bg-white rounded-3xl">
          <Text className="text-2xl font-bold mb-4">Modal Simples</Text>
            <Text>Essa é uma modal simples com uma mensagem.</Text>


            <TouchableOpacity
                className="mt-5 bg-slate-200 p-3 rounded-md items-center border"
                onPress={() => setModalVisible(false)} 
            >
              <Text className="text-black text-2xl">Fechar</Text>

            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      </View>
      











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
