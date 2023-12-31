var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import clsx from 'clsx';
import { MessageErrorIcon } from './icons';
import { MessageDeleted as DefaultMessageDeleted } from './MessageDeleted';
import { MessageOptions as DefaultMessageOptions } from './MessageOptions';
import { MessageRepliesCountButton as DefaultMessageRepliesCountButton } from './MessageRepliesCountButton';
import { MessageStatus as DefaultMessageStatus } from './MessageStatus';
import { MessageText } from './MessageText';
import { MessageTimestamp as DefaultMessageTimestamp } from './MessageTimestamp';
import { areMessageUIPropsEqual, messageHasAttachments, messageHasReactions } from './utils';
import { Avatar as DefaultAvatar } from '../Avatar';
import { CUSTOM_MESSAGE_TYPE } from '../../constants/messageTypes';
import { EditMessageForm as DefaultEditMessageForm, MessageInput } from '../MessageInput';
import { MML } from '../MML';
import { Modal } from '../Modal';
import { ReactionsList as DefaultReactionList, ReactionSelector as DefaultReactionSelector, } from '../Reactions';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
var MessageSimpleWithContext = function (props) {
    var _a;
    var additionalMessageInputProps = props.additionalMessageInputProps, clearEditingState = props.clearEditingState, editing = props.editing, endOfGroup = props.endOfGroup, firstOfGroup = props.firstOfGroup, groupedByUser = props.groupedByUser, handleAction = props.handleAction, handleOpenThread = props.handleOpenThread, handleRetry = props.handleRetry, highlighted = props.highlighted, isMyMessage = props.isMyMessage, isReactionEnabled = props.isReactionEnabled, message = props.message, onUserClick = props.onUserClick, onUserHover = props.onUserHover, reactionSelectorRef = props.reactionSelectorRef, showDetailedReactions = props.showDetailedReactions, threadList = props.threadList;
    var _b = useComponentContext('MessageSimple'), Attachment = _b.Attachment, _c = _b.Avatar, Avatar = _c === void 0 ? DefaultAvatar : _c, _d = _b.EditMessageInput, EditMessageInput = _d === void 0 ? DefaultEditMessageForm : _d, _e = _b.MessageDeleted, MessageDeleted = _e === void 0 ? DefaultMessageDeleted : _e, _f = _b.MessageOptions, MessageOptions = _f === void 0 ? DefaultMessageOptions : _f, _g = _b.MessageRepliesCountButton, MessageRepliesCountButton = _g === void 0 ? DefaultMessageRepliesCountButton : _g, _h = _b.MessageStatus, MessageStatus = _h === void 0 ? DefaultMessageStatus : _h, _j = _b.MessageTimestamp, MessageTimestamp = _j === void 0 ? DefaultMessageTimestamp : _j, _k = _b.ReactionSelector, ReactionSelector = _k === void 0 ? DefaultReactionSelector : _k, _l = _b.ReactionsList, ReactionsList = _l === void 0 ? DefaultReactionList : _l;
    var themeVersion = useChatContext('MessageSimple').themeVersion;
    var hasAttachment = messageHasAttachments(message);
    var hasReactions = messageHasReactions(message);
    if (message.customType === CUSTOM_MESSAGE_TYPE.date) {
        return null;
    }
    if (message.deleted_at || message.type === 'deleted') {
        return React.createElement(MessageDeleted, { message: message });
    }
    var showMetadata = !groupedByUser || endOfGroup;
    var showReplyCountButton = !threadList && !!message.reply_count;
    var allowRetry = message.status === 'failed' && message.errorStatusCode !== 403;
    var rootClassName = clsx('str-chat__message str-chat__message-simple', "str-chat__message--".concat(message.type), "str-chat__message--".concat(message.status), isMyMessage()
        ? 'str-chat__message--me str-chat__message-simple--me'
        : 'str-chat__message--other', message.text ? 'str-chat__message--has-text' : 'has-no-text', {
        'pinned-message': message.pinned,
        'str-chat__message--has-attachment': hasAttachment,
        'str-chat__message--highlighted': highlighted,
        'str-chat__message--with-reactions str-chat__message-with-thread-link': hasReactions && isReactionEnabled,
        'str-chat__message-send-can-be-retried': (message === null || message === void 0 ? void 0 : message.status) === 'failed' && (message === null || message === void 0 ? void 0 : message.errorStatusCode) !== 403,
        'str-chat__virtual-message__wrapper--end': endOfGroup,
        'str-chat__virtual-message__wrapper--first': firstOfGroup,
        'str-chat__virtual-message__wrapper--group': groupedByUser,
    });
    return (React.createElement(React.Fragment, null,
        editing && (React.createElement(Modal, { onClose: clearEditingState, open: editing },
            React.createElement(MessageInput, __assign({ clearEditingState: clearEditingState, grow: true, Input: EditMessageInput, message: message }, additionalMessageInputProps)))),
        React.createElement("div", { className: rootClassName, key: message.id },
            themeVersion === '1' && React.createElement(MessageStatus, null),
            message.user && (React.createElement(Avatar, { image: message.user.image, name: message.user.name || message.user.id, onClick: onUserClick, onMouseOver: onUserHover, user: message.user })),
            React.createElement("div", { className: clsx('str-chat__message-inner', {
                    'str-chat__simple-message--error-failed': allowRetry,
                }), "data-testid": 'message-inner', onClick: allowRetry ? function () { return handleRetry(message); } : undefined, onKeyUp: allowRetry ? function () { return handleRetry(message); } : undefined },
                React.createElement(MessageOptions, null),
                React.createElement("div", { className: 'str-chat__message-reactions-host' },
                    hasReactions && isReactionEnabled && React.createElement(ReactionsList, { reverse: true }),
                    showDetailedReactions && isReactionEnabled && (React.createElement(ReactionSelector, { ref: reactionSelectorRef }))),
                React.createElement("div", { className: 'str-chat__message-bubble' },
                    ((_a = message.attachments) === null || _a === void 0 ? void 0 : _a.length) && !message.quoted_message ? (React.createElement(Attachment, { actionHandler: handleAction, attachments: message.attachments })) : null,
                    React.createElement(MessageText, { message: message }),
                    message.mml && (React.createElement(MML, { actionHandler: handleAction, align: isMyMessage() ? 'right' : 'left', source: message.mml })),
                    themeVersion === '2' && React.createElement(MessageErrorIcon, null)),
                showReplyCountButton && themeVersion === '1' && (React.createElement(MessageRepliesCountButton, { onClick: handleOpenThread, reply_count: message.reply_count })),
                showMetadata && themeVersion === '1' && (React.createElement("div", { className: 'str-chat__message-data str-chat__message-simple-data' },
                    !isMyMessage() && message.user ? (React.createElement("span", { className: 'str-chat__message-simple-name' }, message.user.name || message.user.id)) : null,
                    React.createElement(MessageTimestamp, { calendar: true, customClass: 'str-chat__message-simple-timestamp' })))),
            showReplyCountButton && themeVersion === '2' && (React.createElement(MessageRepliesCountButton, { onClick: handleOpenThread, reply_count: message.reply_count })),
            showMetadata && themeVersion === '2' && (React.createElement("div", { className: 'str-chat__message-data str-chat__message-simple-data str-chat__message-metadata' },
                React.createElement(MessageStatus, null),
                !isMyMessage() && !!message.user && (React.createElement("span", { className: 'str-chat__message-simple-name' }, message.user.name || message.user.id)),
                React.createElement(MessageTimestamp, { calendar: true, customClass: 'str-chat__message-simple-timestamp' }))))));
};
var MemoizedMessageSimple = React.memo(MessageSimpleWithContext, areMessageUIPropsEqual);
/**
 * The default UI component that renders a message and receives functionality and logic from the MessageContext.
 */
export var MessageSimple = function (props) {
    var messageContext = useMessageContext('MessageSimple');
    return React.createElement(MemoizedMessageSimple, __assign({}, messageContext, props));
};
