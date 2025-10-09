import { Connection, ConnectionType } from "../constant/apiTypes";

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
    conn: Connection<ConnectionType | null> | null,
    title: string,
    userID: string,
};
type RecordingParams = {
    conn: Connection<ConnectionType | null> | null,
};

type ConnBlueToothParams = {};
type ConnWifiParams = {};
type ConnHotSpotParams = {};
type ConnHotSpotP2Params = {};
type ConnDevParams = {};



export type RootStackParamList = {
    BootUp: BootUpParams,
    ConfigureSetup: ConfigureSetupParams,
    InitialWelcome: InitialWelcomeParams,
    ConnBlueTooth: ConnBlueToothParams,
    ConnWifi: ConnWifiParams
    ConnHotSpot: ConnHotSpotParams,
    ConnHotSpotP2: ConnHotSpotP2Params,
    ConnDev: ConnDevParams,
    Recording: RecordingParams,
}