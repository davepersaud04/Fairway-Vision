import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface RecordButtonProps {
    onStartRecording?: () => void;
    onStopRecording?: () => void;
}

const RecordButton = ({ onStartRecording, onStopRecording }: RecordButtonProps) => {
    const [isRecording, setIsRecording] = useState(false);

    const handlePress = () => {
        if (isRecording) {
            onStopRecording?.(); // Call if provided
        } else {
            onStartRecording?.(); // Call if provided
        }
        setIsRecording(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, isRecording ? styles.stopButton : styles.recordButton]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    {isRecording ? "STOP" : "RECORD"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecordButton;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        width: 160,
        height: 55,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    recordButton: {
        backgroundColor: "#e63946", // Red
    },
    stopButton: {
        backgroundColor: "#2a9d8f", // Teal
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1,
    },
});
