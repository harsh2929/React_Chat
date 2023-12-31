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
export var ChannelStateContext = React.createContext(undefined);
export var ChannelStateProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(ChannelStateContext.Provider, { value: value }, children));
};
export var useChannelStateContext = function (componentName) {
    var contextValue = useContext(ChannelStateContext);
    if (!contextValue) {
        console.warn("The useChannelStateContext hook was called outside of the ChannelStateContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ChannelStateContext
 * typing is desired while using the HOC withChannelStateContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withChannelStateContext = function (Component) {
    var WithChannelStateContextComponent = function (props) {
        var channelStateContext = useChannelStateContext();
        return React.createElement(Component, __assign({}, props, channelStateContext));
    };
    WithChannelStateContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithChannelStateContextComponent;
};
