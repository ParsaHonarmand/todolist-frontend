import React from 'react'
import ReactDOM from 'react-dom';

class Clock extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleString()
        }
    }
    componentDidMount(){
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.intervalID)
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        })
    }
    render(){
        return (
            <p className="ui header">{this.state.time}</p>
        )
    }
}

export default Clock