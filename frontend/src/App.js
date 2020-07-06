import React from 'react';
import './App.css';
import Router from './components/Router'
import {DataProvider} from './provider/DataProvider'

function App() {
  return (
    <div className="App">
        <DataProvider>
            <Router />
        </DataProvider>
    </div>
  );
}

export default App;
