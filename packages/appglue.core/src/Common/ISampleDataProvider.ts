// used by designers to provide sample data
export interface ISampleDataProvider {
    getSampleList() : string[];
    getSample(name: string): object;
    saveSample(name: string, value: object): void;
}

