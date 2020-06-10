import React from 'react';


class Message extends React.Component {
  
  render(){
    return (
        <div>
          {this.props.messages.map((msg,i) =>{

            if(msg.user === 'admin'){
              return(
                <div key={i} className="center">              
                  <div className="user-name"></div> 
                  <div>{`Admin : ${msg.text}`}</div>
                </div>
              );
            }

            if(msg.user === this.props.userName){
              return(
                <div key={i} className="message-container right">
                  <div className="user-name">{msg.user}</div>
                  <div className="message">
                      {msg.text}
                  </div>
                </div>
              );
            } else {
              return(
                <div key={i} className="message-container left">
                  <div className="user-name">{msg.user}</div>
                  <div className="message">
                      {msg.text}
                  </div>
                </div>
              );
            }
          })}

        {/* <div className="action-controller">
              <input className="message-input" type="text" value={this.props.message} placeholder="Type message...." onChange={(e)=> this.props.handleMessageTextBox(e)} onKeyPress={(e)=>{if(e.key === 'Enter' && this.props.message)this.props.sendMessage()}}/>
              <button className="send-btn" disabled={!this.props.message} onClick={()=> this.props.sendMessage()} >SEND</button>
        </div> */}
        </div>
    );

  }
}

export default Message;
