import {
    XDataDefinition
} from "../../../Common/Data/XDataDefinition";
import {ObjectDataDefinition} from "../../../Common/Data/Definitions/ObjectDataDefinition";
import {StringDataDefinition} from "../../../Common/Data/Definitions/StringDataDefinition";
import {BooleanDataDefinition} from "../../../Common/Data/Definitions/BooleanDataDefinition";
import {IDataDefinition} from "../../../Common/Data/Definitions/IDataDefinition";

export function getEmptyDataDefinition() {
    return new XDataDefinition();
}

export function getFilledDataDefinition() {
    let def = new XDataDefinition();

    let fdef : IDataDefinition;
    fdef = new StringDataDefinition();
    fdef.name = 'stringfield';
    def.fields.push(fdef);
    fdef = new BooleanDataDefinition();
    fdef.name = 'boolfield';
    def.fields.push(fdef);

    let odef = new ObjectDataDefinition();
    odef.name = 'person'
    fdef = new StringDataDefinition();
    fdef.name = 'firstName';
    odef.fields.push(fdef);
    fdef = new StringDataDefinition();
    fdef.name = 'lastName';
    odef.fields.push(fdef);

    def.fields.push(odef);

    return def;
}
