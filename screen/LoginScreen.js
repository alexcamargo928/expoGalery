import React, { useState } from "react";
import { Text, Image, View, ImageBackground, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigation = useNavigation();

    const handleButtonPress = async () => {
        if (!userEmail || !userPassword) {
            simpleAlertHandler('Debe diligenciar los campos presentados.', 0);
            return false;
        }

        const dataUser = await AsyncStorage.getItem('UserData');
        if (dataUser) {
            const parseData = JSON.parse(dataUser);

            if (parseData.email === userEmail && parseData.pass === userPassword) {
                simpleAlertHandler('Datos existentes', 1);
            } else {
                simpleAlertHandler('Credenciales incorrectas', 0);
            }
        } else {
            simpleAlertHandler('No hay datos de usuario almacenados', 0);
        }

        setEmail(''); // Limpiar el campo de Email
        setPassword(''); // Limpiar el campo de Contraseña
    };

    const simpleAlertHandler = (message, value) => {
        Alert.alert(message, '', [{ text: 'OK', onPress: () => value === 1 && navigation.navigate('StackScreen') }]);
    };

    return (
        <ImageBackground style={styles.BackImage} source={require('../imagenes/FondoMovil.png')}>
            <View style={styles.container}>
                <View style={styles.ContainerAvatar}>
                    <Image style={styles.imageAvatar} source={require('../imagenes/avatar.png')} />
                </View>
                <View style={styles.tarjeta}>
                    <View style={styles.cajaTexto}>
                        <TextInput
                            placeholder="correo@gmail.com"
                            style={styles.input}
                            onChangeText={(text) => setEmail(text)}
                            value={userEmail}
                        />
                    </View>
                    <View style={styles.cajaTexto}>
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            value={userPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.padreButton}>
                        <TouchableOpacity
                            style={styles.cajaBoton}
                            onPress={handleButtonPress}
                        >
                            <Text style={styles.textoBoton}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.padreButton}>
                        <TouchableOpacity
                            style={styles.cajaLink}
                            onPress={() => navigation.navigate('Registro')}
                        >
                            <Text style={styles.textoLink}>Sign UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    BackImage: {
        width: '100%',
        height: '100%',
    },
    imageAvatar: {
        width: 150,
        height: 150,
        marginTop: 80,
    },
    ContainerAvatar: {
        alignItems: 'center',
    },
    tarjeta: {
        marginTop: 60,
        marginLeft: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10,
    },
    input: {
        paddingHorizontal: 15,
    },
    padreButton: {
        alignItems: 'center',
    },
    cajaBoton: {
        backgroundColor: 'purple',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 10,
    },
    cajaLink: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 10,
    },
    textoBoton: {
        textAlign: 'center',
        color: 'white',
    },
    textoLink: {
        color: 'purple',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});
