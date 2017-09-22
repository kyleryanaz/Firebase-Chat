import React, { Component } from 'react';
import './App.css';
import { ChatRoom } from "./components/ChatRoom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chat Practice</h2>
        </div>
        <p className="App-intro">
          Lets Chat!
        </p>
        <ChatRoom />
      </div>
    );
  }
}

export default App;
