import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import GolfLogoScreen from './components/BootUpComponents/GolfLogoScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/RootStackParamList'
import ScreenName from '../constant/ScreenName'

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.BootUp>

const BootUp = ({ route, navigation }: Props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace(ScreenName.ConfigureSetup, {
                title: "HotStop Configuration",
                device: Platform.OS
            })
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <GolfLogoScreen />
    )
}

export default BootUp

const styles = StyleSheet.create({})