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
type ConnWifiParams = {};
type ConnHotSpotParams = {};
type ConnHotSpotP2Params = {};


export type RootStackParamList = {
    BootUp: BootUpParams,
    ConfigureSetup: ConfigureSetupParams,
    InitialWelcome: InitialWelcomeParams,
    ConnBlueTooth: ConnBlueToothParams,
    ConnWifi: ConnWifiParams
    ConnHotSpot: ConnHotSpotParams,
    ConnHotSpotP2: ConnHotSpotP2Params
}