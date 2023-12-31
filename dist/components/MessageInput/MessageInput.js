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
import React, { useMemo } from 'react';
import { DefaultTriggerProvider } from './DefaultTriggerProvider';
import { MessageInputFlat } from './MessageInputFlat';
import { useCooldownTimer } from './hooks/useCooldownTimer';
import { useCreateMessageInputContext } from './hooks/useCreateMessageInputContext';
import { useMessageInputState } from './hooks/useMessageInputState';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useComponentContext } from '../../context/ComponentContext';
import { MessageInputContextProvider } from '../../context/MessageInputContext';
var MessageInputProvider = function (props) {
    var cooldownTimerState = useCooldownTimer();
    var messageInputState = useMessageInputState(props);
    var messageInputContextValue = useCreateMessageInputContext(__assign(__assign(__assign({}, cooldownTimerState), messageInputState), props));
    return (React.createElement(MessageInputContextProvider, { value: messageInputContextValue }, props.children));
};
var UnMemoizedMessageInput = function (props) {
    var PropInput = props.Input;
    var dragAndDropWindow = useChannelStateContext().dragAndDropWindow;
    var _a = useComponentContext('MessageInput'), ContextInput = _a.Input, _b = _a.TriggerProvider, TriggerProvider = _b === void 0 ? DefaultTriggerProvider : _b;
    var Input = PropInput || ContextInput || MessageInputFlat;
    var OptionalMessageInputProvider = useMemo(function () { return (dragAndDropWindow ? React.Fragment : MessageInputProvider); }, [dragAndDropWindow]);
    return (React.createElement(OptionalMessageInputProvider, __assign({}, props),
        React.createElement(TriggerProvider, null,
            React.createElement(Input, null))));
};
/**
 * A high level component that has provides all functionality to the Input it renders.
 */
export var MessageInput = React.memo(UnMemoizedMessageInput);
