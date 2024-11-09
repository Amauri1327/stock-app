import {
  Pressable,
  PressableProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = PressableProps & {
  data: {
    id: number;
    name: string;
    quantity: number;
    description: string;
  };
  onDelete: () => void
};

export function Product({ data, onDelete, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 20,
        gap: 12,
        flexDirection: "row",
      }}
      {...rest}
    >
      <Text className="flex-1 font-semibold text-lg">
        {data.name}
        {"\n"}
        - Quantidade: {data.quantity}
        {"\n"}
        - Descrição: {data.description}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete-forever" size={40} color="red" />
      </TouchableOpacity>
    </Pressable>
  );
}
