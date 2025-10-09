import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { io, Socket } from "socket.io-client";

interface VideoFrameMessage {
    data: string; // base64 JPEG data
}

const SERVER_URL = "http://192.168.2.2:5000";

const VideoStream: React.FC = () => {
    const [frame, setFrame] = useState<string | null>(null);

    useEffect(() => {
        const socket: Socket = io(SERVER_URL, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Connected to video stream server");
        });

        socket.on("video_frame", (msg: VideoFrameMessage) => {
            setFrame(`data:image/jpeg;base64,${msg.data}`);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from video stream server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <View style={styles.container}>
            {frame && <Image source={{ uri: frame }} style={styles.image} />}
        </View>
    );
};

export default VideoStream;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
});
