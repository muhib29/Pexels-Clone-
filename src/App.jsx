import React, { useState } from 'react';
import Uimodel from './components/Uimodel';
import Navbar from './components/Navbar';

const App = () => {
  const [query, setQuery] = useState("nature");
  return (
    <div>
      <div className='image'>
      <Navbar query={query} setQuery={setQuery} />
      <Uimodel query={query} setQuery={setQuery} />
      </div>
    </div>
  );
};

export default App;
