'use client'
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
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

export default function Home() {
  return (
  <main>
    
    <MainContainer
        responsive
        style={{
          height: "96vh",
        }}
      >
        <Sidebar position="left">
          <Search placeholder="Search..."/>
          <ConversationList>
            <Conversation
              info="Yes i can do it for you"
              lastSenderName="Lilly"
              name="Lilly"
            >
              <Avatar
                name="Lilly"
                src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                status="available"
              />
            </Conversation>
            <Conversation
              info="Yes i can do it for you"
              lastSenderName="Joe"
              name="Joe"
            >
              <Avatar
                name="Joe"
                src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                status="dnd"
              />
            </Conversation>
            <Conversation
              info="Yes i can do it for you"
              lastSenderName="Emily"
              name="Emily"
              unreadCnt={3}
            >
              <Avatar
                name="Emily"
                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                status="available"
              />
            </Conversation>
     
          </ConversationList>
        </Sidebar>
      
        <ChatContainer>

          <ConversationHeader>
            <ConversationHeader.Back />
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
           <ExpansionPanel title="OPTIONS">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
        </Sidebar>
      </MainContainer>
  </main>
  );
}
