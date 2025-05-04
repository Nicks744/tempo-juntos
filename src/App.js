import React from 'react';
import ContagemTempo from './components/ContagemTempo';
import HeartBackground from './components/HeartBackground';
import './App.css';

function App() {
    return (
        <div className="App" style={{ backgroundColor: 'black', position: 'relative', overflow: 'hidden' }}>
            <HeartBackground />
            <ContagemTempo />
        </div>
    );
}

export default App;