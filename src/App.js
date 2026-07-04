import React from 'react';
import ContagemTempo from './components/ContagemTempo';
import HeartBackground from './components/HeartBackground';
import Splash from './components/Splash';
import './App.css';

function App() {
    return (
        <div className="App" style={{ backgroundColor: 'black', position: 'relative', overflow: 'hidden' }}>
            <Splash />
            <div className="aurora-bg" aria-hidden="true" />
            <HeartBackground />
            <ContagemTempo />
        </div>
    );
}

export default App;