import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from 'axios'
import './App.css';

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null
    }

    /**
     * Search Github Users
     * @param text
     * @returns {Promise<void>}
     */
    searchUsers = async (text) => {
        this.setState({loading: true});

        const res = await axios.get(
            `http://api.github.com/search/users?q=${text}&client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({users: res.data.items, loading: false});
    }

    /**
     * Clear Users from state
     * @type {*}
     */
    clearUsers = () => {
        this.setState({users: [], loading: false});
    }

    /**
     * Set Alert
     */
    setAlert = (msg, type) => {
        this.setState({alert: {msg: msg, type: type}});

        //Settimeout to remove Alert after 5000ms
        setTimeout(() => this.setState({alert: null}), 5000)
    }

    render() {
        const {users, loading} = this.state;

        return (
            <div className="App">
                <Navbar/>
                <div className='container'>
                    <Alert alert={this.state.alert}/>
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users}/>
                </div>
            </div>
        );
    }
}

export default App;
