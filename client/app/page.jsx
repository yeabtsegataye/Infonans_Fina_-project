"use client";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  InfoButton,
  ConversationHeader,
  ToggleConversationListUsingBackButtonStory,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UserListComponent from "./right";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  ///////////////////////////////////
  const [chat, setChat] = useState([]);
  const [message, SetMessage] = useState([]);
  ///////////////////////////////////
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);

  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });

      setConversationContentStyle({
        display: "flex",
      });

      setConversationAvatarStyle({
        marginRight: "1em",
      });

      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);
  //////////////////////
  const getChats = async () => {
    try {
      // const token = localStorage.getItem('access_token');

      // if (!token) {
      //   console.warn('No token found. User ID cannot be retrieved.');
      //   return; // Early exit if no token
      // }
        const response = await axios.post(
        'http://localhost:8000/chat/get',{
          chat_receiver: 3
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // Include token for authentication
        //   },
        // }
      );

      setChat(response.data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);
  console.log(chat, 'the chat')

 //////////////////

  return (
    <main>
      <MainContainer
        responsive
        style={{
          height: "96vh",
        }}
      >
        <Sidebar position="left" style={sidebarStyle}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation onClick={handleConversationClick}>
              <Avatar
                src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                name="Lilly"
                status="available"
                style={conversationAvatarStyle}
              />
              <Conversation.Content
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you"
                style={conversationContentStyle}
              />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer style={chatContainerStyle}>
          <ConversationHeader>
            <ConversationHeader.Back onClick={handleBackClick} />
            <ToggleConversationListUsingBackButtonStory />
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName="Zoe"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList
          // typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
            <Message
              model={{
                direction: "incoming",
                message: "Hello my friend",
                position: "single",
                sender: "Zoe",
                sentTime: "15 mins ago",
              }}
            >
              <Avatar
                name="Zoe"
                src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
              />
            </Message>
            <Message
              avatarSpacer
              model={{
                direction: "outgoing",
                message: "Hello my friend",
                position: "single",
                sender: "Patrik",
                sentTime: "15 mins ago",
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
        <Sidebar position="right">
          <UserListComponent />
          {/* {  <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Open
              </button>} */}
        </Sidebar>
      </MainContainer>
    </main>
  );
}
