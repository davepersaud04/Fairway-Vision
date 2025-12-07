import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import ScreenName from '../constant/ScreenName';
import BottomNavBar from "./components/GlobalComponents/BottomNavBar";
import { appDirectroy, getDataStore } from "../../GolfFileSystem";
import { File, Directory, Paths } from "expo-file-system";

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Previous>

interface Item {
    id: string;
    title: string;
    record: Directory;
    image: string;
}

//used for testing of UI compoents
// const sampleData: Item[] = [
//     {
//         id: "1",
//         title: "Test",
//         image: "https://via.placeholder.com/80x80.png?text=Img1",
//     },
//     {
//         id: "2",
//         title: "City Lights at Night",
//         image: "https://via.placeholder.com/80x80.png?text=Img2",
//     },
//     {
//         id: "3",
//         title: "Mountain Adventure",
//         image: "https://via.placeholder.com/80x80.png?text=Img3",
//     },
//     {
//         id: "4",
//         title: "Ocean Waves",
//         image: "https://via.placeholder.com/80x80.png?text=Img4",
//     },
//     {
//         id: "5",
//         title: "Forest Path",
//         image: "https://via.placeholder.com/80x80.png?text=Img5",
//     },
// ];

const Previous = ({ route, navigation }: Props) => {
    const dataStoreDir = getDataStore();
    let viewList: Item[] = [];
    if (dataStoreDir) {
        const dataStore = {
            uri: dataStoreDir.uri,
            contents: dataStoreDir.list()
        }
        let counter = 0;
        for (const record of dataStore.contents) {
            if (record as Directory) {
                const previewFrame = new File(record, "SEQ_NUM_0");
                if (previewFrame.exists) {
                    const data = previewFrame.textSync();
                    viewList.push({
                        id: counter.toString(),
                        title: record.name,
                        record: record as Directory,
                        image: `data:image/jpeg;base64,${data}`,
                    });
                    counter++;
                } else {
                    // console.log(record.list()) FUTURE ERROR HANDLE
                }
            }
        }
    }
    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => {
            navigation.navigate(ScreenName.FramesView, {
                recordDirName: item.record.name
            });
        }}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={viewList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
            <BottomNavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#f7f7f7",
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginVertical: 6,
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    itemTitle: {
        marginLeft: 20,
        flexShrink: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        textAlign: "left",
    },
});

export default Previous;