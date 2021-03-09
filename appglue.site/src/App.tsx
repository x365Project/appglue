import './App.css';

import React, { useState } from 'react';

import { getFrameOptions } from './NavFrame/FrameProps';
import { NavFrame } from './NavFrame/NavFrame';

function App() {
  const [frameOptions, setFrameOptions] = useState<any>({
    layout: 'horizontal',
  });

  React.useEffect(() => {
    setFrameOptions(getFrameOptions());
  }, []);

  const rerender = () => {
    // const result = Object.assign({}, getFrameOptions());
    // console.log('result', result);
    // setFrameOptions(result);
  };
  console.log(frameOptions);
  return (
    <div className="App">
      {frameOptions.frameSize && (
        <NavFrame rerender={rerender} layoutOptions={frameOptions} setLayoutOption={setFrameOptions} />
      )}
    </div>
  );
}


export default App;
