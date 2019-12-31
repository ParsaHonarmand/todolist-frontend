import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ToDoItems from './ToDoItems.js'
import CompletedItems from './CompletedItems.js';
import Header from './Header'
import Index from './index'

const axios = require('axios');

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            repeatedPassword: "",
            todos: [],
            goToItems: false
        }
    }

    handleUserName(e) {
        e.preventDefault()
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
    handlePasswordCheck(e) {
        e.preventDefault()
        this.setState({
            repeatedPassword: e.target.value
        })
    }


    register(e) {
        e.preventDefault()
        console.log(this.state.username)
        console.log(this.state.password)
        const userObj = {
            username: this.state.username,
            password: this.state.password,
            todos: []
        }
        axios.post(process.env.REACT_APP_BACK_END_URL+"/createUser", userObj) 
            .then(x => console.log('New user added: ', x.data))
            .catch(err => console.log(err))
        //reset at the end
        this.setState({
            goToItems: true
        })
    }

    render() {
        if (this.state.goToItems===false) {
        return (
            <form className="ui form" onSubmit={this.register.bind(this)} id="header">
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
                        <input type="text" 
                                aria-invalid="true" 
                                placeholder="Password" 
                                onChange={this.handlePassword.bind(this)} 
                                value={this.state.password} 
                        />
                    </div>
                    <div className="ui fluid input">
                        <input type="text" 
                                aria-invalid="true" 
                                placeholder="Confirm password" 
                                onChange={this.handlePasswordCheck.bind(this)} 
                                value={this.state.repeatedPassword} 
                        />
                    </div>
                </div>
                <button className="ui button">Sign up</button>
            </form>
        )}
        else {
            return(
                <Index registered={this.state.goToItems} user={this.state.username}/>
            )
        }
    }
    

}

export default Signup