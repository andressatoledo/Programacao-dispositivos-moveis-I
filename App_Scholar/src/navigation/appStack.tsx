import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../src/contexts/Theme/themeContext';

import { RootStackParamList } from './types';
import BottomTabs from './bottomTabs';

//Abastecimento
import { Curso } from '../screens/Cadastros/Curso';
import {CursoForm} from '../screens/Cadastros/Curso/CursoForm'


const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{
          headerShown: false,
          
        }}
      />

      {/* <Stack.Screen
        name="ViagemForm"
        component={ViagemForm}
        options={{ title: 'Viagem', headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerShadowVisible:false,
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}
      /> */}

      <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: 'Alunos', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: 'Alunos', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: 'Boletim', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: 'Boletim', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: 'Cursos', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: 'Cursos', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: 'Disciplinas', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: 'Disciplinas', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: 'Professores', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: 'Professores', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

     
    </Stack.Navigator>
  );
}
