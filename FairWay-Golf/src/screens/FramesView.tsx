import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import ScreenName from "../constant/ScreenName";
import { getDataStore, getRecordDir } from "../../GolfFileSystem";
import { Directory, File } from "expo-file-system";

interface FrameItem {
    title: string;
    source: string; // You can make this ImageSourcePropType if using local or remote images
}

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.FramesView>

const FramesView = ({ route, navigation }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState<FrameItem | null>(null);
    const recording = useRef<Directory | null>(null);
    useEffect(() => {
        if (recording.current === null) {
            recording.current = getRecordDir(route.params.recordDirName);
        }
        const currentFrame = new File(recording.current as Directory, "SEQ_NUM_" + currentIndex.toString());
        setCurrentImage({
            title: currentFrame.name,
            source: `data:image/jpeg;base64,${currentFrame.textSync()}`,
        });
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex === (recording.current as Directory).list().length - 1) {
            console.log('Out of bounds');
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            console.log('Out of bounds');
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentImage?.title}</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                    <Ionicons name="chevron-back" size={32} color="#333" />
                </TouchableOpacity>

                <Image source={{ uri: currentImage?.source }} style={styles.image} resizeMode="contain" />

                <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                    <Ionicons name="chevron-forward" size={32} color="#333" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backButton} >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FramesView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    image: {
        width: 250,
        height: 250,
        marginHorizontal: 20,
    },
    arrowButton: {
        padding: 10,
    },
    backButton: {
        width: "80%",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});
