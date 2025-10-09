import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ScreenName from '../constant/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import BottomNavBar from './components/GlobalComponents/BottomNavBar';
import VideoStream from './components/RecordingComponents/VideoStream';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Recording>


export default function Recording({ route, navigation }: Props) {

    const [isRecording, setRecordingStatus] = useState(false);
    const [buttonString, setButtonString] = useState("Record");

    const startRecord = () => {
        if (isRecording === true) {
            setRecordingStatus(false);
            setButtonString("Record")
        } else {
            setRecordingStatus(true);
            setButtonString("STOP");
        }
    };

    return (
        <View style={styles.container}>
            <VideoStream />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.recordButton} onPress={startRecord}>
                    <Text style={styles.buttonText}>{buttonString}</Text>
                </TouchableOpacity>
            </View>
            <BottomNavBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
    },
    recordButton: {
        flex: 1,
        backgroundColor: '#ff6b6b',
        padding: 15,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButton: {
        flex: 1,
        backgroundColor: '#4caf50',
        padding: 15,
        marginLeft: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})