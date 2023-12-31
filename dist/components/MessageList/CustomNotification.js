import React from 'react';
var UnMemoizedCustomNotification = function (props) {
    var active = props.active, children = props.children, type = props.type;
    if (!active)
        return null;
    return (React.createElement("div", { "aria-live": 'polite', className: "str-chat__custom-notification notification-".concat(type, " str-chat__notification"), "data-testid": 'custom-notification' }, children));
};
export var CustomNotification = React.memo(UnMemoizedCustomNotification);
