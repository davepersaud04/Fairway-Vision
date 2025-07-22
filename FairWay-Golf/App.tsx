import { StatusBar } from 'expo-status-bar';
import React, { JSXElementConstructor, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {usePrediction, useUpload} from './ServerBrigde';

export default function App() { 
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <UploadScreen />
    </View>
  );
}

function UploadScreen() {
  const imageUri = '/Users/andrewfalberg/Fairway-Vision/FairWay-Golf/food.jpeg';
  const sequence = 1;
  const serverUrl = 'http://192.168.1.206:5001/upload';

  const { status, error, isLoading } = useUpload(sequence,"0x67281", imageUri, serverUrl);

  return (
    <View>
      {isLoading && <Text>Uploading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {!status && <Text>Upload Successful!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
