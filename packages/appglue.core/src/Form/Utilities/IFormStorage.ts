export class NameDescriptionAndId {
    id: string;
    name: string;
    description: string;

    constructor(id: string, name: string, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description ?? "";
    }
}

export abstract class IFormStorage {
    abstract getFormConfigurationList() :NameDescriptionAndId[];
    abstract getFormConfigurationData(id: string) : string;
    abstract storeFormConfigurationData(id: string, configurationData: string) : void;
    abstract getFormSampleDataList(id: string) : NameDescriptionAndId[];
    abstract getFormSampleData(formId: string, sampleId: string) : string[];
    abstract storeFormSampleData(formId: string, sampleId: string, sampleData: string) : void;

}

export class FormStorage
{
    private storageService? : IFormStorage;

    hasFormStorageService() : boolean {
        return (this.storageService !== null);
    }

    getStorageService() : IFormStorage {
        if (!this.storageService)
            throw 'No storage service configured';

        return this.storageService;
    }

    setStorageService(storageService: IFormStorage) {
        this.storageService = storageService;
    }
}