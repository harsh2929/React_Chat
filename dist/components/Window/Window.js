import React from 'react';
import { useChannelStateContext } from '../../context/ChannelStateContext';
var UnMemoizedWindow = function (props) {
    var children = props.children, _a = props.hideOnThread, hideOnThread = _a === void 0 ? false : _a;
    var thread = useChannelStateContext('Window').thread;
    return (React.createElement("div", { className: "str-chat__main-panel   ".concat(hideOnThread && thread ? 'str-chat__main-panel--hideOnThread' : '') }, children));
};
/**
 * A UI component for conditionally displaying a Thread or Channel
 */
export var Window = React.memo(UnMemoizedWindow);
