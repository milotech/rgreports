import React from 'react';
import Reports from './components/Reports/Reports'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RG.Отчётики</h1>
        <p>(которые мы все так любим)</p>
      </header>
      <Reports />
    </div>
  );
}

export default App;
