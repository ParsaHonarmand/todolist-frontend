import React from 'react';
import './index.css'
import Signup from './Signup';
import Index from './index'

const axios = require('axios');

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.validateLogin = this.validateLogin.bind(this)
        this.state = {
            username: "",
            password: "",
            click: false,
            todos: [],
            loginValidation: false,
            error: ""
        }
    }

    handleUserName(e) {
        e.preventDefault()
        this.setState({
            username: e.target.value.toLowerCase()
        })  
    }
    handlePassword(e) {
        e.preventDefault()
        this.setState({
            password: e.target.value
        })
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
                if (itemsToSend!==null){
                    console.log(itemsToSend.data[0].todos)
                    return itemsToSend.data[0].todos
                }
            } catch(err) {
                console.log(err)
            }
        }

        (async function() {
            const items = await getItems()
            if (items){
                currentComponent.setState({
                    todos: items,
                    loginValidation: true
                })
            }
            else {
                currentComponent.setState({
                    error: "Incorrect Username and/or Password"
                })
            }
          })();

        e.target.reset()
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
        else if (this.state.loginValidation===true){
            return (
                <Index user={this.state.username} password={this.state.password} registered={this.state.loginValidation} todos={this.state.todos}/>
            )
        }
        else {
            if (this.state.error.length === 0) {
                return(
                    <form className="ui form" onSubmit={this.validateLogin.bind(this)} id="header">
                        <h2 className="ui header">Member Login</h2>
                        <div className="field">
                            <label>Username</label>
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
                        <div className="field">
                            <label>Password</label>
                            <div className="ui fluid input">
                                <input 
                                    type="password" 
                                    aria-invalid="true" 
                                    placeholder="Password" 
                                    onChange={this.handlePassword.bind(this)} 
                                    value={this.state.password} 
                                />
                            </div>
                        </div>
                        <button className="ui secondary button"><i class="unlock alternate icon"></i>Login</button>
                        <div className="ui inverted segment">
                            <h4 className="ui purple inverted header">Don't have an account? Click <a className="ui grey inverted header" href="" onClick={this.handleLink.bind(this)}>HERE</a> to sign up!</h4>
                        </div>  
                    </form> 
                )
            }
            else {
                return (
                    <form className="ui form" onSubmit={this.validateLogin.bind(this)} id="header">
                        <h2 className="ui header">Member Login</h2>
                        <div className="field">
                            <label>Username</label>
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
                        <div className="field">
                            <label>Password</label>
                            <div className="ui fluid input">
                                <input 
                                    type="password" 
                                    aria-invalid="true" 
                                    placeholder="Password" 
                                    onChange={this.handlePassword.bind(this)} 
                                    value={this.state.password} 
                                />
                            </div>
                        </div>
                        <button className="ui button"><i class="unlock alternate icon"></i>Login</button>
                        <div className="ui inverted segment">
                            <h4 className="ui purple inverted header">Don't have an account?</h4> 
                            <h4 className="ui purple inverted header">Click <a className="ui grey inverted header" href="" onClick={this.handleLink.bind(this)}>HERE</a> to sign up!</h4>
                        </div>  
                        <div className="ui negative message">
                            <div className="header">{this.state.error}</div>
                        </div>
                    </form> 
                )
            }
        }
    }
}

export default Login;