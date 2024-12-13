import React, { useState } from "react";
import Filter from "../../Components/Filter/Filter";
import NotificationList from '../../Sections/NotificationsPage/NotificationList '
import Pagination from "../../Components/Pagination/Pagination";

type Notification = {
  id: number;
  type: "New Order" | "Cancellation" | "Update";
  message: string;
  time: string;
  read: boolean;
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "New Order", message: "Order #1234 placed", time: "5 mins ago", read: false },
    { id: 2, type: "Cancellation", message: "Order #1235 canceled", time: "10 mins ago", read: false },
    { id: 3, type: "Update", message: "Order #1236 updated", time: "15 mins ago", read: true },
    { id: 4, type: "New Order", message: "Order #1237 placed", time: "20 mins ago", read: false },
    { id: 5, type: "Cancellation", message: "Order #1238 canceled", time: "25 mins ago", read: false },
    { id: 6, type: "Update", message: "Order #1239 updated", time: "30 mins ago", read: true },
    { id: 7, type: "New Order", message: "Order #1240 placed", time: "35 mins ago", read: false },
    { id: 8, type: "Cancellation", message: "Order #1241 canceled", time: "40 mins ago", read: false },
    { id: 9, type: "Update", message: "Order #1242 updated", time: "45 mins ago", read: true },
    { id: 10, type: "New Order", message: "Order #1243 placed", time: "50 mins ago", read: false },
  ]);

  const [filter, setFilter] = useState<"All" | "New Order" | "Cancellation" | "Update">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Filter the notifications
  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((notif) => notif.type === filter);

  //  total pages
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  //  current page
  const displayedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="md:w-1/4 bg-gray-100 p-4 rounded-md">
      
        <Filter
          filter={filter}
          setFilter={setFilter}
          options={["All", "New Order", "Cancellation", "Update"]}
          label="Notifications"
        />
      </div>


      <div className="md:w-3/4 flex-1 bg-white p-4 rounded-md shadow-md">
      
        <NotificationList
          notifications={displayedNotifications}
          handleMarkAsRead={handleMarkAsRead}
          handleDelete={handleDelete}
        />
        
      
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NotificationPage;
