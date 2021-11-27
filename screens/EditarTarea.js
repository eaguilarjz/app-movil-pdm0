import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { TareasContext } from '../context/TareasContext';

function EditarTarea({ navigation }) {
  const tareasContext = useContext(TareasContext);

  const [tarea, setTarea] = useState(tareasContext.tareaActual);

  const onChangeTituloText = titulo => {
    setTarea({ ...tarea, titulo: titulo });
  };

  const onChangeDescripcionText = descripcion => {
    setTarea({ ...tarea, descripcion: descripcion });
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
        <Button
          title="Guardar"
          onPress={async () => {
            await tareasContext.modificarTarea(tarea);
            navigation.navigate('Lista de Tareas');
          }}
        />
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

export default EditarTarea;
