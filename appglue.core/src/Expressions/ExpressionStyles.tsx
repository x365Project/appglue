import styled from "styled-components";

export const ExpressionDiv = styled.div`
  float: left;
  display: flex;
  align-items: center;
  border: 2px solid lightgrey;
  border-radius: 8px;
  padding-top: 7px;
  padding-right: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
     
`;

export const ExpressionPiece = styled.div`
  float: left;
  display: flex;
  align-items: center;
  padding-top: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
`;

export const ExpressionLineDiv = styled.div`
  float: left;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  clear: left;
  width: 100%;
  margin-bottom: 3px;
`;

export const BracketedDiv = styled.div`
      float: left;
      display: flex;
      align-items: center;
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
`;
