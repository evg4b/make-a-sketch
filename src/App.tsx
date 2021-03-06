import React, { useState } from 'react';
import Preview from './components/Preview';
import Sidebar from './components/Sidebar';


const App = () => {
  const [original, setOriginal] = useState<string>();
  const [precessed, setPrecessed] = useState<string>();
  return (
    <>
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-one-fifth">
              <Sidebar onOriginalSelected={setOriginal} onProcessed={setPrecessed} />
            </div>
          </div>
        </div>
      </section>
      <Preview original={original || ""} precessed={precessed || ""} />
    </>
  );
};

export default App;
