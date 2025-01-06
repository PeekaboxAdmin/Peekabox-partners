import React, { useState, useEffect } from "react";
import CheckboxWithLabel from "../../Components/CheckboxWithLabel/CheckboxWithLabel";
import Button from "../../Components/Button/Button";
import "./No.css";

type Notification = {
  id: number;
  type: "New Order" | "Cancellation" | "Update";
  message: string;
  time: string;
  read: boolean;
};

type NotificationItemProps = {
  notification: Notification;
  handleMarkAsRead: (id: number) => void;
  handleDelete: (id: number) => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  handleMarkAsRead,
  handleDelete,
}) => {
  const [isChecked, setIsChecked] = useState(notification.read);

  useEffect(() => {
    setIsChecked(notification.read);
  }, [notification.read]);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    handleMarkAsRead(notification.id);
  };

 return (
     <tr
       className={`notification-item ${
         notification.read ? "bg-gray-100" : "bg-white"
       }`}
     >
       <td className="border px-4 py-2 text-center">{notification.id}</td>
       <td className="border px-4 py-2 text-center">{notification.type}</td>
       <td className="border px-4 py-2">{notification.message}</td>
       <td className="border px-4 py-2 text-center">{notification.time}</td>
       <td className="border px-4 py-2 text-center">

       </td>
       <td className="border px-4 py-2 text-center">
         <Button
           label="Delete"
           onClick={() => handleDelete(notification.id)}
           className="text-white bg-DarkGreen px-3 py-1 rounded hover:bg-DarkGreen"
         />
       </td>
     </tr>
   );
};

export default NotificationItem;
