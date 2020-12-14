import React from "react";
import {Input} from "@material-ui/core";
import {StyledInputWrapper} from "./ValueEditorStyles";

interface NumberValueEditorProps {
	value?: number;
	defaultValue?: number;
	label?: string;
	onUpdateCallback: (newValue?: string) => void
}

export const NumberValueEditor: React.FC<NumberValueEditorProps> = (props: NumberValueEditorProps) => {
	let {value, onUpdateCallback, defaultValue, label} = props;

	const valueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onUpdateCallback(event.target.value);
	}

	return (
		<StyledInputWrapper>
			{
				label && <label>{label}</label>
			}
			<Input autoFocus value={value || defaultValue || ""} onChange={valueChange} disableUnderline inputMode="decimal" />
		</StyledInputWrapper>
	)
}