const Notification = ({ message, messageType }) => {
    return (message = null ? null : (
        <div className={messageType}>{message}</div>
    ));
};
export default Notification