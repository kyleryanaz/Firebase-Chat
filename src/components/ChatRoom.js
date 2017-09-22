import React, { Component } from 'react'
import { firebaseApp } from '../firebase/authentication'

export class ChatRoom extends Component {

    constructor(props, context){
        super(props, context)
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        firebaseApp.database().ref('Chats/chat01/messages/').on('value', (snapshot)=> {
            
            const currentMessages = snapshot.val()

            if (currentMessages != null){
                this.setState({
                    messages: currentMessages
                })
            }
        })
    }

    updateMessage(event){
        console.log('updateMessage: '+event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    submitMessage(event){
        var message = "";
        var user = firebaseApp.auth().currentUser? firebaseApp.auth().currentUser: {email:"anonymous"};
        message = `${user.email}: ${this.state.message}`;
        console.log(message);
        console.log('submitMessage: '+this.state.message)
        const nextMessage = {
            id: this.state.messages.length,
            text: message,
            sender: user.email || "anonymous"
        }

        firebaseApp.database().ref('Chats/chat01/messages/'+nextMessage.id).set(nextMessage)

    }

    render(){
        const currentMessage = this.state.messages.map((message, i) => {
            return (
                <li>{message.text}</li>
            )
        })
        return (
            <div>
                <ol>
                    {currentMessage}
                </ol>
                <input onChange={this.updateMessage} type="text" placeholder="Message" />
                <br />
                <button onClick={this.submitMessage}>Submit Message</button>
                </div>

        )
    }
}
