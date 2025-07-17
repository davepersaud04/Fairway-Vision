import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { uploadImage } from './ServerBrigde';

export default function App() { 
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Profile />
    </View>
  );
}

function Profile(){
  const [response, sendImage] = useState<any|null>(null);

  useEffect(() => {
    uploadImage('/Users/andrewfalberg/Fairway-Vision/FairWay-Golf/0C9E60E9-2B70-4A3B-A82B-74938BADCB45_4_5005_c.jpeg','http://192.168.1.206:5001/upload').then(sendImage);
  }, []);
  
  return (
    response && <View>
      <Text>
        {response.status}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
