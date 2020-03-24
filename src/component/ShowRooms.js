import React from "react";

class ShowRooms extends React.Component{
    render(){
        const subscribeToRoom = this.props.subscribeToRoom;
        const rooms = this.props.rooms.map((room)=>{
            if(this.props.currentRoomId===room.id)
                return(
                    <div key={room.id} onClick={()=>{subscribeToRoom(room.id)}} className="room">
                        <span className="room-name room-name-active">{room.name}</span>
                    </div>
            )
            else
                return(
                    <div key={room.id} onClick={()=>{subscribeToRoom(room.id)}} className="room">
                        <span className="room-name">{room.name}</span>
                    </div>
                )
        })
        return(
            <div>
                {rooms}
            </div>
        )
    }
}

export default ShowRooms;