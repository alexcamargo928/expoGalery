import { StatusBar } from "expo-status-bar";
import {
    Button,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";
export default function Videos() {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [mediaType, setMediaType] = useState("image");
    const navigation = useNavigation(); 
    const fetchMedia = async (first, mediaType) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const media = await MediaLibrary.getAssetsAsync({
                first: first + 30,
                sortBy: MediaLibrary.SortBy.creationTime,
                mediaType:
                    mediaType === "image"
                        ? MediaLibrary.MediaType.photo
                        : MediaLibrary.MediaType.video,
            });
            setGalleryFiles(media.assets);
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Pressable
                onPress={() => {
                    setCurrentImage(item.uri);
                    setMediaType(item.mediaType);
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
            <StatusBar style="auto" />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                    padding: 10,
                }}
            >
                <Button
                    title="Take Video"
                    onPress={() => {
                        navigation.navigate('Camara')
                    }}
                />
            </View>

            {/* view full image in modal */}
            <Modal visible={currentImage !== ""} transparent={false}>
                <View style={{ flex: 1, backgroundColor: 0 }}>
                    <Pressable
                        style={{
                            position: "absolute",
                            top: 40,
                            zIndex: 1,
                            flex: 1,
                            alignSelf: "center",
                        }}
                        title="Close"
                        onPress={() => setCurrentImage("")}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                padding: 10,
                                backgroundColor: "white",
                            }}
                        >
                            Close
                        </Text>
                    </Pressable>
                    {mediaType === "video" ? (
                        <Video
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={{
                                uri: currentImage,
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                        />
                    ) : (
                        <Image
                            source={{ uri: currentImage }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                </View>
            </Modal>
            <View style={styles.scrollContainer}>
                <Text style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}>
                    Galeria
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 20, textAlign: "center" }}>
                    Por favor toque el video que desea detallar
                </Text>
                <FlatList
                    data={galleryFiles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    onEndReached={() => {
                        fetchMedia(galleryFiles.length, mediaType);
                    }}
                    onLayout={() => {
                        fetchMedia(galleryFiles.length, mediaType);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
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
        color: "purple",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    imageContainer: {
        flex: 1,
        margin: 1,
        aspectRatio: 1, // This ensures that images maintain their aspect ratio
        borderRadius: 8,
        overflow: "hidden",
    },
    image: {},
});