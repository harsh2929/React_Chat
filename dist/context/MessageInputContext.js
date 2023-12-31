import React, { createContext, useContext } from 'react';
export var MessageInputContext = createContext(undefined);
export var MessageInputContextProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(MessageInputContext.Provider, { value: value }, children));
};
export var useMessageInputContext = function (componentName) {
    var contextValue = useContext(MessageInputContext);
    if (!contextValue) {
        console.warn("The useMessageInputContext hook was called outside of the MessageInputContext provider. Make sure this hook is called within the MessageInput's UI component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
