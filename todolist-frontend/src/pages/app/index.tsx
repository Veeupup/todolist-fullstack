import React from 'react';
import './App.css';
import Board from '../../components/board';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Todolist</h1>
      <Board name="hello" />
    </div>
  );
}

export default App;
