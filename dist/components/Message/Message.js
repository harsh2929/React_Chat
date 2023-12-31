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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useRef } from 'react';
import { useActionHandler, useDeleteHandler, useEditHandler, useFlagHandler, useMentionsHandler, useMuteHandler, useOpenThreadHandler, usePinHandler, useReactionClick, useReactionHandler, useRetryHandler, useUserHandler, useUserRole, } from './hooks';
import { areMessagePropsEqual, getMessageActions, MESSAGE_ACTIONS } from './utils';
import { MessageProvider, useChannelActionContext, useChannelStateContext, useComponentContext, } from '../../context';
var MessageWithContext = function (props) {
    var canPin = props.canPin, groupedByUser = props.groupedByUser, propMessage = props.Message, message = props.message, _a = props.messageActions, messageActions = _a === void 0 ? Object.keys(MESSAGE_ACTIONS) : _a, propOnUserClick = props.onUserClick, propOnUserHover = props.onUserHover, userRoles = props.userRoles;
    var contextMessage = useComponentContext('Message').Message;
    var actionsEnabled = message.type === 'regular' && message.status === 'received';
    var MessageUIComponent = propMessage || contextMessage;
    var _b = useEditHandler(), clearEdit = _b.clearEdit, editing = _b.editing, setEdit = _b.setEdit;
    var _c = useUserHandler(message, {
        onUserClickHandler: propOnUserClick,
        onUserHoverHandler: propOnUserHover,
    }), onUserClick = _c.onUserClick, onUserHover = _c.onUserHover;
    var canDelete = userRoles.canDelete, canEdit = userRoles.canEdit, canFlag = userRoles.canFlag, canMute = userRoles.canMute, canQuote = userRoles.canQuote, canReact = userRoles.canReact, canReply = userRoles.canReply, isMyMessage = userRoles.isMyMessage;
    var messageActionsHandler = useCallback(function () {
        return getMessageActions(messageActions, {
            canDelete: canDelete,
            canEdit: canEdit,
            canFlag: canFlag,
            canMute: canMute,
            canPin: canPin,
            canQuote: canQuote,
            canReact: canReact,
            canReply: canReply,
        });
    }, [messageActions, canDelete, canEdit, canFlag, canMute, canPin, canQuote, canReact, canReply]);
    var canPinPropToNotPass = props.canPin, // eslint-disable-line @typescript-eslint/no-unused-vars
    messageActionsPropToNotPass = props.messageActions, // eslint-disable-line @typescript-eslint/no-unused-vars
    onlySenderCanEditPropToNotPass = props.onlySenderCanEdit, // eslint-disable-line @typescript-eslint/no-unused-vars
    onUserClickPropToNotPass = props.onUserClick, // eslint-disable-line @typescript-eslint/no-unused-vars
    onUserHoverPropToNotPass = props.onUserHover, // eslint-disable-line @typescript-eslint/no-unused-vars
    userRolesPropToNotPass = props.userRoles, // eslint-disable-line @typescript-eslint/no-unused-vars
    rest = __rest(props, ["canPin", "messageActions", "onlySenderCanEdit", "onUserClick", "onUserHover", "userRoles"]);
    var messageContextValue = __assign(__assign({}, rest), { actionsEnabled: actionsEnabled, clearEditingState: clearEdit, editing: editing, getMessageActions: messageActionsHandler, handleEdit: setEdit, isMyMessage: function () { return isMyMessage; }, onUserClick: onUserClick, onUserHover: onUserHover, setEditingState: setEdit });
    return (React.createElement(MessageProvider, { value: messageContextValue },
        React.createElement(MessageUIComponent, { groupedByUser: groupedByUser })));
};
var MemoizedMessage = React.memo(MessageWithContext, areMessagePropsEqual);
/**
 * The Message component is a context provider which implements all the logic required for rendering
 * an individual message. The actual UI of the message is delegated via the Message prop on Channel.
 */
export var Message = function (props) {
    var closeReactionSelectorOnClick = props.closeReactionSelectorOnClick, disableQuotedMessages = props.disableQuotedMessages, getDeleteMessageErrorNotification = props.getDeleteMessageErrorNotification, getFlagMessageErrorNotification = props.getFlagMessageErrorNotification, getFlagMessageSuccessNotification = props.getFlagMessageSuccessNotification, getMuteUserErrorNotification = props.getMuteUserErrorNotification, getMuteUserSuccessNotification = props.getMuteUserSuccessNotification, getPinMessageErrorNotification = props.getPinMessageErrorNotification, message = props.message, _a = props.onlySenderCanEdit, onlySenderCanEdit = _a === void 0 ? false : _a, propOnMentionsClick = props.onMentionsClick, propOnMentionsHover = props.onMentionsHover, propOpenThread = props.openThread, pinPermissions = props.pinPermissions, propRetrySendMessage = props.retrySendMessage;
    var addNotification = useChannelActionContext('Message').addNotification;
    var _b = useChannelStateContext('Message'), highlightedMessageId = _b.highlightedMessageId, mutes = _b.mutes;
    var reactionSelectorRef = useRef(null);
    var handleAction = useActionHandler(message);
    var handleOpenThread = useOpenThreadHandler(message, propOpenThread);
    var handleReaction = useReactionHandler(message);
    var handleRetry = useRetryHandler(propRetrySendMessage);
    var userRoles = useUserRole(message, onlySenderCanEdit, disableQuotedMessages);
    var handleDelete = useDeleteHandler(message, {
        getErrorNotification: getDeleteMessageErrorNotification,
        notify: addNotification,
    });
    var handleFlag = useFlagHandler(message, {
        getErrorNotification: getFlagMessageErrorNotification,
        getSuccessNotification: getFlagMessageSuccessNotification,
        notify: addNotification,
    });
    var handleMute = useMuteHandler(message, {
        getErrorNotification: getMuteUserErrorNotification,
        getSuccessNotification: getMuteUserSuccessNotification,
        notify: addNotification,
    });
    var _c = useMentionsHandler(message, {
        onMentionsClick: propOnMentionsClick,
        onMentionsHover: propOnMentionsHover,
    }), onMentionsClick = _c.onMentionsClick, onMentionsHover = _c.onMentionsHover;
    var _d = usePinHandler(message, pinPermissions, {
        getErrorNotification: getPinMessageErrorNotification,
        notify: addNotification,
    }), canPin = _d.canPin, handlePin = _d.handlePin;
    var _e = useReactionClick(message, reactionSelectorRef, undefined, closeReactionSelectorOnClick), isReactionEnabled = _e.isReactionEnabled, onReactionListClick = _e.onReactionListClick, showDetailedReactions = _e.showDetailedReactions;
    var highlighted = highlightedMessageId === message.id;
    return (React.createElement(MemoizedMessage, { additionalMessageInputProps: props.additionalMessageInputProps, autoscrollToBottom: props.autoscrollToBottom, canPin: canPin, customMessageActions: props.customMessageActions, disableQuotedMessages: props.disableQuotedMessages, endOfGroup: props.endOfGroup, firstOfGroup: props.firstOfGroup, formatDate: props.formatDate, groupedByUser: props.groupedByUser, groupStyles: props.groupStyles, handleAction: handleAction, handleDelete: handleDelete, handleFlag: handleFlag, handleMute: handleMute, handleOpenThread: handleOpenThread, handlePin: handlePin, handleReaction: handleReaction, handleRetry: handleRetry, highlighted: highlighted, initialMessage: props.initialMessage, isReactionEnabled: isReactionEnabled, lastReceivedId: props.lastReceivedId, message: message, Message: props.Message, messageActions: props.messageActions, messageListRect: props.messageListRect, mutes: mutes, onMentionsClickMessage: onMentionsClick, onMentionsHoverMessage: onMentionsHover, onReactionListClick: onReactionListClick, onUserClick: props.onUserClick, onUserHover: props.onUserHover, pinPermissions: props.pinPermissions, reactionSelectorRef: reactionSelectorRef, readBy: props.readBy, renderText: props.renderText, showDetailedReactions: showDetailedReactions, threadList: props.threadList, unsafeHTML: props.unsafeHTML, userRoles: userRoles }));
};
