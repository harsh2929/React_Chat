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
import React, { useContext } from 'react';
import { getDisplayName } from './utils/getDisplayName';
export var ChatContext = React.createContext(undefined);
export var ChatProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(ChatContext.Provider, { value: value }, children));
};
export var useChatContext = function (componentName) {
    var contextValue = useContext(ChatContext);
    if (!contextValue) {
        console.warn("The useChatContext hook was called outside of the ChatContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference so if ChatContext
 * typing is desired while using the HOC withChatContext the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withChatContext = function (Component) {
    var WithChatContextComponent = function (props) {
        var chatContext = useChatContext();
        return React.createElement(Component, __assign({}, props, chatContext));
    };
    WithChatContextComponent.displayName = "WithChatContext".concat(getDisplayName(Component));
    return WithChatContextComponent;
};
