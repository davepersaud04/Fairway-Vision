import React from "react";
import { View, Image, StyleSheet } from "react-native";

const GolfLogoScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/golf_logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // white background
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300, // adjust as needed
        height: 300,

    },
});

export default GolfLogoScreen;
