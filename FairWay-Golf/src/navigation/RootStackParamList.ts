import ConnHotSpot from "../screens/connections_screens/ConnHotSpot";

type BootUpParams = {
    title: string,
    checkList: string[], // <-- to do later, for when out boot screen needs to last till all components are loaded and mounted
    messageOfTheDay: string
};

type ConfigureSetupParams = {
    title: string,
    device: string      // <-- state which device is beeing used, could be removed if device check is done within component
};

type InitialWelcomeParams = {
    title: string
    userID: string
};

type ConnBlueToothParams = {};
type ConnHotSpotParams = {};
type ConnWifiParams = {};

export type RootStackParamList = {
    BootUp: BootUpParams,
    ConfigureSetup: ConfigureSetupParams,
    InitialWelcome: InitialWelcomeParams,
    ConnBlueTooth: ConnBlueToothParams,
    ConnHotSpot: ConnHotSpotParams,
    ConnWifi: ConnWifiParams
}