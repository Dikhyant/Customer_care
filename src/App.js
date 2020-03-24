import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessage from "./component/SendMessage";
import ShowMessages from "./component/ShowMessages";
import ShowRooms from "./component/ShowRooms";

class App extends React.Component{
  state = {
    currentUser: null,
    currentUserId: "Customer_care",
    currentRoomId: "",
    rooms: [],
    messages: []
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:3be4b8e5-6304-4024-bb13-3200d767ba6f',
      userId: 'Customer_care',
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3be4b8e5-6304-4024-bb13-3200d767ba6f/token' })
    })

    chatManager.connect()
    .then(currentUser => {
      this.setState({
        currentUser
      })

      //fill rooms array with room ids the current user is member of
      this.setState({
        rooms: [...this.state.rooms , ...currentUser.rooms.map((room)=>{
          return(
            {
              id: room.id,
              name: room.name
            }
          )
        }) ]
      })
      console.log('Successful connection', currentUser)
    })
    .catch(err => {
      console.log('Error on connection', err)
    })
  }

  //method to subscribe to room of the client
  subscribeToRoom = (roomId) =>{
    //clear the messages array before subcribing to new room
    this.setState({
      messages: []
    })

    this.setState({
      currentRoomId: roomId
    })

    this.state.currentUser.subscribeToRoomMultipart({
      roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages , {id: message.id , senderId: message.senderId , text: message.parts[0].payload.content}]
          })
          // console.log("received message", message)
        }
      },
    })
  }
 
  //method to send message to client
  sendMessage = (text) =>{ 
    this.state.currentUser.sendSimpleMessage({
      roomId: this.state.currentRoomId,
      text,
    })
    .then(messageId => {
      console.log(`Added message `)
    })
    .catch(err => {
      console.log(`Error adding message `)
    })
  }

  render(){
    return (
      <div className="App container">
        <div className="row">
          <div className="col s3">
            <ShowRooms currentRoomId={this.state.currentRoomId} subscribeToRoom={this.subscribeToRoom} rooms={this.state.rooms} />
          </div>
          <div className="col s9">
          <ShowMessages currentUserId={this.state.currentUserId} messages={this.state.messages} />
          <SendMessage sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
