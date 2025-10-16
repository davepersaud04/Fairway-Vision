import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenName from '../constant/ScreenName';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomNavBar from './components/GlobalComponents/BottomNavBar';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.InitialWelcome>

const InitialWelcome = ({ route, navigation }: Props) => {
  const currentConnection = route.params.conn;
  const onRecordRoute = () => {
    navigation.navigate(ScreenName.Recording, {
      conn: currentConnection
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <BottomNavBar
        onRecord={onRecordRoute}
      // onSettings={ }
      // onViewPrevious={ }
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


