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
export var ChannelActionContext = React.createContext(undefined);
export var ChannelActionProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(ChannelActionContext.Provider, { value: value }, children));
};
export var useChannelActionContext = function (componentName) {
    var contextValue = useContext(ChannelActionContext);
    if (!contextValue) {
        console.warn("The useChannelActionContext hook was called outside of the ChannelActionContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ChannelActionContext
 * typing is desired while using the HOC withChannelActionContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withChannelActionContext = function (Component) {
    var WithChannelActionContextComponent = function (props) {
        var channelActionContext = useChannelActionContext();
        return React.createElement(Component, __assign({}, props, channelActionContext));
    };
    WithChannelActionContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithChannelActionContextComponent;
};
