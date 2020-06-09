import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={(props)=><Home {...props}/>} />
        <Route path="/chat/:name" render={(props)=><Chat {...props}/>} />
      </BrowserRouter>
    </div>
  );
}

export default App;
