import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { apiUrl } from '../config';
import Tarea from '../components/Tarea';

function ListaTareas({ navigation }) {
  const [tareas, setTareas] = useState([{ id: 1, titulo: 'Titulo' }]);

  const obtenerTareas = useCallback(async () => {
    try {
      const url = apiUrl + '/tareas';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const datos = await response.json();
      setTareas(datos);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    /* Lógica para llenar la lista de tareas desde la API */
    obtenerTareas();
  }, [obtenerTareas]);

  const completarTarea = async (id, completada) => {
    try {
      const url = apiUrl + '/tareas/' + id;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completada: completada,
        }),
      });
      const datos = await response.json();
      setTareas([...tareas.map(tarea => (tarea.id === id ? datos : tarea))]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <Tarea item={item} completarTarea={completarTarea} />
  );

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={tareas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.button}>
        <Button title="Refrescar" onPress={obtenerTareas} />
        <Button
          title="Nueva tarea"
          onPress={() => navigation.navigate('Nueva Tarea')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ListaTareas;
