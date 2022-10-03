import React from 'react';
import ChatEngine from 'react-chat-engine';
const SupportAdmin = () => {
  return (
    <ChatEngine
    projectId={process.env.REACT_APP_CE_PROJECT_ID}
    userName='isatimur.it@gmail.com'
    userSecret='pass1234'
    height='calc(100vh - 20px)'
    />
  );
}

export default SupportAdmin;
