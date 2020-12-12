import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NavFrame} from "./NavFrame/NavFrame";
import {FrameProps, getFrameOptions} from "./NavFrame/FrameProps";

function App() {

  return (
    <div className="App">
      <NavFrame layoutOptions={getFrameOptions()}/>
    </div>
  );
}

export default App;
