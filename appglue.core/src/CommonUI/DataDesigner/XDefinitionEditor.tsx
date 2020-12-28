import React, {useState} from "react";
import {
    XDataDefinition,
    XDataTypes
} from "../../Common/Data/XDataDefinition";
import {Button, IconButton, Select, TextField} from "@material-ui/core";
import {Pencil, Switch} from "mdi-material-ui";
import styled from "styled-components";
import {AddBoxOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, CheckBox, DeleteOutlined} from "@material-ui/icons";
import {ActionButtons} from "../../Expressions/ExpressionElements/Logic/IfThenExpression";
import {ObjectDataDefinition} from "../../Common/Data/Definitions/ObjectDataDefinition";
import {FileDataDefinition} from "../../Common/Data/Definitions/FileDataDefinition";
import {NumberDataDefinition} from "../../Common/Data/Definitions/NumberDataDefinition";
import {DateDataDefinition} from "../../Common/Data/Definitions/DateDataDefinition";
import {StringDataDefinition} from "../../Common/Data/Definitions/StringDataDefinition";
import {BooleanDataDefinition} from "../../Common/Data/Definitions/BooleanDataDefinition";
import {UndefinedDataDefinition} from "../../Common/Data/Definitions/UndefinedDataDefinition";
import {IDataDefinition} from "../../Common/Data/Definitions/IDataDefinition";

class DataEditorFactory {

    static getDataEditorForField(forData: IDataDefinition) {
        switch (forData.type) {
            case XDataTypes.BOOLEAN:
                return(
                    <Switch>
                        {forData.name}
                    </Switch>
                );
            case XDataTypes.STRING:
                return(
                    <TextField label={forData.name} variant={'outlined'} size={"small"}>
                    </TextField>
                );
            case XDataTypes.DATE:
                return(
                    <TextField label={forData.name}  variant={'outlined'} size={'small'}>
                    </TextField>
                );
            case XDataTypes.NUMBER:
                return(
                    <TextField label={forData.name}  variant={'outlined'} size={'small'}>
                    </TextField>
                );
            case XDataTypes.FILE:
                return(
                    <div>
                        FileName [...]
                    </div>
                );
            case XDataTypes.OBJECT:
                return(
                    <div>
                        Object Values below
                    </div>
                );
        }
        return(
            <div>
                Select type
            </div>
        );
    }



}

export interface IDefinitionEditorParms {
    definition: XDataDefinition;
}


const EditorDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 100%;
  padding-left: 5px;
`;

const EndAddButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const DataEditorRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const DataEditorDefDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 475px;
  border-bottom: 1px solid lightgray;
`;

const DataEditorDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 100%;
  max-width: 300px;
  padding-left : 50px;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightblue;
`;

const ObjectDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 100%;
  margin-left: 25px;
  padding-left: 25px;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid blue;
`;

const ObjectHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;


export const XDefinitionEditor = function (props : IDefinitionEditorParms) {
    const [state, setstate] = useState(1);

    return(
        <EditorDiv>
            {getDataEditorForFields(props.definition.fields)}
        </EditorDiv>
    );


    function getDataEditorForFields(dataFields : IDataDefinition[]) {
        return (
            <>
                {dataFields.map((value: IDataDefinition, index: number) => {
                        if (value.type === XDataTypes.OBJECT) {
                            return (
                                <div>
                                    <ObjectHeaderDiv>name: <b>{value.name}</b> is list <CheckBox></CheckBox> {renderLineButtons(value, dataFields, index)}</ObjectHeaderDiv>
                                    <ObjectDiv>
                                        {(value as ObjectDataDefinition).fields &&
                                            getDataEditorForFields((value as ObjectDataDefinition).fields)}
                                    </ObjectDiv>
                                    {index + 1 === dataFields.length &&
                                    (
                                        renderAddButton(dataFields)
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                getDataRowEditor(value, index, dataFields)
                            );
                        }
                    }
                )}
                {(dataFields.length === 0 )   &&
                    (
                        <EndAddButton>
                            {renderAddButton(dataFields)}
                        </EndAddButton>
                    )
                }
            </>
        );

    }

    function changeType(totype: string, olddef: IDataDefinition, index: number, dataFields: IDataDefinition[]) {
        if (olddef.type === totype) {
            return;
        }

        console.log(totype);

        let def : IDataDefinition | null = null;
        switch (totype) {
            case XDataTypes.BOOLEAN:
                def = new BooleanDataDefinition();
                break;
            case XDataTypes.STRING:
                def = new StringDataDefinition();
                break;
            case XDataTypes.NUMBER:
                def = new NumberDataDefinition();
                break;
            case XDataTypes.DATE:
                def = new DateDataDefinition();
                break;
            case XDataTypes.OBJECT:
                def = new ObjectDataDefinition();
                break;
            case XDataTypes.FILE:
                def = new FileDataDefinition();
                break;
        }

        if (!def){
            def = new UndefinedDataDefinition();
        }

        def.name = olddef.name;

        dataFields.splice(index, 1, def);

        setstate(state+1);

    }



    function getDataRowEditor(def : IDataDefinition, index: number, dataFields: IDataDefinition[]) {
        return (
            <div key={(def.name ?? "noname") + index}>
                <DataEditorRow key={'def' + def.name + index}>
                    <DataEditorDefDiv>
                        <div>
                            <TextField value={def.name} ></TextField>
                            <Select
                                native
                                value={def.type}
                                onChange={(event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
//                                    changeType(event.target.name + "", def, index, dataFields);
                                    changeType(event.target.value + "", def, index, dataFields);
                                }}
                            >
                                {Object.values(XDataTypes).map((item, index) => {
                                    return (
                                        <option value={item} key={index}>{item}</option>
                                    );
                                })}

                            </Select>
                            Is List <CheckBox  ></CheckBox>

                            {renderLineButtons(def, dataFields, index)}
                        </div>
                    </DataEditorDefDiv>
                    <DataEditorDataDiv>
                        {DataEditorFactory.getDataEditorForField(def)}
                    </DataEditorDataDiv>
                </DataEditorRow>
                {index + 1 === dataFields.length && renderAddButton(dataFields)}
            </div>
        );
    }

    function renderAddButton(toList: IDataDefinition[]) {
        return (
            <Button variant={'outlined'} onClick={() => {
                toList.push(new UndefinedDataDefinition());
                // forces refresh
                console.log(state);
                console.log(toList);
                setstate(state+1);
            }}>Add</Button>
        );
    }

    function renderLineButtons(value: IDataDefinition, dataFields: IDataDefinition[], index: number) {
        return (
            <>
                {renderUp(value, dataFields, index)}
                {renderDown(value, dataFields, index)}
                {renderDelete(value, dataFields, index)}
                {renderEdit(value, dataFields, index)}
            </>
        );
    }

    function renderUp(value: IDataDefinition, dataFields: IDataDefinition[], index: number) {
        if (index === 0) {
            return (<></>)
        } else {
            return (
                <IconButton size={'small'} >
                    <ArrowUpwardOutlined fontSize="small"/>
                </IconButton>
            )
        }
    }
    function renderDown(value: IDataDefinition, dataFields: IDataDefinition[], index: number) {
        if (index + 1=== dataFields.length) {
            return (<></>)
        } else {
            return (
                <IconButton size={'small'} >
                    <ArrowDownwardOutlined fontSize="small"/>
                </IconButton>
            )
        }
    }
    function renderDelete(value: IDataDefinition, dataFields: IDataDefinition[], index: number) {
        return (
            <IconButton size={'small'} aria-label="delete" >
                <DeleteOutlined fontSize="small" />
            </IconButton>
        )
    }
    function renderEdit(value: IDataDefinition, dataFields: IDataDefinition[], index: number) {
        return (
            <IconButton size={'small'} aria-label="delete" >
                <Pencil fontSize="small" />
            </IconButton>
        )
    }

}