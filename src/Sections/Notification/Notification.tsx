import React from 'react';
import Switch from '../../Components/Switch';

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = React.useState({
    order: false,
    offer: false,
    feedback: false,
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12">
            <h2 className="text-xl font-semibold md:w-64 shrink-0 text-black">Notifications</h2>

            <div className="flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Order Notifications</h4>
                  <p className="text-xs text-gray-600">
                    Receive alerts for new orders, cancellations, and modifications.
                  </p>
                </div>
                <div className="pr-80 pt-10">
                <Switch
                  checked={notifications.order}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, order: checked }))
                  }
                />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Offer Notifications</h4>
                  <p className="text-xs text-gray-600">
                    Get updates about active and upcoming offer changes.
                  </p>
                </div>
                <div className="pr-80 pt-10">
                <Switch
                  checked={notifications.offer}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, offer: checked }))
                  }
                />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Customer Feedback Alerts</h4>
                  <p className="text-xs text-gray-600">
                    Enable notifications for customer reviews and direct messages.
                  </p>
                </div>
                <div className="pr-80 pt-10">
                <Switch
                  checked={notifications.feedback}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, feedback: checked }))
                  }
                />
                </div>
              </div>
            </div>
          </div>
  );
};

export default NotificationSettings;
