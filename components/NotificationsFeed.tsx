import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";


const Notifications = () => {

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotification = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [])

  // not exist notifications
  if (fetchedNotification.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      { fetchedNotification.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            { notification.body }
          </p>

        </div>
      ))}
    </div>
  )
}

export default Notifications;