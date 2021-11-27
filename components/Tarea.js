import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TareasContext } from '../context/TareasContext';

function Tarea({ item, navigation }) {
  const tareasContext = useContext(TareasContext);

  if (item.completada) {
    return (
      <View style={styles.itemContenedor}>
        <View style={styles.itemCompleto}>
          <TouchableOpacity
            onPress={() => {
              tareasContext.setTareaActual(item);
              navigation.navigate('Editar Tarea');
            }}
          >
            <Text>{item.titulo}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => tareasContext.completarTarea(item.id, false)}
        >
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={24}
            color="black"
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tareasContext.borrarTarea(item.id)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.itemContenedor}>
        <View style={styles.itemIncompleto}>
          <TouchableOpacity
            onPress={() => {
              tareasContext.setTareaActual({ ...item });
              navigation.navigate('Editar Tarea');
            }}
          >
            <Text>{item.titulo}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => tareasContext.completarTarea(item.id, true)}
        >
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="black"
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tareasContext.borrarTarea(item.id)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 16,
  },
  itemIncompleto: {
    textAlign: 'justify',
    marginRight: 20,
    flex: 1,
  },
  itemCompleto: {
    textAlign: 'justify',
    marginRight: 20,
    textDecorationLine: 'line-through',
    flex: 1,
  },
  checkbox: {
    marginRight: 16,
  },
});

export default Tarea;
