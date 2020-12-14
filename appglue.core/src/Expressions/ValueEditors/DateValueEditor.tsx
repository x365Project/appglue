import React from "react";
import {Input} from "@material-ui/core";
import {StyledInputWrapper} from "./ValueEditorStyles";

interface DateValueEditorProps {
	value?: string;
	defaultValue?: string;
	label?: string;
	onUpdateCallback: (newValue?: string) => void
}

export const DateValueEditor: React.FC<DateValueEditorProps> = (props: DateValueEditorProps) => {
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