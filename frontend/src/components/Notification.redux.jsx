import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null || message.text === null) return null;

  return <div className={`message ${message.className}`}>{message.text}</div>;
};

export default Notification;
