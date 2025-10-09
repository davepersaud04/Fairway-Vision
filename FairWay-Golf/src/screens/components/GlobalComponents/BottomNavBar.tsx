import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BottomNavBarProps {
    onRecord?: () => void;
    onViewPrevious?: () => void;
    onSettings?: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
    onRecord,
    onViewPrevious,
    onSettings,
}) => {
    const handleRecord = () => {
        if (onRecord) {
            onRecord();
        } else {
            console.log('Record pressed');
        }
    };

    const handleViewPrevious = () => {
        if (onViewPrevious) {
            onViewPrevious();
        } else {
            console.log('View Previous pressed');
        }
    };

    const handleSettings = () => {
        if (onSettings) {
            onSettings();
        } else {
            console.log('Settings pressed');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleRecord}>
                <View style={styles.iconContainer}>
                    <Text style={styles.plusIcon}>+</Text>
                </View>
                <Text style={styles.buttonText}>Record</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleViewPrevious}>
                <View style={styles.iconContainer}>
                    <Text style={styles.listIcon}>☰</Text>
                </View>
                <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSettings}>
                <View style={styles.iconContainer}>
                    <Text style={styles.settingsIcon}>⚙</Text>
                </View>
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 1,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#2196F3',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#1976D2',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    plusIcon: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    listIcon: {
        fontSize: 28,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    settingsIcon: {
        fontSize: 28,
        color: '#FFFFFF',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default BottomNavBar;