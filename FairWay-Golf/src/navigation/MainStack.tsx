import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BootUp from '../screens/BootUp';
import ConfigureSetup from '../screens/ConfigureSetup';
import InitialWelcome from '../screens/InitialWelcome';
import { RootStackParamList } from './RootStackParamList';
import ScreenName from '../constant/ScreenName';
import ConnBlueTooth from '../screens/connections_screens/ConnBlueTooth';
import ConnHotSpot from '../screens/connections_screens/ConnHotSpot';
import ConnWifi from '../screens/connections_screens/ConnWifi';


const MainStack = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        //Stack defeinor
        //Initial screen is set to boot
        //Current route: BootUp -> ConfigureSetup.tsx -> (Bluetooth,MobleHotSpot,DeviceWifi) -> HomeScreen
        //For later iterations boot up can be integrated as an overlaying comp 
        //for home page with some bool route controll for later usage
        <Stack.Navigator initialRouteName='BootUp'>
            <Stack.Screen
                name={ScreenName.BootUp}
                component={BootUp}
                initialParams={{
                    checkList: [],
                    messageOfTheDay: "Have a great golf!"
                }}
            />
            <Stack.Screen
                name={ScreenName.ConfigureSetup}
                component={ConfigureSetup}
            />
            <Stack.Screen
                name={ScreenName.InitialWelcome}
                component={InitialWelcome}
                initialParams={{
                    title: "FirstTimePage",
                    userID: "MyUserTemp"
                }}
            />
            <Stack.Screen
                name={ScreenName.ConnBlueTooth}
                component={ConnBlueTooth}
            />
            <Stack.Screen
                name={ScreenName.ConnHotSpot}
                component={ConnHotSpot}
            />
            <Stack.Screen
                name={ScreenName.ConnWifi}
                component={ConnWifi}
            />
        </Stack.Navigator>
    )
}

export default MainStack