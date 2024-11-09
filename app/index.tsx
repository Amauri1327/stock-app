import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

interface Product {
  name: string;
  quantity: string;
  description: string;
}

export default function HomeScreen() {

  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Estados para os campos do formulário
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Limite de caracteres para o campo de descrição
  const descricaoLimite: number = 52;

  const saveProduct = (): void => {

    if (!name.trim() || !quantity.trim() || !description.trim()){
      alert("todos os campos devem ser preenchidos")
      return;
    }

    const product: Product = {
      name,
      quantity,
      description,
    };
    console.log("Produto para enviar pro SQLite")

    setModalVisible(false);
    setName('');
    setQuantity('');
    setDescription('');

  };

  return (
    <View className="flex-1 justify-between items-center">
      <View className="-left-60">
        <Text className="text-3xl font-semibold text-gray-700"></Text>

        <TouchableOpacity
          className="absolute top-28 left-6 bg-blue-500 rounded-3xl"
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
            <View className="w-96 h-auto p-10 bg-white rounded-3xl">
              <Text className="text-3xl font-bold mb-4">Cadastrar produto</Text>
              <Text className="text-xl mb-4">Insira as informações solicitadas</Text>

              {/* Campos do Formulário */}
              <TextInput
                className="bg-gray-200 text-black text-xl p-2 rounded-lg border mb-4"
                placeholder="Nome do produto"
                onChangeText={setName}
                value={name}
              />
              
              <TextInput
                className="bg-gray-200 text-black text-xl p-2 rounded-lg border mb-4"
                placeholder="Quantidade"
                keyboardType="numeric"
                onChangeText={setQuantity}
                value={quantity}
              />
              
              <TextInput
                className="bg-gray-200 text-black text-xl p-2 rounded-lg border mb-4"
                placeholder="Descrição"
                onChangeText={(text) => {
                  // Limitar a entrada a 52 caracteres
                  if (text.length <= descricaoLimite) {
                    setDescription(text);
                  }
                }}
                value={description}
                multiline
              />
              <Text className="text-gray-500 text-right">{description.length}/{descricaoLimite}</Text>

              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-md items-center"
                onPress={saveProduct}
              >
                <Text className="text-white text-2xl">Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
              className="mt-5 bg-red-500 p-3 rounded-md items-center border"
              onPress={() => setModalVisible(false)} 
            >
              <Text className="text-white text-2xl">Fechar</Text>
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
          onSubmitEditing={() => {
            console.log("Teclado");
            setText('');
          }}
        />
        <Feather className="left-56 -top-10" name="search" size={28} color="black" />
      </View>
    </View>
  );
}
