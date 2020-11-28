import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NavFrame} from "./NavFrame/NavFrame";
import {FrameOptions} from "./NavFrame/FrameOptions";

function App() {
  return (
    <div className="App">
      <NavFrame layoutOptions={new FrameOptions()}/>
    </div>
  );
}

export default App;
