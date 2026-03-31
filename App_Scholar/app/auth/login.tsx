import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/hooks/Auth/useAuth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  function handleLogin(role: 'aluno' | 'professor' | 'admin') {
    login({
      user: {
        usuarioId: '1',
        usuarioNome: 'Andressa',
        usuarioRole: role,
      },
      token: '123',
    });

    router.replace('/'); // vai pro app
  }

  return (
    <View style={{ gap: 10 }}>
      <Text>Login</Text>

      <Button title="Entrar como Aluno" onPress={() => handleLogin('aluno')} />
      <Button title="Entrar como Professor" onPress={() => handleLogin('professor')} />
      <Button title="Entrar como Admin" onPress={() => handleLogin('admin')} />
    </View>
  );
}