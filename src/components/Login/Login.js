import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        window.location.href = 'http://bartendtheworld.com/api/login';
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogin}> Login </button>
            </div>
        )
    }
}