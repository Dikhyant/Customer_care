import React from "react";

class ShowMessages extends React.Component{
    render(){
        const messages = this.props.messages.map(message=>{
            if(message.senderId===this.props.currentUserId)
            {
                return(
                    <div className="right-align chat-container" key={message.id}>
                        <span className="chats light-blue darken-4 current-user">
                            <span className="senderId current-userId">{this.props.currentUserId}</span>
                            <span>{message.text}</span></span>
                    </div>
                )
            }
            else{
                return(
                    <div className="left-align chat-container" key={message.id}>
                        <span className="chats orange darken-4 room-member">
                            <span className="senderId room-memberId">{message.senderId}</span>
                            <span>{message.text}</span></span>
                    </div>
                )
            }
        })
        return(
            <div>
                {messages}
            </div>
        )
    }
}

export default ShowMessages;