// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Board from './components/Board';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* เส้นทางสำหรับหน้า Home */}
          <Route path="/" element={<Home />} />
          {/* เส้นทางสำหรับหน้า Board */}
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
