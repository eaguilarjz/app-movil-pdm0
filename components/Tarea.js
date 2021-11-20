import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Tarea({ item, completarTarea }) {
  if (item.completada) {
    return (
      <View style={styles.itemContenedor}>
        <Text style={styles.itemCompleto}>{item.titulo}</Text>
        <TouchableOpacity onPress={() => completarTarea(item.id, false)}>
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={24}
            color="black"
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="black"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.itemContenedor}>
        <Text style={styles.itemIncompleto}>{item.titulo}</Text>
        <TouchableOpacity onPress={() => completarTarea(item.id, true)}>
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="black"
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="black"
        />
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
