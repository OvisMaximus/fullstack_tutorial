import {useNotificationValue} from "../NotificationContext.jsx";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()
  if (notification.message === null || notification.message === '') return null

  return (
    <div style={style}>
        {notification.message}
    </div>
  )
}

export default Notification
