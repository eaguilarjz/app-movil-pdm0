import React, { useContext, useState } from 'react';
import ListaTareas from './screens/ListaTareas';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevaTarea from './screens/NuevaTarea';
import EditarTarea from './screens/EditarTarea';
import Registro from './screens/Registro';
import Login from './screens/Login';
import { AuthContext } from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function Principal() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Lista de Tareas" component={ListaTareas} />
          <Stack.Screen name="Nueva Tarea" component={NuevaTarea} />
          <Stack.Screen name="Editar Tarea" component={EditarTarea} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
