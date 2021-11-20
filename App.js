import React from 'react';
import ListaTareas from './screens/ListaTareas';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevaTarea from './screens/NuevaTarea';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de Tareas" component={ListaTareas} />
        <Stack.Screen name="Nueva Tarea" component={NuevaTarea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
