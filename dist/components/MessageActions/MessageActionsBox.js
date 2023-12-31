import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { MESSAGE_ACTIONS } from '../Message/utils';
import { useChannelActionContext } from '../../context/ChannelActionContext';
import { useMessageContext, } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
var CustomMessageActionsList = function (props) {
    var customMessageActions = props.customMessageActions, message = props.message;
    var customActionsArray = Object.keys(customMessageActions);
    return (React.createElement(React.Fragment, null, customActionsArray.map(function (customAction) {
        var customHandler = customMessageActions[customAction];
        return (React.createElement("button", { "aria-selected": 'false', className: 'str-chat__message-actions-list-item str-chat__message-actions-list-item-button', key: customAction, onClick: function (event) { return customHandler(message, event); }, role: 'option' }, customAction));
    })));
};
var UnMemoizedMessageActionsBox = function (props) {
    var getMessageActions = props.getMessageActions, handleDelete = props.handleDelete, handleEdit = props.handleEdit, handleFlag = props.handleFlag, handleMute = props.handleMute, handlePin = props.handlePin, isUserMuted = props.isUserMuted, mine = props.mine, _a = props.open, open = _a === void 0 ? false : _a;
    var setQuotedMessage = useChannelActionContext('MessageActionsBox').setQuotedMessage;
    var _b = useMessageContext('MessageActionsBox'), customMessageActions = _b.customMessageActions, message = _b.message, messageListRect = _b.messageListRect;
    var t = useTranslationContext('MessageActionsBox').t;
    var _c = useState(false), reverse = _c[0], setReverse = _c[1];
    var messageActions = getMessageActions();
    var checkIfReverse = useCallback(function (containerElement) {
        if (!containerElement) {
            setReverse(false);
            return;
        }
        if (open) {
            var containerRect = containerElement.getBoundingClientRect();
            if (mine) {
                setReverse(!!messageListRect && containerRect.left < messageListRect.left);
            }
            else {
                setReverse(!!messageListRect && containerRect.right + 5 > messageListRect.right);
            }
        }
    }, [messageListRect, mine, open]);
    var handleQuote = function () {
        setQuotedMessage(message);
        var elements = message.parent_id
            ? document.querySelectorAll('.str-chat__thread .str-chat__textarea__textarea')
            : document.getElementsByClassName('str-chat__textarea__textarea');
        var textarea = elements.item(0);
        if (textarea instanceof HTMLTextAreaElement) {
            textarea.focus();
        }
    };
    var rootClassName = clsx('str-chat__message-actions-box', {
        'str-chat__message-actions-box--mine': mine,
        'str-chat__message-actions-box--open': open,
        'str-chat__message-actions-box--reverse': reverse,
    });
    var buttonClassName = 'str-chat__message-actions-list-item str-chat__message-actions-list-item-button';
    return (React.createElement("div", { className: rootClassName, "data-testid": 'message-actions-box', ref: checkIfReverse },
        React.createElement("div", { "aria-label": 'Message Options', className: 'str-chat__message-actions-list', role: 'listbox' },
            customMessageActions && (React.createElement(CustomMessageActionsList, { customMessageActions: customMessageActions, message: message })),
            messageActions.indexOf(MESSAGE_ACTIONS.quote) > -1 && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handleQuote, role: 'option' }, t('Reply'))),
            messageActions.indexOf(MESSAGE_ACTIONS.pin) > -1 && !message.parent_id && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handlePin, role: 'option' }, !message.pinned ? t('Pin') : t('Unpin'))),
            messageActions.indexOf(MESSAGE_ACTIONS.flag) > -1 && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handleFlag, role: 'option' }, t('Flag'))),
            messageActions.indexOf(MESSAGE_ACTIONS.mute) > -1 && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handleMute, role: 'option' }, isUserMuted() ? t('Unmute') : t('Mute'))),
            messageActions.indexOf(MESSAGE_ACTIONS.edit) > -1 && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handleEdit, role: 'option' }, t('Edit Message'))),
            messageActions.indexOf(MESSAGE_ACTIONS.delete) > -1 && (React.createElement("button", { "aria-selected": 'false', className: buttonClassName, onClick: handleDelete, role: 'option' }, t('Delete'))))));
};
/**
 * A popup box that displays the available actions on a message, such as edit, delete, pin, etc.
 */
export var MessageActionsBox = React.memo(UnMemoizedMessageActionsBox);
