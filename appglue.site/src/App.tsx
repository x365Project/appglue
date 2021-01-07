import React from 'react';
import './App.css';
import { NavFrame } from './NavFrame/NavFrame';
import { getFrameOptions } from './NavFrame/FrameProps';

function App() {
  return (
    <div className="App">
      <NavFrame layoutOptions={getFrameOptions()} />
    </div>
  );
}

export default App;
