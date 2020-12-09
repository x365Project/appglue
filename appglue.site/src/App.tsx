import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NavFrame} from "./NavFrame/NavFrame";
import {FrameOptions, getFrameOptions} from "./NavFrame/FrameOptions";

function App() {

  return (
    <div className="App">
      <NavFrame layoutOptions={getFrameOptions()}/>
    </div>
  );
}

export default App;
