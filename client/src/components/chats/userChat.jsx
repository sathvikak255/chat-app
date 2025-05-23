import { Stack } from "react-bootstrap";
import { useFetchRecepientUser } from "../../hooks/useFetchRecepient";
import avatar from "../../assets/avatar.svg"
import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
    const { recepientUser } = useFetchRecepientUser(chat, user);
    const { onlineUsers, notifications, markTheseUserNotificationsAsRead } = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat);

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId === recepientUser?._id
    )
    const isOnline = onlineUsers?.some((user) => user?.userId === recepientUser?._id);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);

        if (text.length > 20) {
            shortText = shortText + "..";
        }

        return shortText;
    }

    return (<Stack direction="horizontal"
        gap={4}
        className="user-card align-items-center p-2 justify-content-between" role="button"
        onClick={() => {
            if (thisUserNotifications?.length !== 0) {
                markTheseUserNotificationsAsRead(
                    thisUserNotifications,
                    notifications,
                );
            }
        }}
    >
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recepientUser?.name}</div>
                <div className="text">
                    {latestMessage?.text &&
                        <span>{truncateText(latestMessage?.text)}</span>
                    }</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                <span className="notifications-time">
                    {moment(latestMessage?.createdAt).isSame(new Date(), "day")
                        ? moment(latestMessage?.createdAt).format("h:mm A")
                        : moment(latestMessage?.createdAt).format("MMM D, YYYY")}
                </span>

            </div>
            <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
                {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
            </div>
            <span className={isOnline ? "user-online" : ""}></span>
        </div>
    </Stack>);
}

export default UserChat;