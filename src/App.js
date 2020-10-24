import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from 'axios'
import './App.css';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
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
     * Get Users
     * @param username
     * @returns {Promise<void>}
     */
    getUser = async (username) => {
        this.setState({loading: true});

        const res = await axios.get(
            `http://api.github.com/users/${username}?client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({user: res.data, loading: false});
    }

    /**
     * Get Users Repos
     * @param username
     * @returns {Promise<void>}
     */
    getUserRepos = async (username) => {
        this.setState({loading: true});

        const res = await axios.get(
            `http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({repos: res.data, loading: false});
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
        const {users, loading, user, repos} = this.state;

        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className='container'>
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={users.length > 0}
                                            setAlert={this.setAlert}
                                        />
                                        <Users loading={loading} users={users}/>
                                    </Fragment>
                                )
                                }/>
                            <Route exact path='/about' component={About}/>
                            <Route
                                exact
                                path='/user/:username'
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )
                                }/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
