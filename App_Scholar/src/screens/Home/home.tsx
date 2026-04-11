import { useTheme } from "@/src/contexts/Theme/themeContext";
import { Text, View } from "react-native";
import { CardCadastro } from "../../components/CardCadastros";
import { DashboardHeader } from "../../components/Dashboard/DashboardHeader";
import { ResumoCard } from "../../components/Dashboard/ResumoCard";
import { Form } from "../../components/Form/Form";
import { cadastrosConfig } from "../../config/cadastros";
import { dashboardResumoConfig } from "../../config/dashboardResumo";
import { useAuth } from "../../hooks/Auth/useAuth";

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();

  if (!user?.usuarioRole) return null;

  const userRole = user.usuarioRole;

  const cadastrosFiltrados = cadastrosConfig.filter((item) =>
    item.roles.includes(userRole),
  );

  const resumoFiltrado = dashboardResumoConfig.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <Form>
      <DashboardHeader />

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {resumoFiltrado.map((item) => (
          <ResumoCard key={item.label} {...item} />
        ))}
      </View>

      <Text
        style={{ marginTop: 10, fontWeight: "bold", color: theme.colors.text }}
      >
        Cadastros
      </Text>

      {/* CADASTROS */}
      {cadastrosFiltrados.map((item) => (
        <CardCadastro
          key={item.title}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          routeName={item.routeName}
          roles={item.roles}
        />
      ))}
    </Form>
  );
}
