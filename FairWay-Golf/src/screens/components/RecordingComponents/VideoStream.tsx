import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { io, Socket } from "socket.io-client";
import { Connection, ConnectionType, DevConnection, WifiConnection } from "../../../constant/apiTypes";

interface VideoFrameMessage {
    data: string; // base64 JPEG data
}

interface Recording_Props {
    SERVER_URL: string,
    isRecording: boolean
}
// const SERVER_URL = "http://192.168.2.2:5000";

const VideoStream = ({ SERVER_URL, isRecording }: Recording_Props) => {
    const [frame, setFrame] = useState<string | null>(null);
    console.log(isRecording);
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
        <View>
            {frame && <Image source={{ uri: frame }} style={styles.image} />}
        </View>
    );
};

export default VideoStream;

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 400,
        resizeMode: "contain",
    },
});
