import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, TextInput } from 'react-native';
import ScreenName from '../../constant/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.ConnHotSpotP2>


const ConnHotSpotP2 = ({ route, navigation }: Props) => {

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

    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <Text style={styles.title}>Please check if your Mobile WIFI HotSpot is ON</Text>
                <Text style={styles.subtitle}>
                    To continue, look at the name and password of your hotspot and enter it into the box bellow.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="WIFI SSID:"
                    value={ssid}
                    onChangeText={setSsid}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.bottemContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
                        <Text style={styles.buttonText}>Go to Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        padding: 20,
        gap: 12,
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 12,
        fontSize: 16,
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
    bottemContainer: {
        justifyContent: "flex-end"
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

export default ConnHotSpotP2;