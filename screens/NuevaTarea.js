import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { apiUrl } from '../config';

function NuevaTarea({ navigation }) {
  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    completada: false,
  });

  const onChangeTituloText = titulo => {
    setTarea({ ...tarea, titulo: titulo });
  };

  const onChangeDescripcionText = descripcion => {
    setTarea({ ...tarea, descripcion: descripcion });
  };

  const guardarTarea = async () => {
    try {
      const url = apiUrl + '/tareas';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea),
      });
      const datos = await response.json();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <View>
        <TextInput
          style={styles.input}
          value={tarea.titulo}
          onChangeText={onChangeTituloText}
          placeholder="Título"
        />
        <TextInput
          style={styles.multiline}
          placeholder="Descripción"
          value={tarea.descripcion}
          onChangeText={onChangeDescripcionText}
          multiline
        />
      </View>
      <View style={styles.grupoBotones}>
        <View style={styles.boton}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} />
        </View>
        <Button title="Guardar" onPress={guardarTarea} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  multiline: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    minHeight: 80,
    marginBottom: 8,
  },
  grupoBotones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  boton: {
    marginRight: 10,
  },
});

export default NuevaTarea;
