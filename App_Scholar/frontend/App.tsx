import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/Auth/authContext";
import { MensagemProvider } from "./src/contexts/Mensagem/mensagemContext";
import {
  ThemeProvider,
  useTheme,
} from "./src/contexts/Theme/themeContext";
import { Routes } from "./src/routes";

function RootLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View
        style={{
          height: insets.top,
          backgroundColor: theme.colors.destaque,
        }}
      >
        <StatusBar
          style={theme.mode === "dark" ? "dark" : "light"}
          translucent
        />
      </View>

      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Routes />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MensagemProvider>
          <PaperProvider>
            <RootLayout />
          </PaperProvider>
        </MensagemProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
