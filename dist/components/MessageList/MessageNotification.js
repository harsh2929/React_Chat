import React from 'react';
var UnMemoizedMessageNotification = function (props) {
    var children = props.children, onClick = props.onClick, _a = props.showNotification, showNotification = _a === void 0 ? true : _a;
    if (!showNotification)
        return null;
    return (React.createElement("button", { "aria-live": 'polite', className: "str-chat__message-notification", "data-testid": 'message-notification', onClick: onClick }, children));
};
export var MessageNotification = React.memo(UnMemoizedMessageNotification);
