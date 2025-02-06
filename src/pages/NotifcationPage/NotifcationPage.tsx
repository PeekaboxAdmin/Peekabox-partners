import React, { useState } from "react";
import Filter from "../../Components/Filter/Filter";
import NotificationList from '../../Sections/NotificationsPage/NotificationList '
import Pagination from "../../Components/Pagination/Pagination";
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';





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

  /*sidebar  */
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
      setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="min-h-screen flex flex-col bg-red overflow-x-hidden">
      {/* Sidebar and Content */}
      <div className="flex flex-1 flex-row-reverse lg:flex-row">
        <Sidebar 
          isOpen={sidebarExpanded} 
          onToggle={toggleSidebar} 
          onNavClick={() => {}}  
          className={`
            absolute 
            sm:w-56 
            md:w-10 
            ${sidebarExpanded ? 'block' : 'hidden'} 
            lg:block 
            top-0 
            left-0 
            z-50
            ${window.innerWidth === 820 ? 'md:relative' : ''}
          `}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:px-32 md:px-4 ">
          <Header />

          <div className={`
            p-4 
            sm:p-6 
            lg:p-8 
            mx-auto 
            w-full
            md:w-3/4
            lg:w-full
            ${window.innerWidth === 820 ? 'md:max-w-2xl' : 'max-w-7xl'}
          `}>
            <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <Filter
                filter={filter}
                setFilter={setFilter}
                options={["All", "New Order", "Cancellation", "Update"]}
                label="Notifications"
              />
            </div>

            {/* Notification List */}
            <div className="bg-white p-4 rounded-lg shadow">
              <NotificationList
                notifications={displayedNotifications}
                handleMarkAsRead={handleMarkAsRead}
                handleDelete={handleDelete}
              />

              {/* Pagination */}
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    };

    export default NotificationPage;