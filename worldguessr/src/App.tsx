import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import './styles/view.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <h1>Welcome to Worldguessr</h1>
                <Switch>
                    <Route path="/" exact component={Game} />
                    <Route path="/scoreboard" component={Scoreboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;