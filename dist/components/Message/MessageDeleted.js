import React from 'react';
import { useUserRole } from './hooks/useUserRole';
import { useTranslationContext } from '../../context/TranslationContext';
export var MessageDeleted = function (props) {
    var message = props.message;
    var t = useTranslationContext('MessageDeleted').t;
    var isMyMessage = useUserRole(message).isMyMessage;
    var messageClasses = isMyMessage
        ? 'str-chat__message str-chat__message--me str-chat__message-simple str-chat__message-simple--me'
        : 'str-chat__message str-chat__message-simple str-chat__message--other';
    return (React.createElement("div", { className: "".concat(messageClasses, " str-chat__message--deleted ").concat(message.type, " "), "data-testid": 'message-deleted-component', key: message.id },
        React.createElement("div", { className: 'str-chat__message--deleted-inner' }, t('This message was deleted...'))));
};
