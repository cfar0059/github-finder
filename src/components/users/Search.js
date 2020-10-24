import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({searchUsers, showClear, clearUsers, setAlert}) => {
    const [text, setText] = useState('');

    /**
     * We are calling a prop searchUsers and passign in the text
     * @param e
     */
    const onSubmit = (e) => {
        //PreventDefault or else the form submits to file.
        e.preventDefault();
        //If state is empty show an Alert
        if (text === '') {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('')
        }
    }

    /**
     * We use e.target.name to target the name.
     * input name can be text or email or whatver
     * This targets the input field with the name being anything
     */
    const onChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Serach Users...."
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search;