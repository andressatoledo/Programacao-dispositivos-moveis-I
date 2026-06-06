import { ThemeType } from "@/frontend/src/contexts/Theme/themeContext"; // Ajuste conforme seu path
import { StyleSheet } from "react-native";
export const Styles = (theme: ThemeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.backgroundCard,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,

      borderWidth: 1,
      borderColor: theme.colors.space,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.mode === "light" ? 0.05 : 0.2,
      shadowRadius: 6,
      elevation: 3,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },

    disciplina: {
      fontSize: theme.sizes.mediumText.fontSize,
      fontWeight: "700",
      color: theme.colors.text,
      flex: 1,
      marginRight: 8,
    },

    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.space,
    },

    infoItem: {
      flex: 1,
    },

    infoLabel: {
      fontSize: 11,
      color: theme.colors.opaco,
      marginBottom: 4,
    },

    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
    },

    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      marginTop: 8,
    },

    progressText: {
      fontSize: 12,
      color: theme.colors.opaco,
    },

    progressPercent: {
      fontSize: 12,
      fontWeight: "700",
    },

    badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: "700",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },

    notaBox: {
      backgroundColor: theme.colors.space,
      borderRadius: 10,
      padding: 12,
      width: "30%",
      alignItems: "center",
    },

    mediaBox: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      padding: 12,
      width: "30%",
      alignItems: "center",
    },

    notaValue: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
    },

    mediaValue: {
      color: "#FFF", // 🔥 contraste máximo
      fontSize: 22, // 🔥 maior que os outros
      fontWeight: "800",
    },

    notaLabel: {
      fontSize: 10,
      color: theme.colors.opaco,
      marginTop: 4,
      textTransform: "uppercase",
    },

    // 👇 só para média
    mediaLabel: {
      color: "#FFF",
      opacity: 0.8,
    },

    progressBg: {
      height: 6,
      backgroundColor: theme.colors.space,
      borderRadius: 3,
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      borderRadius: 3,
    },
  });
