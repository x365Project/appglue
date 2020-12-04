import styled from "styled-components";
import { InputLabel } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';

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
    color: ${props => props.error? '#F65C66' : '#677C95'} !important;
    margin-top: 6px !important;
`;
