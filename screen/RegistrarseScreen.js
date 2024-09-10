import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function RegistrarseScreen() {
    const navigation = useNavigation();

    const data = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Femenino', value: 'Femenino' },
        { label: 'Ninguno', value: 'Ninguno' },
    ];

    const [userName, setName] = useState('');
    const [userLastName, setLastName] = useState('');
    const [userPhone, setPhone] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userAddress, setAddress] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [userPassword, setPassword] = useState('');

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Género
                </Text>
            );
        }
        return null;
    };

    const saveDataRegister = async () => {
        if (!userName || !userLastName || !userPhone || !userEmail || !userAddress || !value || !userPassword) {
            simpleAlertHandler('Debe diligenciar todos los campos.', 0);
        } else {
            simpleAlertHandler('Los datos fueron almacenados.', 1);

            const data = {
                username: userName,
                lastname: userLastName,
                phone: userPhone,
                email: userEmail,
                address: userAddress,
                genero: value,
                pass: userPassword
            };

            await AsyncStorage.setItem('UserData', JSON.stringify(data));
        }
    };

    const simpleAlertHandler = (message, value) => {
        Alert.alert(message, '', [{ text: 'OK', onPress: () => value === 1 && navigation.navigate('Login') }]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Nombre Completo'
                    style={styles.input}
                    onChangeText={setName}
                    value={userName}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Apellido Completo'
                    style={styles.input}
                    onChangeText={setLastName}
                    value={userLastName}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Teléfono'
                    style={styles.input}
                    onChangeText={setPhone}
                    value={userPhone}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={setEmail}
                    value={userEmail}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Dirección'
                    style={styles.input}
                    onChangeText={setAddress}
                    value={userAddress}
                />
            </View>
            <View style={styles.cajaTexto}>
                {renderLabel()}
                <Dropdown
                    search
                    maxHeight={300}
                    labelField='label'
                    valueField='value'
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder='Search...'
                    data={data}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign 
                            style={styles.icon} 
                            color={isFocus ? 'blue' : 'black'} 
                            name='Safety' 
                            size={20} 
                        />
                    )}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    onChangeText={setPassword}
                    value={userPassword}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.cajaBoton}>
                <Button title='Registrar' color='purple' onPress={saveDataRegister} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        shadowColor: 'black',
        height: '100%',
        borderColor: 'silver',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20
    },
    cajaTexto: {
        backgroundColor: '#E0E0E0',
        padding: 14,
        borderRadius: 12,
        margin: 12
    },
    cajaBoton: {
        margin: 12
    },
    input: {
        paddingHorizontal: 15
    },
    label: {
        position: 'absolute',
        left: 12,
        top: -10,
        fontSize: 12,
        fontWeight: 'bold'
    },
    icon: {
        marginRight: 5
    }
});
