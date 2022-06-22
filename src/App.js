import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from "react"
const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room,setRom]=useState("");

  //Messages States
  const [message,setMessage]=useState("");
  const [messageRecived, setMessageRecived]=useState("");

  const joinRoom=()=>{
    if (room!==""){
      socket.emit("join_room",room);
    }
  }
  
  const sendMessage =()=>{
    socket.emit("send_message",{message,room});
  };
  
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageRecived(data.message);
    });
  },[socket])

  return (
    <div className="App">
      <input placeholder='Room Number...' 
      onChange={(event)=>{
      setRom(event.target.value);
      }}></input>
      <button onClick={joinRoom}>Join Room</button>
      <input placeholder='Message...'
      onChange={(event)=>{
      setMessage(event.target.value);
      }}></input>
      <button onClick={sendMessage}>Send</button>
      <h1>Message:</h1>
      {messageRecived}
    </div>
  );
}

export default App;
