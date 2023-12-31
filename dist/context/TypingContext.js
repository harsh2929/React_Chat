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
export var TypingContext = React.createContext(undefined);
export var TypingProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(TypingContext.Provider, { value: value }, children));
};
export var useTypingContext = function (componentName) {
    var contextValue = useContext(TypingContext);
    if (!contextValue) {
        console.warn("The useTypingContext hook was called outside of the TypingContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if TypingContext
 * typing is desired while using the HOC withTypingContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withTypingContext = function (Component) {
    var WithTypingContextComponent = function (props) {
        var typingContext = useTypingContext();
        return React.createElement(Component, __assign({}, props, typingContext));
    };
    WithTypingContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithTypingContextComponent;
};
