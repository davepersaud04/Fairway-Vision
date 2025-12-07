import { File, Paths, Directory } from 'expo-file-system'


const ROOT_DIR = "rootDir";
const DATA_STORE = "dataStore";

//to be used later if needed when listing the previous recordings
export interface appFile {
    file: File
}
export interface appDirectroy {
    uri: string
    contents: (File | Directory)[]
}
export interface appFileSystem {
    root: Directory
}

const initDir = (dir: Directory) => {
    if (dir.parentDirectory.exists) {
        if (dir.exists) {
            return true;
        } else {
            try {
                dir.create();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export const getAppRoot = () => {
    const rootDir = new Directory(Paths.document, ROOT_DIR);
    if (rootDir.exists) {
        return rootDir;
    }
    return null;
}
export const getDataStore = () => {
    const rootDir = getAppRoot();
    if (rootDir) {
        const dataStore = new Directory(rootDir, DATA_STORE)
        if (dataStore.exists) {
            return dataStore;
        }
    }
    return null;
}
export const getRecordDir = (dirName: string) => {
    const dataStore = getDataStore();
    if (dataStore) {
        const recordDir = new Directory(dataStore, dirName);
        if (recordDir.exists) {
            return recordDir;
        }
    }
    return null;
}

export const initializeFileSystem = () => {
    try {
        const rootDir = new Directory(Paths.document, ROOT_DIR);
        initDir(rootDir);
        const dataStore = new Directory(rootDir, DATA_STORE);
        initDir(dataStore);
    } catch (error) {
        console.log(error)
    }
}