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

const axios = require('axios');
//let items
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.validateLogin = this.validateLogin.bind(this)
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

    parseItems(list) {

    }

    validateLogin(e) {
        let currentComponent = this
        e.preventDefault()
        console.log(this.state.username)
        console.log(this.state.password)
        const userObj = {
            username: this.state.username,
            password: this.state.password
        }
        async function getItems () {
            try {
                const itemsToSend = await axios.post(process.env.REACT_APP_BACK_END_URL + 'getUser', userObj)
                console.log(itemsToSend.data[0].todos)
                return itemsToSend.data[0].todos
            } catch(err) {
                console.log(err)
            }
        }

        (async function() {
            const items = await getItems()
            currentComponent.setState({
                todos: items,
                loginValidation: true
            })
          })();

        //reset at the end
    }

    handleLink(e) {
        e.preventDefault()
        this.setState({
            click: true
        })
    }

    getItem() {
        axios.get(process.env.REACT_APP_BACK_END_URL + '/item')
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
                <Index user={this.state.username} password={this.state.password} registered={this.state.loginValidation} todos={this.state.todos}/>
            )
        }
        //if (this.state.click===false && this.loginValidation===false) {
        else {
            return(
                <form className="ui form" onSubmit={this.validateLogin.bind(this)} id="todolist">
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
                    <button className="ui button">Login</button>
                    <div>
                        <h4>Don't have an account?</h4> 
                        <h4>Click <a href="" onClick={this.handleLink.bind(this)}>HERE</a> to sign up!</h4>
                    </div>  
                </form> 
            )
        }
    }
}

export default Login;