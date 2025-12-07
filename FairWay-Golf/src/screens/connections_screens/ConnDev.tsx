import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import ScreenName from '../../constant/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Connection, ConnectionMethod, ConnectionType, DevConnection } from '../../constant/apiTypes';
import { testConnection, useConnect } from '../../api/glassesApi';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.ConnDev>

const ConnDev = ({ route, navigation }: Props) => {
    const [devConn, setDevConn] = useState<Connection<ConnectionType>>({ method: null, connectionInfo: null });
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const msg = testConnection(devConn);
        msg.then((message) => {
            if (message !== null) {
                console.log("Succesfull Connect");
                navigation.navigate(ScreenName.InitialWelcome,
                    {
                        conn: devConn,
                        title: "Welcome Screen",
                        userID: "0101",
                    }
                );
            } else {
                return () => { console.log("ERROR: Bad Connection") }
            }
        });
    }, [devConn]);
    const DevConn0Andrew = () => {
        setDevConn(useConnect(ConnectionMethod.Dev).connection);
    };

    const DevConn1Dave = () => {
        navigation.navigate(ScreenName.InitialWelcome,
            {
                title: "Welcome Screen",
                userID: "0101",
                conn: null,
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connecting with preconfigured dev connections</Text>
            <Text style={styles.subtitle}>
                Select Preset bellow to continue:
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.settingsButton} onPress={DevConn0Andrew}>
                    <Text style={styles.buttonText}>DevConn0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={DevConn1Dave}>
                    <Text style={styles.buttonText}>DevConn1</Text>
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

export default ConnDev;