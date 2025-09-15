const Notification = ({ message, className }) => {
  if (message === null) return null;

  return <div className={`message ${className}`}>{message}</div>;
};

export default Notification;
