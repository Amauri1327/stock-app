import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import {
  useProductDatabase,
  ProductDatabase,
} from "@/database/useProductDatabase";
import { Product } from "@/components/Product";

interface Product {
  name: string;
  quantity: number;
  description: string;
}

export default function HomeScreen() {
  const [text, setText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Estados para os campos do formulário
  const [id, setId] = useState("");
  const [name, setName] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [products, setProducts] = useState<ProductDatabase[]>([]);

  const productDatabase = useProductDatabase();

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!");
      }

      const response = await productDatabase.create({
        name,
        quantity,
        description,
      });

      return Alert.alert(
        "Produto cadastrado com o ID: " + response.insertedRowId
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!");
      }

      const response = await productDatabase.update({
        id: Number(id),
        name,
        quantity,
        description,
      });

      Alert.alert("Produto atualizado!")
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await productDatabase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(id: number){
      try {
        await productDatabase.remove(id)
        list()
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    list();
  }, [search]);

  function details (item:ProductDatabase){
      setId(String(item.id))
      setName(item.name)
      setQuantity(item.quantity)
      setDescription(item.description)
      setModalVisible(true)
  }

  async function handleSave() {
    if (id){
      update()
    } else {
      create()
    }
    setId('')
    setName('')
    setQuantity(0)
    setDescription('')
    setModalVisible(false)
    await list()

  }

  // Limite de caracteres para o campo de descrição
  const descricaoLimite: number = 52;

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
              <Text className="text-3xl font-bold mb-4">Cadastrar/Atualizar produto</Text>
              <Text className="text-xl mb-4">
                Insira as informações solicitadas
              </Text>

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
                onChangeText={(text) => {
                  const parsedValue = parseInt(text, 10);
                  if (!isNaN(parsedValue)) {
                    setQuantity(parsedValue);
                  }
                }}
                value={quantity.toString()}
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
              <Text className="text-gray-500 text-right">
                {description.length}/{descricaoLimite}
              </Text>

              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-md items-center"
                onPress={handleSave}
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
          onChangeText={setSearch}
        />
        <Feather
          className="left-56 -top-10"
          name="search"
          size={28}
          color="black"
        />

        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Product data={item} onPress={() => details(item)} onDelete={() => remove(item.id)}/>}
          contentContainerStyle={{ gap: 13 }}
        />
      </View>
    </View>
  );
}
