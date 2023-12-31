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
export var ComponentContext = React.createContext(undefined);
export var ComponentProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(ComponentContext.Provider, { value: value }, children));
};
export var useComponentContext = function (componentName) {
    var contextValue = useContext(ComponentContext);
    if (!contextValue) {
        console.warn("The useComponentContext hook was called outside of the ComponentContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ComponentContext
 * typing is desired while using the HOC withComponentContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export var withComponentContext = function (Component) {
    var WithComponentContextComponent = function (props) {
        var componentContext = useComponentContext();
        return React.createElement(Component, __assign({}, props, componentContext));
    };
    WithComponentContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithComponentContextComponent;
};
