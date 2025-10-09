import { useState, useEffect } from 'react';
import axios from 'axios';
import { Connection, ConnectionMethod, ConnectionType, DevConnection, HotSpotConnection, WifiConnection } from '../constant/apiTypes';
import { HostComponent } from 'react-native';
import ConnDev from '../screens/connections_screens/ConnDev';

export const testConnection = async (connection: Connection<ConnectionType> | null): Promise<String | null> => {
    let message: string | null = null;

    if (connection === null) {
        return null;
    }
    if (connection.connectionInfo as DevConnection) {
        const connInfo = connection.connectionInfo as DevConnection;
        await fetch(connInfo.url + ':' + connInfo.port + '/testConn')
            .then((res) => res.json())
            .then((data) => {
                message = data.message;
            })
            .catch((err) => { message = `Connection failed: ${err.message}` });
    }
    else if (connection.connectionInfo as WifiConnection) {
        const connInfo = connection.connectionInfo as WifiConnection;
        await fetch(connInfo.url + ':' + connInfo.port + '/testConn')
            .then((res) => res.json())
            .then((data) => {
                message = data.message;
            })
            .catch((err) => { message = `Connection failed: ${err.message}` });
    }
    return message;
};

export const useConnect = (connMethod: ConnectionMethod) => {
    let connection: Connection<ConnectionType>;

    //initial connection set
    connection =
    {
        method: null,
        connectionInfo: null
    }
    //assumes that device is already on glasses network
    if (connMethod === ConnectionMethod.Wifi) {
        connection =
        {
            method: ConnectionMethod.Wifi,
            connectionInfo: {
                SSID: "FairWayGlasses",
                port: "5000",
                url: "http://10.42.0.1",
                status: false,
            }
        }
    }
    //assumes that glasses are already connect to hotspot
    else if (connMethod === ConnectionMethod.HotSpot) {


    }
    //asumes that device is already connected with bluetooth
    else if (connMethod === ConnectionMethod.Bluetooth) {


    }
    //should defualt to andrew dev connect
    else if (connMethod === ConnectionMethod.Dev) {
        connection = (
            {
                method: ConnectionMethod.Dev,
                connectionInfo: {
                    port: "5000",
                    url: "http://192.168.2.2",
                    status: false,
                }
            }
        )
    }
    return { connection }
}