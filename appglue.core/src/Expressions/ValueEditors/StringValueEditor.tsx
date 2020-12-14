import React from "react";
import {Input} from "@material-ui/core";
import {StyledInputWrapper} from "./ValueEditorStyles";


interface StringValueEditorProps {
	value?: string;
	defaultValue?: string;
	label?: string;
	onUpdateCallback: (newValue?: string) => void
}

export const StringValueEditor: React.FC<StringValueEditorProps> = (props: StringValueEditorProps) => {
	let {value, onUpdateCallback, defaultValue, label} = props;

	const valueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onUpdateCallback(event.target.value);
	}

	return (
		<StyledInputWrapper>
			{
				label && <label>{label}</label>
			}
			<Input autoFocus value={value || defaultValue || ""} onChange={valueChange} disableUnderline />
		</StyledInputWrapper>
	)
}