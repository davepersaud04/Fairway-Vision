import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ScreenName from '../constant/ScreenName';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomNavBar from './components/GlobalComponents/BottomNavBar';
import { getAppRoot, getDataStore, initializeFileSystem } from '../../GolfFileSystem';
import { useUpload } from '../api/ServerBrigde';
import { File, Directory } from 'expo-file-system';
import axios from 'axios';
import Upload from './components/InitialWelcomeComponents/Upload';


type Props = NativeStackScreenProps<RootStackParamList, ScreenName.InitialWelcome>

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
  }
};

const InitialWelcome = ({ route, navigation }: Props) => {
  const [isUploadRequest, setUploadRequest] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // console.log("test is running");
    // const dataStore = getDataStore();
    // const testRecordName = "2025-10-24T21:17:07.220Z";
    // const record = new Directory(dataStore as Directory, testRecordName);
    // const frame = new File(record, "SEQ_NUM_0");
    // uploadImage(frame.name, frame.textSync(), record.name);
  }, [isUploadRequest]);
  const currentConnection = route.params.conn;
  const onRecordRoute = () => {
    navigation.navigate(ScreenName.Recording, {
      conn: currentConnection
    });
  }
  const onPreviousRoute = () => {
    navigation.navigate(ScreenName.Previous, {});
  }
  const handleUpload = () => {
    setUploadRequest(true);
  }
  const handleDelete = () => {
    const rootDir = getAppRoot();
    try {
      rootDir?.delete();
      initializeFileSystem();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Upload visible={isUploadRequest} onClose={() => setUploadRequest(false)} />
      <BottomNavBar
        onRecord={onRecordRoute}
        onViewPrevious={onPreviousRoute}
      // onSettings={ }
      />
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
    fontSize: 28,
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
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }
});

export default InitialWelcome;


