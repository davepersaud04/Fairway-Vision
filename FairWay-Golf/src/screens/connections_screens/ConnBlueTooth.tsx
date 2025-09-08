import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import ScreenName from '../../constant/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.ConnBlueTooth>


const ConnBlueTooth = ({ route, navigation }: Props) => {

    const openSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:'); // Redirects to iOS settings
        } else {
            Linking.openSettings(); // Opens Android settings
        }
    };

    const handleContinue = () => {
        navigation.navigate(ScreenName.InitialWelcome,
            {
                title: "Welcome Screen",
                userID: "0101"
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please check if your Bluetooth is ON</Text>
            <Text style={styles.subtitle}>
                To continue, find the bluetooth device called FairWayGlasses-XXXXX and connect to it.
                WIFI NAME: FairWayGlasses-XXXXX
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
                    <Text style={styles.buttonText}>Go to Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    settingsButton: {
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
});

export default ConnBlueTooth;