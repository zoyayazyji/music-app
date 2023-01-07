export const showNotification = (message, variant="success") => {
    return {type: "SHOW_NOTIFICATION", message, variant};
};
export const hideNotification = () => {
    return {type: "HIDE_NOTIFICATION"};
};
