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
import React from 'react';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
/**
 * Component to display system and channel event messages
 */
var UnMemoizedEventComponent = function (props) {
    var _a, _b, _c;
    var _d = props.Avatar, Avatar = _d === void 0 ? DefaultAvatar : _d, message = props.message;
    var tDateTimeParser = useTranslationContext('EventComponent').tDateTimeParser;
    var _e = message.created_at, created_at = _e === void 0 ? '' : _e, event = message.event, text = message.text, type = message.type;
    var getDateOptions = { messageCreatedAt: created_at.toString(), tDateTimeParser: tDateTimeParser };
    if (type === 'system')
        return (React.createElement("div", { className: 'str-chat__message--system' },
            React.createElement("div", { className: 'str-chat__message--system__text' },
                React.createElement("div", { className: 'str-chat__message--system__line' }),
                React.createElement("p", null, text),
                React.createElement("div", { className: 'str-chat__message--system__line' })),
            React.createElement("div", { className: 'str-chat__message--system__date' },
                React.createElement("strong", null,
                    getDateString(__assign(__assign({}, getDateOptions), { format: 'dddd' })),
                    " "),
                "at ",
                getDateString(__assign(__assign({}, getDateOptions), { format: 'hh:mm A' })))));
    if ((event === null || event === void 0 ? void 0 : event.type) === 'member.removed' || (event === null || event === void 0 ? void 0 : event.type) === 'member.added') {
        var name_1 = ((_a = event.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = event.user) === null || _b === void 0 ? void 0 : _b.id);
        var sentence = "".concat(name_1, " ").concat(event.type === 'member.added' ? 'has joined the chat' : 'was removed from the chat');
        return (React.createElement("div", { className: 'str-chat__event-component__channel-event' },
            React.createElement(Avatar, { image: (_c = event.user) === null || _c === void 0 ? void 0 : _c.image, name: name_1, user: event.user }),
            React.createElement("div", { className: 'str-chat__event-component__channel-event__content' },
                React.createElement("em", { className: 'str-chat__event-component__channel-event__sentence' }, sentence),
                React.createElement("div", { className: 'str-chat__event-component__channel-event__date' }, getDateString(__assign(__assign({}, getDateOptions), { format: 'LT' }))))));
    }
    return null;
};
export var EventComponent = React.memo(UnMemoizedEventComponent);
