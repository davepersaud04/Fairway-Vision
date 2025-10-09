import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import ScreenName from '../constant/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.ConfigureSetup>

const ConfigureSetup = ({ route, navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your preferred connection method:</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ScreenName.ConnWifi, {})}
            >
                <Text style={styles.buttonText}>Connect via Wi-Fi</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ScreenName.ConnHotSpot, {})}
            >
                <Text style={styles.buttonText}>Connect via Hotspot</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ScreenName.ConnBlueTooth, {})}
            >
                <Text style={styles.buttonText}>Connect via Bluetooth</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ScreenName.ConnDev, {})}
            >
                <Text style={styles.buttonText}>Connect via DevConn</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    button: {
        width: "80%",
        padding: 15,
        backgroundColor: "#4F46E5",
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});


export default ConfigureSetup;