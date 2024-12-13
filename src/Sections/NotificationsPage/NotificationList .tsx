import React from "react";
import NotificationItem from "./NotificationItem";

type Notification = {
  id: number;
  type: "New Order" | "Cancellation" | "Update";
  message: string;
  time: string;
  read: boolean;
};

type NotificationListProps = {
  notifications: Notification[];
  handleMarkAsRead: (id: number) => void;
  handleDelete: (id: number) => void;
};

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  handleMarkAsRead,
  handleDelete,
}) => {
  return (
    <>
    
      <ul>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
            handleMarkAsRead={handleMarkAsRead}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default NotificationList;
