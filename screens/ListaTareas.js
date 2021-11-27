import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import Tarea from '../components/Tarea';
import { TareasContext } from '../context/TareasContext';
function ListaTareas({ navigation }) {
  const tareasContext = useContext(TareasContext);

  const renderItem = ({ item }) => (
    <Tarea item={item} navigation={navigation} />
  );

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={tareasContext.tareas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.button}>
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
