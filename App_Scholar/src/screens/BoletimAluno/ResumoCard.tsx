
import { View, Text } from "react-native";
import { useTheme } from '@/src/contexts/Theme/themeContext';
export function ResumoCard({
  titulo,
  valor,
}: {
  titulo: string;
  valor: number;
}) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: "48%",
        backgroundColor:
          theme.colors.primary,
        borderRadius: 12,
        padding: 14,
      }}
    >
      <Text
        style={{
          opacity: 0.7,
          fontSize: 12,
          color: theme.colors.text,
        }}
      >
        {titulo}
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: theme.colors.text,
        }}
      >
        {valor}
      </Text>
    </View>
  );
}