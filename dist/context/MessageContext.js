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
export var MessageContext = React.createContext(undefined);
export var MessageProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(MessageContext.Provider, { value: value }, children));
};
export var useMessageContext = function (componentName) {
    var contextValue = useContext(MessageContext);
    if (!contextValue) {
        console.warn("The useMessageContext hook was called outside of the MessageContext provider. Make sure this hook is called within the Message's UI component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if MessageContext
 * typing is desired while using the HOC withMessageContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withMessageContext = function (Component) {
    var WithMessageContextComponent = function (props) {
        var messageContext = useMessageContext();
        return React.createElement(Component, __assign({}, props, messageContext));
    };
    WithMessageContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithMessageContextComponent;
};
