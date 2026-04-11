// import { Stack } from "expo-router";
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";
// import { View } from "react-native";
// import { ThemeProvider, useTheme } from "../src/contexts/Theme/themeContext";
// import { AuthProvider } from "@/src/contexts/Auth/authContext";

// function LayoutContent() {

//   const { theme } = useTheme();

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      
//       <SafeAreaView style={{ backgroundColor: theme.colors.destaque }}>
//         <StatusBar style={theme.mode === "dark" ? "dark" : "light"} translucent />
//       </SafeAreaView>

//       <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//          <Stack
//           screenOptions={{
//             headerShown: false,
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <LayoutContent />
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }
