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
import React, { useCallback, useEffect, useState } from 'react';
import { MessageActionsBox } from './MessageActionsBox';
import { ActionsIcon as DefaultActionsIcon } from '../Message/icons';
import { isUserMuted } from '../Message/utils';
import { useChatContext } from '../../context/ChatContext';
import { useMessageContext } from '../../context/MessageContext';
export var MessageActions = function (props) {
    var _a = props.ActionsIcon, ActionsIcon = _a === void 0 ? DefaultActionsIcon : _a, _b = props.customWrapperClass, customWrapperClass = _b === void 0 ? '' : _b, propGetMessageActions = props.getMessageActions, propHandleDelete = props.handleDelete, propHandleFlag = props.handleFlag, propHandleMute = props.handleMute, propHandlePin = props.handlePin, inline = props.inline, propMessage = props.message, messageWrapperRef = props.messageWrapperRef, mine = props.mine;
    var mutes = useChatContext('MessageActions').mutes;
    var _c = useMessageContext('MessageActions'), customMessageActions = _c.customMessageActions, contextGetMessageActions = _c.getMessageActions, contextHandleDelete = _c.handleDelete, contextHandleFlag = _c.handleFlag, contextHandleMute = _c.handleMute, contextHandlePin = _c.handlePin, isMyMessage = _c.isMyMessage, contextMessage = _c.message, setEditingState = _c.setEditingState;
    var getMessageActions = propGetMessageActions || contextGetMessageActions;
    var handleDelete = propHandleDelete || contextHandleDelete;
    var handleFlag = propHandleFlag || contextHandleFlag;
    var handleMute = propHandleMute || contextHandleMute;
    var handlePin = propHandlePin || contextHandlePin;
    var message = propMessage || contextMessage;
    var _d = useState(false), actionsBoxOpen = _d[0], setActionsBoxOpen = _d[1];
    var isMuted = useCallback(function () { return isUserMuted(message, mutes); }, [message, mutes]);
    var hideOptions = useCallback(function (event) {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') {
            return;
        }
        setActionsBoxOpen(false);
    }, []);
    var messageActions = getMessageActions();
    var messageDeletedAt = !!(message === null || message === void 0 ? void 0 : message.deleted_at);
    useEffect(function () {
        if (messageWrapperRef === null || messageWrapperRef === void 0 ? void 0 : messageWrapperRef.current) {
            messageWrapperRef.current.addEventListener('mouseleave', hideOptions);
        }
    }, [hideOptions, messageWrapperRef]);
    useEffect(function () {
        if (messageDeletedAt) {
            document.removeEventListener('click', hideOptions);
        }
    }, [hideOptions, messageDeletedAt]);
    useEffect(function () {
        if (!actionsBoxOpen)
            return;
        document.addEventListener('click', hideOptions);
        document.addEventListener('keyup', hideOptions);
        return function () {
            document.removeEventListener('click', hideOptions);
            document.removeEventListener('keyup', hideOptions);
        };
    }, [actionsBoxOpen, hideOptions]);
    if (!messageActions.length && !customMessageActions)
        return null;
    return (React.createElement(MessageActionsWrapper, { customWrapperClass: customWrapperClass, inline: inline, setActionsBoxOpen: setActionsBoxOpen },
        React.createElement(MessageActionsBox, { getMessageActions: getMessageActions, handleDelete: handleDelete, handleEdit: setEditingState, handleFlag: handleFlag, handleMute: handleMute, handlePin: handlePin, isUserMuted: isMuted, mine: mine ? mine() : isMyMessage(), open: actionsBoxOpen }),
        React.createElement("button", { "aria-expanded": actionsBoxOpen, "aria-haspopup": 'true', "aria-label": 'Open Message Actions Menu', className: 'str-chat__message-actions-box-button' },
            React.createElement(ActionsIcon, { className: 'str-chat__message-action-icon' }))));
};
var MessageActionsWrapper = function (props) {
    var children = props.children, customWrapperClass = props.customWrapperClass, inline = props.inline, setActionsBoxOpen = props.setActionsBoxOpen;
    var defaultWrapperClass = "\n  str-chat__message-simple__actions__action\n  str-chat__message-simple__actions__action--options\n  str-chat__message-actions-container";
    var wrapperClass = customWrapperClass || defaultWrapperClass;
    var onClickOptionsAction = function (event) {
        event.stopPropagation();
        setActionsBoxOpen(function (prev) { return !prev; });
    };
    var wrapperProps = {
        className: wrapperClass,
        'data-testid': 'message-actions',
        onClick: onClickOptionsAction,
    };
    if (inline)
        return React.createElement("span", __assign({}, wrapperProps), children);
    return React.createElement("div", __assign({}, wrapperProps), children);
};
