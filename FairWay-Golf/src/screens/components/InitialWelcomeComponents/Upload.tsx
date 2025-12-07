import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { getDataStore } from "../../../../GolfFileSystem";
import { File, Directory } from "expo-file-system";
import axios from "axios";

interface UploadProps {
    visible: boolean;
    onClose?: () => void;
}

interface UploadListItem {
    recordName: string,
    recordDir: Directory,
    numFiles: number | string,
    completedFiles: number | string,
}

const uploadDir = async (recordDir: Directory, recordName: string): Promise<boolean> => {
    const frame_list = recordDir.list();
    console.log(frame_list.length)
    for (const frame of frame_list) {
        try {
            await uploadImage((frame as File).name, (frame as File).textSync(), recordName);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return true;
}

const uploadImage = async (frame_name: string, frame_data: string, record_id: string) => {
    const serverUrl = "http://107.20.221.237:5001/";
    const formData = new FormData();
    formData.append('frame', frame_data);
    formData.append('record_id', record_id);
    formData.append('seq_num', frame_name);
    try {
        const response = await axios.post(serverUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

const Upload: React.FC<UploadProps> = ({ visible, onClose }) => {
    const onFirstRender = useRef(true);
    const upload_list = useRef<UploadListItem[]>([]);
    const [isUpload, setUpload] = useState(false);
    useEffect(() => {
        if (!visible || !isUpload) {
            return;
        }
        const uploadHelper = async (): Promise<Boolean> => {
            for (let record_index = 0; record_index < upload_list.current.length; record_index++) {
                const recordDir: Directory = upload_list.current[record_index].recordDir;
                const recordName: string = upload_list.current[record_index].recordName;
                const status = await uploadDir(recordDir, recordName);
                if (!status) {
                    return false;
                }
            }
            setUpload(false);
            return true;
        }
        uploadHelper();
    }, [isUpload]);

    if (!visible) {
        upload_list.current = [];
        onFirstRender.current = true;
        return null;
    };

    //On component Load, render all records that exist in data store
    if (onFirstRender.current && visible) {
        const dataStore = getDataStore();
        if (dataStore) {
            const record_list = dataStore.list();
            for (const record of record_list) {
                upload_list.current.push({
                    recordName: record.name,
                    recordDir: record as Directory,
                    numFiles: '--', //place holder till record starts uploading
                    completedFiles: '--',
                })
            }
        }
        onFirstRender.current = false;
    }

    const onUpload = () => {
        setUpload(true);
    };
    return (
        <View style={styles.overlayContainer}>
            <View style={styles.backdrop} />

            <View style={styles.centerContainer}>
                <Text style={styles.title}>Upload Recording</Text>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {upload_list.current.map((record, i) => (
                        <View key={i} style={styles.item}>
                            <Text style={styles.recordItemText}>{record.recordName}</Text>
                            <Text style={styles.frameCompleteText}> {record.completedFiles}/{record.numFiles}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={onUpload}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    centerContainer: {
        position: "absolute",
        width: "85%",
        maxHeight: "40%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    item: {
        paddingVertical: 8,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recordItemText: {
        color: 'black',
        fontSize: 16,
        textAlign: "left",
    },
    frameCompleteText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    closeButton: {
        backgroundColor: "#999",
    },
    uploadButton: {
        backgroundColor: "#007AFF",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default Upload;
