import {FileData} from "../../FileData";
import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class FileDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.FILE;

    value?: FileData | FileData[];

    getValue(): any {
        return this.value;
    }
}