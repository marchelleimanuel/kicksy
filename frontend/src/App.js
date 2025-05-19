import React from 'react';
import { Login } from './pages/Login';
import { Path } from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Path/>
    </BrowserRouter>
  );
}

export default App;
