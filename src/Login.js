import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'
import CompletedItems from './CompletedItems.js';
import Header from './Header'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Signup from './Signup';
import { Component } from "react";

const axios = require('axios');
const itemsToSend = []

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            click: false,
            todos: [],
            loginValidation: false
        }
    }

    handleUserName(e) {
        e.preventDefault()
        //console.log(e.target.value)
        this.setState({
            username: e.target.value
        })  
    }
    handlePassword(e) {
        e.preventDefault()
        this.setState({
            password: e.target.value
        })
    }


    validateLogin(e) {
        e.preventDefault()
        console.log(this.state.username)
        console.log(this.state.password)
        const userObj = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:3001/getUser', userObj)
            .then(res => console.log(res.data))
            .then(res => itemsToSend = res.data)
            .catch(err => console.log(err))
        //reset at the end
        if (itemsToSend===null)
            console.log("EMPTY")
    }

    handleLink(e) {
        e.preventDefault()
        this.setState({
            click: true
        })
    }

    getItem() {
        axios.get('http://localhost:3001/item')
            .then(res => this.setState({items: res.data}))
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    render(){
        if (this.state.click===false) {
        return(
            <form className="ui form" onSubmit={this.validateLogin.bind(this)} id="header">
                <div className="error field">
                    <label htmlFor="form-input-first-name">Username</label>
                    <div className="ui fluid input">
                        <input
                            type="text"
                            aria-describedby="form-input-first-name-error-message"
                            aria-invalid="true"
                            placeholder="Username"
                            id="form-input-first-name"
                            onChange={this.handleUserName.bind(this)}
                            value={this.state.username}
                        />
                    </div>  
                </div>
                <div className="error field">
                    <label>Password</label>
                    <div className="ui fluid input">
                        <input type="text" aria-invalid="true" placeholder="Password" onChange={this.handlePassword.bind(this)} value={this.state.password} />
                    </div>
                </div>
                <button className="ui button">Submit</button>
                <div>
                    <h4>Don't have an account? Click <a href="" onClick={this.handleLink.bind(this)}>here</a> to sign up! </h4>
                </div>  
            </form> 
            
        )
        }
        else {
            return(
                <Signup />
            )
        }
    }
}

export default Login;