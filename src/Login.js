import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'
import CompletedItems from './CompletedItems.js';
import Header from './Header'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Signup from './Signup';
import { Component } from "react";
import Index from './index'
let itemsToSend

const axios = require('axios');

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            click: false,
            todos: {},
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
        
        const getItems = async () => {
            itemsToSend = await axios.post(process.env.REACT_APP_BACK_END_URL + 'getUser', userObj)
                .then(res => console.log(res.data[0]))
                .catch(err => console.log(err))
            this.setState({
                todos: itemsToSend
            })
        }
        getItems()
        console.log(this.state.todos)
        //reset at the end
        this.setState({
            loginValidation: true
        })
    }

    handleLink(e) {
        e.preventDefault()
        this.setState({
            click: true
        })
    }

    getItem() {
        axios.get(process.env.REACT_APP_BACK_END_URL + '/item')
            .then(res => this.setState({items: res.data}))
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    render(){
        if (this.state.click===true && this.state.loginValidation===false) {
            return(
                <Signup />
            )
        }
       // else if (this.state.loginValidation===true) {
        else if (this.state.loginValidation===true){
            return(
                <Index user={this.state.username} password={this.state.password} registered={this.state.loginValidation}/>
            )
        }
        //if (this.state.click===false && this.loginValidation===false) {
        else {
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
    }
}

export default Login;