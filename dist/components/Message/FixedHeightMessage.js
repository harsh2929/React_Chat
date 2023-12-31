import React, { useCallback, useMemo } from 'react';
import { useActionHandler, useDeleteHandler, useUserRole } from './hooks';
import { MessageDeleted as DefaultMessageDeleted } from './MessageDeleted';
import { MessageTimestamp } from './MessageTimestamp';
import { getMessageActions } from './utils';
import { Avatar } from '../Avatar';
import { Gallery } from '../Gallery';
import { MessageActions } from '../MessageActions';
import { MML } from '../MML';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { renderText } from '../../utils';
var selectColor = function (number, dark) {
    var hue = number * 137.508; // use golden angle approximation
    return "hsl(".concat(hue, ",").concat(dark ? '50%' : '85%', ", ").concat(dark ? '75%' : '55%', ")");
};
var hashUserId = function (userId) {
    var hash = userId.split('').reduce(function (acc, c) {
        acc = (acc << 5) - acc + c.charCodeAt(0); // eslint-disable-line
        return acc & acc; // eslint-disable-line no-bitwise
    }, 0);
    return Math.abs(hash) / Math.pow(10, Math.ceil(Math.log10(Math.abs(hash) + 1)));
};
var getUserColor = function (theme, userId) {
    return selectColor(hashUserId(userId), theme.includes('dark'));
};
var UnMemoizedFixedHeightMessage = function (props) {
    var _a, _b, _c, _d;
    var propGroupedByUser = props.groupedByUser, propMessage = props.message;
    var theme = useChatContext('FixedHeightMessage').theme;
    var _e = useMessageContext('FixedHeightMessage'), contextGroupedByUser = _e.groupedByUser, contextMessage = _e.message;
    var _f = useComponentContext('FixedHeightMessage').MessageDeleted, MessageDeleted = _f === void 0 ? DefaultMessageDeleted : _f;
    var userLanguage = useTranslationContext('FixedHeightMessage').userLanguage;
    var groupedByUser = propGroupedByUser !== undefined ? propGroupedByUser : contextGroupedByUser;
    var message = propMessage || contextMessage;
    var handleAction = useActionHandler(message);
    var handleDelete = useDeleteHandler(message);
    var role = useUserRole(message);
    var messageTextToRender = ((_a = message === null || message === void 0 ? void 0 : message.i18n) === null || _a === void 0 ? void 0 : _a["".concat(userLanguage, "_text")]) || (message === null || message === void 0 ? void 0 : message.text);
    var renderedText = useMemo(function () { return renderText(messageTextToRender, message.mentioned_users); }, [
        message.mentioned_users,
        messageTextToRender,
    ]);
    var userId = ((_b = message.user) === null || _b === void 0 ? void 0 : _b.id) || '';
    var userColor = useMemo(function () { return getUserColor(theme, userId); }, [userId, theme]);
    var messageActionsHandler = useCallback(function () { return getMessageActions(['delete'], { canDelete: role.canDelete }); }, [role]);
    var images = (_c = message === null || message === void 0 ? void 0 : message.attachments) === null || _c === void 0 ? void 0 : _c.filter(function (_a) {
        var type = _a.type;
        return type === 'image';
    });
    return (React.createElement("div", { className: "str-chat__virtual-message__wrapper ".concat(role.isMyMessage ? 'str-chat__virtual-message__wrapper--me' : '', " ").concat(groupedByUser ? 'str-chat__virtual-message__wrapper--group' : ''), key: message.id },
        message.user && (React.createElement(Avatar, { image: message.user.image, name: message.user.name || message.user.id, shape: 'rounded', size: 38, user: message.user })),
        React.createElement("div", { className: 'str-chat__virtual-message__content' },
            React.createElement("div", { className: 'str-chat__virtual-message__meta' },
                React.createElement("div", { className: 'str-chat__virtual-message__author', style: { color: userColor } },
                    React.createElement("strong", null, ((_d = message.user) === null || _d === void 0 ? void 0 : _d.name) || 'unknown'))),
            message.deleted_at || message.type === 'deleted' ? (React.createElement(MessageDeleted, { message: message })) : (React.createElement(React.Fragment, null,
                images && React.createElement(Gallery, { images: images }),
                React.createElement("div", { className: 'str-chat__virtual-message__text', "data-testid": 'msg-text' },
                    renderedText,
                    message.mml && (React.createElement(MML, { actionHandler: handleAction, align: 'left', source: message.mml })),
                    React.createElement("div", { className: 'str-chat__virtual-message__data' },
                        React.createElement(MessageActions, { customWrapperClass: 'str-chat__virtual-message__actions', getMessageActions: messageActionsHandler, handleDelete: handleDelete, message: message, mine: function () { return role.isMyMessage; } }),
                        React.createElement("span", { className: 'str-chat__virtual-message__date' },
                            React.createElement(MessageTimestamp, { customClass: 'str-chat__message-simple-timestamp', message: message })))))))));
};
/**
 * @deprecated - This UI component will be removed in the next major release.
 *
 * FixedHeightMessage - This component renders a single message.
 * It uses fixed height elements to make sure it works well in VirtualizedMessageList
 */
export var FixedHeightMessage = React.memo(UnMemoizedFixedHeightMessage);
