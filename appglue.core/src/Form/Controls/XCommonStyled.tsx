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
    box-sizing: border-box !important;
    z-index: 1 !important;
    fieldset {
        border: none !important;
    }
    label {
        padding: 0 5px;
        background-color: ${({customstyle}) => customstyle==='outlined'? '#FFF' : 'unset'};
        top: ${({ispicker, error}) => ispicker === 'true' && error? '-12px' : '0px'};
    }
    input {
        color: #01244E;
        border-radius: 5.65107px;
        padding-left: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        padding-right: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        background-color: ${({customstyle}) => customstyle==='filled'? '#E6E9ED' : 'unset'};
        &:focus {
            border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#1873B9'};
        }
        border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#E6E9ED'};
    }
    textarea {
        color: #01244E;
        border-radius: 5.65107px;
        padding-top: ${({variant}) => variant==='outlined'? '15px' : '0px'};
        padding-left: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        padding-right: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        background-color: ${({customstyle}) => customstyle==='filled'? '#E6E9ED' : 'unset'};
        &:focus {
            border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#1873B9'};
        }
        border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#E6E9ED'};
    }
    .MuiOutlinedInput-multiline {
        padding: 0px;
    }
    .MuiFormLabel-root.Mui-focused {
        top: 0px;
        color: ${({error}) => error? '#F65C66' : '#15466B'};
    }
    .MuiFilledInput-underline:after, .MuiInput-underline:after {
        border-bottom: 1px solid #15466B;
    }
    .MuiFilledInput-underline:before, .MuiInput-underline:before {
        border-bottom: 1px solid #677C95;
        opacity: 0.3;
    }
    .MuiFilledInput-root, .MuiFilledInput-root:hover {
        background-color: #E6E9ED;
    }
    .MuiFilledInput-multiline {
        padding-left: 0px;
        padding-right: 0px;
    }
`   as React.ComponentType<TextFieldProps>


export const ChildFullWidthDiv = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    >* {
        width: 100%;
        margin-bottom: 10px !important;
    }
`;