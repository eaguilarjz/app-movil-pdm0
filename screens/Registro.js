import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { apiUrl } from '../config';
import { AuthContext } from '../context/AuthContext';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text>Introduzca sus credenciales</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={val => setEmail(val)}
        value={email}
        placeholder="Correo electrónico"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        onChangeText={val => setPassword(val)}
        value={password}
        placeholder="Contraseña"
        autoComplete="password"
        textContentType="password"
        secureTextEntry
      />
      <Button
        title="Crear mi cuenta"
        onPress={async () => {
          try {
            const url = apiUrl + '/usuarios/registrar';
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });
            const datos = await response.json();
            console.log(datos);
            auth.setIsSignedIn(true);
            auth.setToken(datos.token);
            await auth.saveToken(datos.token);
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
  },
});

export default Registro;
