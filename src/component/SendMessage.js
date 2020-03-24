import React from "react";

class SendMessage extends React.Component{
    state = {
        text: ""
    }

    handleChange = (e) =>{
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.sendMessage(this.state.text);
        this.setState({
            text: ""
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><input  onChange={this.handleChange} value={this.state.text}></input></div>
                    <div><button className="btn waves-effect waves-light">Send<i className="material-icons right">send</i></button></div>
                </form>
            </div>
        )
    }
}

export default SendMessage;