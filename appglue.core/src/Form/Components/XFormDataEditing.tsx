import {
  Button,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import styled from "styled-components";

import { XFormConfiguration } from '../XFormConfiguration';

const JSONWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

interface JSONBoxInterface {
  form: XFormConfiguration,
  isLeaving: boolean,
  onJSONUpdating: Function,
  onNextMode: Function
}

interface State {
  content: string;
  parseJSONError: boolean;
  allowEdit: boolean;
}

export class XFormDataEditing extends React.Component<JSONBoxInterface, State> {

  constructor(props: JSONBoxInterface) {
    super(props);
    this.state = {
      content: '',
      allowEdit: false,
      parseJSONError: false
    };
  }

  componentDidMount() {
    let data = this.props.form.getStorageData();
    console.log(data);
    this.setState({
      content: JSON.stringify(data, null, 2)
    });
  }

  componentDidUpdate(prevProps: JSONBoxInterface) {
    const prevContent = JSON.stringify(prevProps.form.getStorageData(), null, 2);
    const currentContent = JSON.stringify(this.props.form.getStorageData(), null, 2);
    if (prevContent !== currentContent) {
      this.setState({
        content: currentContent
      });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      content: event.target.value
    });

    const currentContent = JSON.stringify(this.props.form.getStorageData(), null, 2);
    this.props.onJSONUpdating(currentContent !== event.target.value);
  }

  onClickSave(_event: React.MouseEvent<HTMLButtonElement>) {
    this.props.onNextMode(false);
    try {
      const sasobj = JSON.parse(this.state.content);
      this.props.form.setStorageData({});
      this.props.form.setStorageData(sasobj);
      this.props.onJSONUpdating(false);
    } catch(e) {
      this.setState({
        parseJSONError: true,
      });
    }
  }

  onChangeAllow(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      allowEdit: event.target.checked
    })
  }

  onCloseParseJSONDialog = () => {
    this.setState({parseJSONError: false});
  }

  onCloseLeavingDialog = () => {
    this.props.onNextMode(true);
  }

  render() {
    return (
      <JSONWrapper>
        <div>
          <FormControlLabel control={
            <Checkbox name="checkedC"
              checked={this.state.allowEdit}
              onChange={this.onChangeAllow.bind(this)}
            />} 
            label="Allow Form Editing" 
          />
          <Button variant="contained" onClick={this.onClickSave.bind(this)} disabled={!this.state.allowEdit}>Save Form Data</Button>
        </div>
        <br/>
        <TextAreaWrapper>
          <TextareaAutosize
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
            style={{width: '800px'}}
            readOnly={!this.state.allowEdit}
          />
        </TextAreaWrapper>
        <Dialog  onClose={this.onCloseParseJSONDialog} aria-labelledby="confirmation-dialog" open={this.state.parseJSONError}>
          <Alert severity="error">Error</Alert>
          <DialogContent>
            <DialogContentText>Your JSON is incorrect! Please check and try again.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseParseJSONDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog  onClose={this.onCloseLeavingDialog} aria-labelledby="confirmation-dialog" open={this.props.isLeaving}>
          <Alert severity="warning">Warning</Alert>
          <DialogContent>
            <DialogContentText>Your JSON is updated. Do you want to store it?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClickSave.bind(this)} color="primary">
              Yes
            </Button>
            <Button onClick={this.onCloseLeavingDialog} color="default">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </JSONWrapper>
    )
  }
}