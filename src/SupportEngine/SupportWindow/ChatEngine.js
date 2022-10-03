import React, {useEffect, useState} from "react";
import {ChatFeed,ChatEngineWrapper, Socket} from "react-chat-engine"
const ChatEngine = props => {
    const [showChat, setShowChat] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (props.visible)
                setShowChat(true)
        }, 500)
    })
    return (<div className='transition-5'
                 style={{
                     height: props.visible ? '100%' : '0%',
                     zIndex: props.visible ? '100' : '0',
                     width: '100%',
                     backgroundColor: 'white'
                 }}
    >
        {
            showChat &&
            <ChatEngineWrapper>
                <Socket
                    projectID={process.env.REACT_APP_CE_PROJECT_ID}
                    userName={props.user.email}
                    userSecret={props.user.email}
                />
                <ChatFeed activeChat={props.chat.id}/>
            </ChatEngineWrapper>
        }

    </div>)
}
export default ChatEngine