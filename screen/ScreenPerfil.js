// ScreenP .js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenP ({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserData');
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          Alert.alert('No hay datos almacenados');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar los datos.');
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Image style={styles.Foto} source={require('../imagenes/avatar.png')}/>
      {data ? (
        <View style = {styles.informacion}>

            <Text style={styles.text}>Nombre: {data.username}</Text>
            <Text style={styles.text}>Apellido: {data.lastname}</Text>
            <Text style={styles.text}>Teléfono: {data.phone}</Text>
            <Text style={styles.text}>Email: {data.email}</Text>
            <Text style={styles.text}>Dirección: {data.address}</Text>
            <Text style={styles.text}>Género: {data.genero}</Text>
            <Text style={styles.text}>Contraseña: {data.pass}</Text>
        </View>
      ) : (
        <Text>No hay datos almacenados.</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E7E9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        margin: 10,
    },
    Foto: {
        objectFit:'fill',
        width: 250,
        height: 250,
        borderRadius: 50,
        marginBottom: 20,
    },

    informacion: {
        backgroundColor: '#f0f0f0',
        borderRadius: 35,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black', 
        shadowOpacity: 0.5, 
        shadowRadius: 4, 
        width: '90%',
        maxWidth: 400,
        padding: 20,
        alignItems: 'flex-start',
    }	
});
