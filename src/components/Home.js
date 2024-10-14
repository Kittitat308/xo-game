import React from 'react';
import './Home.css'; // สร้างไฟล์ CSS แยกต่างหากถ้าต้องการ
import { useNavigate } from 'react-router-dom';

const Home = ({ onStart }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/board'); // นำทางไปหน้า board
  };
  return (
    <div className="home">
      <h1 className="game-title">XO Game</h1>
      <button className="btn btn-primary start-button" onClick={handleStart}>
        Start game
      </button>
    </div>
  );
};

export default Home;
