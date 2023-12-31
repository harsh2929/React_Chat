import React from 'react';
import { ChatDown } from '../ChatDown/ChatDown';
import { LoadingChannels } from '../Loading/LoadingChannels';
/**
 * A preview list of channels, allowing you to select the channel you want to open
 */
export var ChannelListMessenger = function (props) {
    var children = props.children, _a = props.error, error = _a === void 0 ? null : _a, loading = props.loading, _b = props.LoadingErrorIndicator, LoadingErrorIndicator = _b === void 0 ? ChatDown : _b, _c = props.LoadingIndicator, LoadingIndicator = _c === void 0 ? LoadingChannels : _c;
    if (error) {
        return React.createElement(LoadingErrorIndicator, { type: 'Connection Error' });
    }
    if (loading) {
        return React.createElement(LoadingIndicator, null);
    }
    return (React.createElement("div", { className: 'str-chat__channel-list-messenger str-chat__channel-list-messenger-react' },
        React.createElement("div", { "aria-label": 'Channel list', className: 'str-chat__channel-list-messenger__main str-chat__channel-list-messenger-react__main', role: 'listbox' }, children)));
};
