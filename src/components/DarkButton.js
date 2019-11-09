import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import {Button} from 'react-bootstrap';

class DarkButton extends React {
    static contextType = ThemeContext;
    render() {
        <Button variant={this.context}>Remove from favorites</Button>
    }
}

export default DarkButton;