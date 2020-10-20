import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    /**
     * We are calling a prop searchUsers and passign in the text
     * @param e
     */
    onSubmit = (e) => {
        //PreventDefault or else the form submits to file.
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({text: ''})
    }

    /**
     * We use e.target.name to target the name.
     * input name can be text or email or whatver
     * This targets the input field with the name being anything
     */
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Serach Users...."
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {this.props.showClear && (
                    <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>
                        Clear
                    </button>
                )}
            </div>
        );
    }
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
}

export default Search;