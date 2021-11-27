import React from 'react';
import ListaTareas from './screens/ListaTareas';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevaTarea from './screens/NuevaTarea';
import { TareasProvider } from './context/TareasContext';
import EditarTarea from './screens/EditarTarea';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TareasProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Lista de Tareas" component={ListaTareas} />
          <Stack.Screen name="Nueva Tarea" component={NuevaTarea} />
          <Stack.Screen name="Editar Tarea" component={EditarTarea} />
        </Stack.Navigator>
      </NavigationContainer>
    </TareasProvider>
  );
}
