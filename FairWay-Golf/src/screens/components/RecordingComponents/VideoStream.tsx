import React, { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { io, Socket } from "socket.io-client";
import { Connection, ConnectionType, DevConnection, WifiConnection } from "../../../constant/apiTypes";
import RecordButton from "./RecordingButton";
import { File, Directory, Paths } from "expo-file-system";
import { getDataStore } from "../../../../GolfFileSystem";

interface VideoFrameMessage {
    data: string; // base64 JPEG data
}

interface Recording_Props {
    SERVER_URL: string,
}
// const SERVER_URL = "http://192.168.2.2:5000";

const storeFrame = async (data: string, seqNumber: number, currentRecordingDirectory: Directory) => {
    try {
        const frameFile = new File(currentRecordingDirectory, "SEQ_NUM_" + seqNumber.toString());
        if (!frameFile.exists) {
            frameFile.create();
        }
        frameFile.write(data);
    } catch (error) {
        console.log(error);
    }
}



const VideoStream = ({ SERVER_URL }: Recording_Props) => {
    const [frame, setFrame] = useState<string | null>(null);
    const [currentRecording, setcurrentRecoding] = useState<Directory | null>(null);
    const frameNum = useRef(0);
    useEffect(() => {
        const socket: Socket = io(SERVER_URL, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Connected to video stream server");
        });

        socket.on("video_frame", (msg: VideoFrameMessage) => {
            setFrame(`data:image/jpeg;base64,${msg.data}`);
            // console.log(currentRecording);
            if (currentRecording) {
                storeFrame(msg.data, frameNum.current, currentRecording);
                frameNum.current = frameNum.current + 1;
            }
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from video stream server");
        });

        return () => {
            socket.disconnect();
        };
    }, [currentRecording]);
    return (
        <View>
            {frame && <Image source={{ uri: frame }} style={styles.image} />}
            <RecordButton
                onStartRecording={() => {
                    const dataStoreDir = getDataStore();
                    if (dataStoreDir) {
                        const now = new Date();
                        const newRecordingDir = new Directory(dataStoreDir, now.toISOString());
                        // const newRecordingDir = new Directory(dataStoreDir, "temp.dir");
                        console.log(now.toISOString())
                        try {
                            newRecordingDir.create();
                            setcurrentRecoding(newRecordingDir);
                        } catch (error) {
                            newRecordingDir.delete();
                            console.log(error);
                            console.log("PIZDETZ, direcorty failed");
                        }
                    }
                }}
                onStopRecording={() => {
                    frameNum.current = 0;
                    setcurrentRecoding(null);
                }}
            />
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
