
// interface defining how configuration data is published out to be stored.
export interface IConfigStorage {
    getStorageData(): object;

    setStorageData(data: object): void;
}

