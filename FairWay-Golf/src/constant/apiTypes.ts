export enum ConnectionMethod {
    Wifi,
    HotSpot,
    Bluetooth,
};

export type ConnectionType = WifiConnection | HotSpotConnection | BlueToothConnection;

export interface Status { };

//Interface for WifiConnection.
//Phone doesn't need to keep track of Device IP
export interface WifiConnection {
    SSID: string,
    port: string,
    url: string,
    status: Status,
};

//Interface for HotspotConnection
export interface HotSpotConnection {
    ssdpResponse: string,
    port: string,
    url: string,
    status: Status,

};

export interface BlueToothConnection {
    MACAddress: string,
    status: Status,

};

export interface Connection<T extends ConnectionType | null> {
    method: ConnectionMethod | null,
    connectionInfo: T,
};