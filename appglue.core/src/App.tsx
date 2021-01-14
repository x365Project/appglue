import React from 'react';
import {getFormConfig, getFormData} from "./Form/Testing/FormTestData";
import { XFormDesigner } from './Form/XFormDesigner';
import styled from "styled-components";
import './App.css';

const Wrapper = styled.div`
    height: 100vh;
    flex-flow: column;
    display: flex;
`;

class App extends React.Component {

    render() {
        let ui = getFormConfig();

        return (
            <Wrapper>
                <XFormDesigner form={ui} formData={getFormData()} formName="Test" onFormSave={() => {}} onFormClose={() => {}}/>
                {/*<XUserForm form={ui}></XUserForm>*/}
            </Wrapper>
        );
    }

}


export default App;



