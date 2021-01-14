import React from "react";
import {FormContext} from "./FormContext";
import {AutoBind} from "../../Common/AutoBind";
import {Button, TextareaAutosize} from "@material-ui/core";
import {XFormDesignerLayoutPanel} from "./XFormDesignerLayoutPanel";
import styled from "styled-components";

const TestSaveButton = styled(Button)`
	&& {
		margin-top: 16px;
		background: #15466B;
		font-size: 14px;
		line-height: 18px;
		font-family: Mulish;
		font-weight: 600;
		padding-top: 11px;
		padding-bottom: 11px;
	}
`;

const TestDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100px;
  width: 100%;
`;

const TestToolbox = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 236px;
	border: 1px solid #E6E9ED;
	border-radius: 0;
	height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;

    @media (min-width: 1366px) {
        flex-basis: calc(236px + 59 * (100vw - 1366px) / 554);
        padding-left: calc(15px + 10 * (100vw - 1366px) / 554);
        padding-right: calc(15px + 15 * (100vw - 1366px) / 554);

	}

	@media (min-width: 1920px) {
        flex-basis: 295px;
        padding-left: 25px;
        padding-top: 29px;
        padding-right: 30px;
	}
`;



export class XUserFormTester extends React.Component<{
    editContext: FormContext
},
    {
        resultValue: string,
        height?: number
    }> {

    constructor(props: { editContext: FormContext}) {
        super(props);
        this.state = {
            resultValue: JSON.stringify(props.editContext.getFormData(), null, 2)
        };
    }

    @AutoBind
    updateUI() {
        this.forceUpdate()
    }

    render() {
        //let form = new XUserForm({ form: this.props.form });

        this.props.editContext.onFormDataChange = data => {
            this.setState({'resultValue': JSON.stringify(data, null, 2)});
        }

        return (
            <TestDiv>
                <TestToolbox>
                    <TextareaAutosize
                        data-testid="runtime-json-textarea"
                        value={this.state.resultValue}
                        style={{width: '100%', border: 'solid 1px #E6E9ED', borderRadius: '5px', color: '#01244E'}}
                        rowsMin={20}

                    />
                    <TestSaveButton variant="contained" color="primary">Save as Sample</TestSaveButton>
                </TestToolbox>
                <XFormDesignerLayoutPanel editContext={this.props.editContext}/>
            </TestDiv>
        );
    }
}