import React from 'react';
import io from 'socket.io-client';
import logo from '../../assets/logo.png';
import closeIcon from '../../assets/close.png';
import Message from './Message';
import Modal from '../Modal/Modal';


class Chat extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name : "", 
      message : "",
      messages : [],
      connectedUsers : [],
      showModal : false
    }

    this.ENDPOINT = "https://chatty-simple-chat-app.herokuapp.com/";
    this.ENDPOINT = "localhost:5000";

    this.socket = io(this.ENDPOINT);

    this.chatBoxRef = React.createRef();
  }

  componentDidMount(){
    const {match} = this.props;
    const name = match.params.name;
    this.setState({name : name})
    this.socket.emit('join', name, ()=>{})
    
    this.socket.on('message', (messageObj)=>{
      this.setState({messages : [...this.state.messages, messageObj]})
    });

    this.socket.on('usersList', (users) =>{
      this.setState({connectedUsers : users})
    })

  }

  componentWillUnmount(){
    //this.socket.emit('exit',{});
  }

  // For auto scrolling of chat box
  getSnapshotBeforeUpdate(prevProp, prevState){
    if(this.state.messages.length > prevState.messages.length){
      const chatBox = this.chatBoxRef.current;
      return {toBeScrolled : chatBox.scrollHeight - chatBox.scrollTop};
    }
    return null;
  }

  // For auto scrolling of chat box
  componentDidUpdate(prevProp, prevState, snapShot){
    if(snapShot && snapShot.toBeScrolled){
      const chatBox = this.chatBoxRef.current;
      chatBox.scrollTop = chatBox.scrollHeight - snapShot.toBeScrolled;
    }
  }

  sendMessage = () =>{
    this.socket.emit('send', {user : this.state.name, text : this.state.message})
    this.setState({message : ""})
  }

  closeChatBox = () =>{
    this.socket.emit('exit',{})
    this.props.history.push('/');
  }

  modelActions = () =>{
    return(
        <React.Fragment>
            <button onClick={this.closeModal} className="red-button">Close</button>
            <button onClick={this.closeModal} className="green-button">OK</button>
        </React.Fragment>
    );
  }

  displayModal =()=>{
    this.setState({showModal : true});
  }

  closeModal =()=>{
    this.setState({showModal : false});
  }

  getListOfUsers = () =>{
    return this.state.connectedUsers.map((user,i)=>{
      return(
      <li key={i} className="list-item">{user}</li>
      );
    })
  }

  render(){
    const {message} = this.state;

    return (
      <div>
        <img className="logo" src={logo} alt="App_logo"/>
        <img className="close-chat" src={closeIcon} onClick={()=>this.closeChatBox()} alt="close_button"/>

        <div className="details">
          <div className="current-user">Current User : {this.state.name}</div>
          <div onClick={()=>this.displayModal()} className="total-user">Total Users joined : {this.state.connectedUsers.length}</div>
        </div>
        <div ref={this.chatBoxRef} className="chat-container">
          <Message messages={this.state.messages} userName={this.state.name}/>
        </div>

        <div className="action-controller">
            <form>
              <input className="message-input" type="text" value={message} placeholder="Type message...." onChange={(e)=> this.setState({message : e.target.value})} onKeyPress={(e)=>{if(e.key === 'Enter' && this.state.message)this.sendMessage()}}/>
              <button className="send-btn" disabled={!message} onClick={()=> this.sendMessage()} >SEND</button>
            </form>
        </div>
        {this.state.showModal && 
        <Modal 
          onCancle={this.closeModal}
          title={"List of connected users."}
          content={this.getListOfUsers()}
          actions={this.modelActions()}
        />}
      </div>
    );

  }
}

export default Chat;
