import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
// Pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Cards from './pages/Cards.jsx'
import ShowCard from './pages/ShowCard.jsx'
import NewCard from './pages/NewCard.jsx'

//Components
import Header from './components/Header'


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/cards">
          <Cards />
        </Route>


        <Route exact path="/cards/new">
          <NewCard />
        </Route>

        <Route path="/cards/:id">
          <ShowCard />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
