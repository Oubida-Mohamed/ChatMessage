import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import axios from 'axios';

const ChatApp = () => {
  const { getRooms, rooms } = useContext(ChatContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState([]);

  const getMsg = async () => {
    try {
      const data = await axios.get('http://localhost:5000/api/message/msg/' + selectedRoom?._id);
      const messages = data.data;
      setMsg(messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      getMsg();
    }
  }, [selectedRoom,msg]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      room_id: selectedRoom?._id,
      sender_id: user._id,
      message_text: message,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/message/send', form);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
        {(user.isAdmin)?<h2>Account Type : Admin</h2>:<h2>Account Type : NormalUser</h2>}
          <h4>Chat Rooms</h4>
          <ul className="list-group">
            {rooms.map((room) => (
              <li
                key={room._id}
                className={`list-group-item ${room._id === selectedRoom?._id && 'active'}`}
                onClick={() => setSelectedRoom(room)}
              >
                {room.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedRoom && (
            <div className="card">
              <div className="card-header">{selectedRoom.name}</div>
              <div className="card-body" style={{ minHeight: '300px' }}>
                {msg.map((message) => {
                  const isSentByCurrentUser = message.sender_id === user._id;
                  return (
                    <div key={message._id} className={`chat__bubble ${isSentByCurrentUser ? 'chat__right' : 'chat__left'}`}>
                      <div
                        className={`chat__bubble__inner ${isSentByCurrentUser ? 'chat__blue' : 'chat__black'}`}
                      >
                        <span>{message.message_text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card-footer">
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
