import { StatusBar } from "expo-status-bar";
import {Button,FlatList,Modal,Pressable,StyleSheet,Text,View} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function Videos() {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentVideo, setCurrentVideo] = useState("");
    const [mediaType, setMediaType] = useState("video");

    const navigation = useNavigation(); 

    const fetchMedia = async (first, mediaType) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const media = await MediaLibrary.getAssetsAsync({
                first: first + 30,
                sortBy: MediaLibrary.SortBy.creationTime,
                mediaType: MediaLibrary.MediaType.video,
            });
            setGalleryFiles(media.assets);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.videoContainer}>
            <Pressable
                onPress={() => {
                    setCurrentVideo(item.uri);
                }}
            >
                <Video
                    source={{ uri: item.uri }}
                    style={{ width: 200, height: 200 }}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isMuted={true}
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
                    justifyContent: "space-around",
                    width: "100%",
                    padding: 10,
                }}
            >
                <Button
                    title="Take Videos"
                    onPress={() => navigation.navigate("Camara")} 
                />
            </View>

            <Text style={styles.heading}>Galería de Videos</Text>
            <Text style={styles.heading2}>Por favor toque el video que desea detallar</Text>

            

            {/* View full video in modal */}
            <Modal visible={currentVideo !== ""} transparent={false}>
                <View style={{ flex: 1, backgroundColor: "black" }}>
                    <Pressable
                        style={{
                            position: "absolute",
                            top: 40,
                            zIndex: 1,
                            flex: 1,
                            alignSelf: "center",
                        }}
                        title="Close"
                        onPress={() => setCurrentVideo("")}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                padding: 10,
                                backgroundColor: "black",
                            }}
                        >
                            Close
                        </Text>
                    </Pressable>
                    <Video
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={{ uri: currentVideo }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
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
    videoContainer: {
        flex: 1,
        margin: 1,
        aspectRatio: 1, // This ensures that videos maintain their aspect ratio
        borderRadius: 8,
        overflow: "hidden",
    },
});
