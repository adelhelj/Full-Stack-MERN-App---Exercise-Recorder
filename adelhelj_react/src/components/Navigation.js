import React from 'react';
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to={"/"}><button type="button">Home</button></Link> 
            <Link to={"/add-exercise"}><button type="button">Add</button></Link>
        </nav>
    );
}

export default Navigation