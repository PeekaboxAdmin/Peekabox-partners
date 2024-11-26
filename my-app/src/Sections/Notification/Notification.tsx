import React from 'react';
import Switch from '../../Components/Switch'
import './Notification.css'; // Import the CSS file

import Heading from '../../Components/Heading/Heading'

interface NotificationSetting {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const NotificationItem: React.FC<NotificationSetting> = ({
  title,
  description,
  enabled,
  onToggle,
}) => (
  <div className="notification-item">
    <div className="notification-item-details">
      <h4 className="notification-title">{title}</h4>
      <p className="notification-description">{description}</p>
    </div>
    <Switch
      checked={enabled}
      onCheckedChange={onToggle}
      className="notification-switch"
    />
  </div>
);

const NotificationSettings: React.FC = () => {
  const [orderNotifications, setOrderNotifications] = React.useState(true);
  const [offerNotifications, setOfferNotifications] = React.useState(false);
  const [feedbackAlerts, setFeedbackAlerts] = React.useState(false);

  return (
    <>
   
   
   <Heading titleClassName='notification-header' title="Notifications" subtitle='' />
   
    <div className="notification-container">
      
        <div className="notification-content">
          <NotificationItem
            title="Order Notifications"
            description="Receive alerts for new orders, cancellations, and modifications."
            enabled={orderNotifications}
            onToggle={setOrderNotifications}
          />
          <NotificationItem
            title="Offer Notifications"
            description="Get updates about active and upcoming offer changes."
            enabled={offerNotifications}
            onToggle={setOfferNotifications}
          />
          <NotificationItem
            title="Customer Feedback Alerts"
            description="Enable notifications for customer reviews and direct messages."
            enabled={feedbackAlerts}
            onToggle={setFeedbackAlerts}
          />
        </div>
        </div>
     
   
    </>
  );
};

export default NotificationSettings;
