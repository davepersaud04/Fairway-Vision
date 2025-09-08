import React, { JSXElementConstructor, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import MainStack from './src/navigation/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}




// DELETE IF NOT LONGER NEEDED

// import { StyleSheet, Text, View } from 'react-native';
// import {usePrediction, useUpload} from './ServerBrigde';

// function UploadScreen() {
//   const imageUri = '/Users/andrewfalberg/Fairway-Vision/FairWay-Golf/food.jpeg';
//   const sequence = 1;
//   const serverUrl = 'http://107.20.221.237:5001/upload';

//   const { status, error, isLoading } = useUpload(sequence,"0x67281", imageUri, serverUrl);

//   return (
//     <View>
//       {isLoading && <Text>Uploading...</Text>}
//       {error && <Text>Error: {error.message}</Text>}
//       {!status && <Text>Upload Successful!</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
