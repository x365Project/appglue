import {
    BooleanDataDefinition,
    XDataDefinition,
    IDataDefinition,
    ObjectDataDefinitionElement,
    StringDataDefinition
} from "../../../Common/Data/XDataDefinition";

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

    let odef = new ObjectDataDefinitionElement();
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
