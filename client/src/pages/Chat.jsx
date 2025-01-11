import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chats/userChat";
import PotentialChats from "../components/chats/PotentialChats";
import ChatBox from "../components/chats/ChatBox";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);

    return (<Container>
        <PotentialChats />
        {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={5} className="align-items-start">
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatsLoading && <p>Loading Chats..</p>}
                    {userChats?.map((chat, index) => {
                        return (
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        );
                    })}
                </Stack>
                <ChatBox />
            </Stack>)}
    </Container>);
};

export default Chat;