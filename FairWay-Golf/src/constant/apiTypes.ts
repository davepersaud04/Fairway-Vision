export enum ConnectionMethod {
    Wifi,
    HotSpot,
    Bluetooth,
    Dev,
};

export type ConnectionType = WifiConnection | HotSpotConnection | BlueToothConnection | DevConnection;

export interface Status { };

//Interface for WifiConnection.
//Phone doesn't need to keep track of Device IP
export interface WifiConnection {
    SSID: string,
    port: string,
    url: string,
    status: Status | boolean,
};

//Interface for HotspotConnection
export interface HotSpotConnection {
    ssdpResponse: string,
    port: string,
    url: string,
    status: Status | boolean,

};

export interface BlueToothConnection {
    MACAddress: string,
    status: Status | boolean,
};

export interface DevConnection {
    port: string,
    url: string,
    status: Status | boolean,
}

export interface Connection<T extends ConnectionType | null> {
    method: ConnectionMethod | null,
    connectionInfo: T | null,
};
