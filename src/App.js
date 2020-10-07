import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import './App.css';

class App extends Component {
    render() {
        const number = [1,2,3,4]

        return (
            <nav className="navbar bg-primary">
                <Navbar />
            </nav>
        );
    }
}

export default App;
