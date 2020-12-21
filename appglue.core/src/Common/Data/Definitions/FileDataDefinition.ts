import {FileData} from "../../FileData";
import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class FileDataDefinition extends BaseDataDefinition<FileData> {
    readonly type: XDataTypes = XDataTypes.FILE;

}