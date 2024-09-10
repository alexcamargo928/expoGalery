import React from "react";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyButtons = () => {

    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
                <Feather name="user" size={70} color="white" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Entypo name="folder-video" size={70} color="white" onPress={() => navigation.navigate("Videos")}/>
                <Text style={styles.buttonText}>Videos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Galeria")} >
                <Entypo name="images" size={70} color="white" />
                <Text style={styles.buttonText}>Fotos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="music-circle" size={70} color="white" />
                <Text style={styles.buttonText}>Audios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <MaterialIcons name="sports-soccer" size={70} color="white" />
                <Text style={styles.buttonText}>Ocio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <MaterialCommunityIcons name="exit-run" size={70} color="white" />
                <Text style={styles.buttonText}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: 'purple',
        width: '43%', // Ajusta el ancho según sea necesario
        height: 120, // Altura fija para todos los botones
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 20, // Ajusta el margen superior según sea necesario
    },
    buttonText: {
        fontSize: 18, // Tamaño de fuente ajustado para mayor legibilidad
        color: 'white',
    },
});

export default MyButtons;
