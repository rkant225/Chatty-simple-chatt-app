import React from 'react';
import {useState, useEffect} from 'react';

function Home({history}) {

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[]);

    const [name, setName] = useState("");

    return (
        <div className="outer-container">
            <div className="join-chat-container">
                <h4>Enter your name and join chat room.</h4>
                <input type="text" value={name} placeholder="Name" onChange={(e)=> setName(e.target.value)} onKeyPress={(e)=>{if(e.key==='Enter' && name)history.push(`/chat/${name}`)}}/>
                <br/>
                <button disabled={!name} onClick={()=> history.push(`/chat/${name}`) }>Join Chat</button>
            </div>
        </div>
    );
}

export default Home;
