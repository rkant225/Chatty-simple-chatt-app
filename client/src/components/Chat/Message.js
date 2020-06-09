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
        </div>
    );

  }
}

export default Message;
