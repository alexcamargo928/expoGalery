import { StatusBar } from "expo-status-bar";
import { Button, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image } from "expo-image";

export default function Fotos() {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentImage, setCurrentImage] = useState("");

    const navigation = useNavigation(); 
    
    const fetchMedia = async (first) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status === "granted") {
            const media = await MediaLibrary.getAssetsAsync({
                first: first + 30,
                sortBy: MediaLibrary.SortBy.creationTime,
                mediaType: MediaLibrary.MediaType.photo,
            });
            setGalleryFiles(media.assets);
        }
    };
    
    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Pressable
                onPress={() => {
                    setCurrentImage(item.uri);
                }}
            >
                <Image
                    source={{ uri: item.uri }}
                    style={{ width: 200, height: 200 }}
                />
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    padding: 10,
                }}
            >
                <Button
                    title="Take Image"
                    onPress={() => navigation.navigate("Camara")} 
                />
            </View>

            <StatusBar style="auto" />
            <Text style={styles.heading}>Galería</Text>
            <Text style={styles.heading2}>Por favor toque la imagen que desea detallar</Text>


            {/* View full image in modal */}
            <Modal visible={currentImage !== ""} transparent={false}>
                <View style={styles.modalContainer}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setCurrentImage("")}
                    >
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                    <Image
                        source={{ uri: currentImage }}
                        style={styles.fullImage}
                    />
                </View>
            </Modal>
            <View style={styles.scrollContainer}>
                <FlatList
                    data={galleryFiles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    onEndReached={() => {
                        fetchMedia(galleryFiles.length);
                    }}
                    onLayout={() => {
                        fetchMedia(galleryFiles.length);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
    },
    scrollContainer: {
        flex: 1,
        marginTop: 20,
        width: "100%",
    },
    heading: {
        color: "black",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
    },
    heading2: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 1,
        aspectRatio: 1, // Esto asegura que las imágenes mantengan su relación de aspecto
        borderRadius: 8,
        overflow: "hidden",
    },
    fullImage: {
        width: "100%",
        height: "100%",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    closeButton: {
        position: "absolute",
        top: 40,
        zIndex: 1,
        alignSelf: "center",
        padding: 10,
    },
    closeText: {
        color: "white",
        fontSize: 20,
        backgroundColor: "black",
    },
    
});
