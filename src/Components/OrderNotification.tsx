import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io('wss://api-backend.peekabox.net', {
  transports: ['websocket'],
  secure: true,
  withCredentials: true,
});

const OrderNotification = () => {
  const [notification, setNotification] = useState('');
  // Get Store_id from Redux
      const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  useEffect(() => {
    // Join the store's specific room when the store connects
    socket.emit('joinStoreRoom', storeId);


    socket.on('newOrderNotification', (data) => {
      console.log('Order Notification:', data);
      setNotification(data.message); // Update the state with the new message
    });

    return () => {
      socket.off('newOrderNotification'); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {notification ? (
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="text-lg mb-3">{notification}</div>
          <button
            onClick={() => setNotification('')}
            className="bg-red-500 text-white py-1 px-3 rounded-full absolute top-2 right-2 focus:outline-none"
          >
            X
          </button>
        </div>
      ) : (
        <div className="text-xl text-gray-600">Listening for Order Notifications...</div>
      )}
    </div>
  );
};

export default OrderNotification;
