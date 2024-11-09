import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  data: {
    name: string;
    quantity: number;
    description: string;
  };
};

export function Product({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
      }}
      {...rest}
    >
      <Text>
        Nome: {data.name}{"\n"}
        Quantidade: {data.quantity}{"\n"}
        Descrição: {data.description}
      </Text>
    </Pressable>
  );
}
