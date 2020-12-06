import styled from "styled-components";
import { InputLabel, TextField } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';

import {TextFieldProps} from "./XControlProps";

export const StyledInputLabel = styled(InputLabel)`
    font-family: Mulish !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    margin-bottom: 12px !important;
`;

export const StyledFormHelperText = styled(FormHelperText)`
    font-family: Mulish !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: ${({error}) => error? '#F65C66' : '#677C95'} !important;
    margin-top: 6px !important;
`;

export const StyledTextField = styled(TextField)`
    width: ${(props: TextFieldProps) => props.width} !important;
    height: 59px !important;
    box-sizing: border-box !important;
    z-index: 1 !important;
    fieldset {
        border: none !important;
    }
    label {
        padding: 0 5px;
        background-color: ${({customStyle}) => customStyle==='outlined'? '#FFF' : 'unset'};
    }
    input {
        color: #01244E;
        border-radius: 5.65107px;
        padding-left: ${({customStyle}) => customStyle!=='standard'? '20px' : '0px'};
        padding-right: ${({customStyle}) => customStyle!=='standard'? '20px' : '0px'};
        background-color: ${({customStyle}) => customStyle==='filled'? '#E6E9ED' : 'unset'};
        &:focus {
            border: ${({customStyle}) => customStyle==='filled' || customStyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#1873B9'};
        }
        border: ${({customStyle}) => customStyle==='filled' || customStyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#E6E9ED'};
    }
    .MuiFormLabel-root.Mui-focused {
        color: ${({error}) => error? '#F65C66' : '#15466B'};
    }
    .MuiFilledInput-underline:after, .MuiInput-underline:after {
        border-bottom: 1px solid #15466B;
    }
    .MuiFilledInput-underline:before, .MuiInput-underline:before {
        border-bottom: 1px solid #677C95;
        opacity: 0.3;
    }
`   as React.ComponentType<TextFieldProps>
