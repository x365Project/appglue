import React, { useState } from 'react';
import './App.css';
import { NavFrame } from './NavFrame/NavFrame';
import { getFrameOptions } from './NavFrame/FrameProps';

function App() {
  const [frameOptions, setFrameOptions] = useState<any>({
    layout: 'horizontal',
  });

  React.useEffect(() => {
    setFrameOptions(getFrameOptions());
  }, []);

  const rerender = () => {
    const result = Object.assign({}, getFrameOptions());
    console.log('result', result);
    setFrameOptions(result);
  };
  return (
    <div className="App">
      {frameOptions.frameSize && (
        <NavFrame rerender={rerender} layoutOptions={frameOptions} />
      )}
    </div>
  );
}

export default App;
