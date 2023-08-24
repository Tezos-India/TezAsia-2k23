
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    Avatar, ConversationHeader, MainContainer, ChatContainer,
    MessageList, Message, MessageInput, TypingIndicator, MessageSeparator
}
    from '@chatscope/chat-ui-kit-react';


const API_KEY = process.env.API_URL;
console.log("API_KEY = ", API_KEY)


// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": `Explain things like you would
be a health professional with 5 years of experience and can help emotionally and mentally to 
people of all ages. Do not answer any questions strictly which include anything other than health.`
}

function Chatbot() {
    const [messages, setMessages] = useState<{
        message: any;
        direction: string;
        sender: string;
    }|{
        message: string;
        sentTime: string;
        sender: string;
    }[]>([
        {
            message: "Hello, I'm your health guide! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages as any, newMessage];

        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message.concat(" .Answer only if it is a destination and travel-related, otherwise strictly do not answer if related to dance,music and culture.") }
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ],
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    // "Organization": "",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]);
                setIsTyping(false);
            });
    }

    return (
        <div style={{position:'fixed',bottom:'50px',right:'50px',zIndex:10}}>
            <div 
            style={{ position: "relative", height: "400px", width: "400px" }}
            >

                <MainContainer responsive>
                    <ChatContainer>
                        <ConversationHeader>
                            {/* <Avatar src={botImage} name="Eliot" status='available' /> */}
                            <ConversationHeader.Content>
                                <span style={{
                                    color: "#00008b",
                                    position: "relative",
                                    right: 20,
                                    fontWeight: 600,
                                    textAlign: 'center'
                                }}>&nbsp; &nbsp;Health-Assistance Bot</span>
                            </ConversationHeader.Content>
                        </ConversationHeader>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}
                        >
                            {(messages as any).map((message, i) => {
                                console.log(message)
                                return (<><Message key={i} model={message}>
                                    {/* {message.sender === "ChatGPT" ? <Avatar src={botImage} name="Eliot" /> : <Avatar src={boyImage} name="user" size="sm" />} */}
                                </Message>
                                    <MessageSeparator />
                                </>
                                )
                            })}
                        </MessageList>
                        <MessageInput attachButton={false} placeholder="Type query here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Chatbot;
