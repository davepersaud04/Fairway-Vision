import { useState, useEffect } from 'react';
import axios from 'axios';
import { Connection, ConnectionMethod, ConnectionType, HotSpotConnection, WifiConnection } from '../constant/apiTypes';
import { HostComponent } from 'react-native';

export const useConnect = (connMethod: ConnectionMethod) => {
    const [status, setStatus] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [connection, setConnection] = useState<Connection<ConnectionType> | null>(null)

    //assumes that device is already on glasses network
    //device sends post request to glasses
    if (connMethod === ConnectionMethod.Wifi) {



    }
    //assumes that glasses are already connect to hotspot
    else if (connMethod === ConnectionMethod.HotSpot) {


    }
    //asumes that device is already connected with bluetooth
    else if (connMethod === ConnectionMethod.Bluetooth) {


    }
}