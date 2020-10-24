import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from 'axios'
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    /**
     * Search Github Users
     * @param text
     * @returns {Promise<void>}
     */
    const searchUsers = async (text) => {
        setLoading(true);

        const res = await axios.get(
            `http://api.github.com/search/users?q=${text}&client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUsers(res.data.items)
        setLoading(false);
    }

    /**
     * Get Users
     * @param username
     * @returns {Promise<void>}
     */
    const getUser = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `http://api.github.com/users/${username}?client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUser(res.data)
        setLoading(false);
    }

    /**
     * Get Users Repos
     * @param username
     * @returns {Promise<void>}
     */
    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setRepos(res.data)
        setLoading(false);
    }


    /**
     * Clear Users from state
     * @type {*}
     */
    const clearUsers = () => {
        setUsers([])
        setLoading(false)
    }

    /**
     * Set Alert
     */
    const showAlert = (msg, type) => {
        setAlert({msg, type})

        //Settimeout to remove Alert after 5000ms
        setTimeout(() => setAlert(null), 5000)
    }

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className='container'>
                        <Alert alert={alert}/>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={searchUsers}
                                            clearUsers={clearUsers}
                                            showClear={users.length > 0}
                                            setAlert={showAlert}
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
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
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
        </GithubState>
    );
}

export default App;
