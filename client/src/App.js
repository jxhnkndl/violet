import React from 'react';
import MoodState from './context/mood/MoodState';

function App() {
  return (
    <MoodState>
      <div className="App">
        <header className="App-header">
          <h1>VIOLET</h1>
        </header>
      </div>
    </MoodState>
  );
}

export default App;
