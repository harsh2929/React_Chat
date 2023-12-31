var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import deepequal from 'react-fast-compare';
/**
 * Following function validates a function which returns notification message.
 * It validates if the first parameter is function and also if return value of function is string or no.
 */
export var validateAndGetMessage = function (func, args) {
    if (!func || typeof func !== 'function')
        return null;
    // below is due to tests passing a single argument
    // rather than an array.
    if (!(args instanceof Array)) {
        // @ts-expect-error
        args = [args];
    }
    var returnValue = func.apply(void 0, args);
    if (typeof returnValue !== 'string')
        return null;
    return returnValue;
};
/**
 * Tell if the owner of the current message is muted
 */
export var isUserMuted = function (message, mutes) {
    if (!mutes || !message)
        return false;
    var userMuted = mutes.filter(function (el) { var _a; return el.target.id === ((_a = message.user) === null || _a === void 0 ? void 0 : _a.id); });
    return !!userMuted.length;
};
export var MESSAGE_ACTIONS = {
    delete: 'delete',
    edit: 'edit',
    flag: 'flag',
    mute: 'mute',
    pin: 'pin',
    quote: 'quote',
    react: 'react',
    reply: 'reply',
};
// @deprecated in favor of `channelCapabilities` - TODO: remove in next major release
export var defaultPinPermissions = {
    commerce: {
        admin: true,
        anonymous: false,
        channel_member: false,
        channel_moderator: true,
        guest: false,
        member: false,
        moderator: true,
        owner: true,
        user: false,
    },
    gaming: {
        admin: true,
        anonymous: false,
        channel_member: false,
        channel_moderator: true,
        guest: false,
        member: false,
        moderator: true,
        owner: false,
        user: false,
    },
    livestream: {
        admin: true,
        anonymous: false,
        channel_member: false,
        channel_moderator: true,
        guest: false,
        member: false,
        moderator: true,
        owner: true,
        user: false,
    },
    messaging: {
        admin: true,
        anonymous: false,
        channel_member: true,
        channel_moderator: true,
        guest: false,
        member: true,
        moderator: true,
        owner: true,
        user: false,
    },
    team: {
        admin: true,
        anonymous: false,
        channel_member: true,
        channel_moderator: true,
        guest: false,
        member: true,
        moderator: true,
        owner: true,
        user: false,
    },
};
export var getMessageActions = function (actions, _a) {
    var canDelete = _a.canDelete, canEdit = _a.canEdit, canFlag = _a.canFlag, canMute = _a.canMute, canPin = _a.canPin, canQuote = _a.canQuote, canReact = _a.canReact, canReply = _a.canReply;
    var messageActionsAfterPermission = [];
    var messageActions = [];
    if (actions && typeof actions === 'boolean') {
        // If value of actions is true, then populate all the possible values
        messageActions = Object.keys(MESSAGE_ACTIONS);
    }
    else if (actions && actions.length > 0) {
        messageActions = __spreadArray([], actions, true);
    }
    else {
        return [];
    }
    if (canDelete && messageActions.indexOf(MESSAGE_ACTIONS.delete) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.delete);
    }
    if (canEdit && messageActions.indexOf(MESSAGE_ACTIONS.edit) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.edit);
    }
    if (canFlag && messageActions.indexOf(MESSAGE_ACTIONS.flag) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.flag);
    }
    if (canMute && messageActions.indexOf(MESSAGE_ACTIONS.mute) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.mute);
    }
    if (canPin && messageActions.indexOf(MESSAGE_ACTIONS.pin) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.pin);
    }
    if (canQuote && messageActions.indexOf(MESSAGE_ACTIONS.quote) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.quote);
    }
    if (canReact && messageActions.indexOf(MESSAGE_ACTIONS.react) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.react);
    }
    if (canReply && messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1) {
        messageActionsAfterPermission.push(MESSAGE_ACTIONS.reply);
    }
    return messageActionsAfterPermission;
};
var ACTIONS_NOT_WORKING_IN_THREAD = ['pin', 'react', 'reply'];
export var showMessageActionsBox = function (actions, inThread) {
    if (actions.length === 0) {
        return false;
    }
    if (inThread &&
        actions.filter(function (action) { return !ACTIONS_NOT_WORKING_IN_THREAD.includes(action); }).length === 0) {
        return false;
    }
    if (actions.length === 1 && (actions.includes('react') || actions.includes('reply'))) {
        return false;
    }
    if (actions.length === 2 && actions.includes('react') && actions.includes('reply')) {
        return false;
    }
    return true;
};
var areMessagesEqual = function (prevMessage, nextMessage) {
    var _a, _b, _c, _d, _e, _f;
    return prevMessage.deleted_at === nextMessage.deleted_at &&
        ((_a = prevMessage.latest_reactions) === null || _a === void 0 ? void 0 : _a.length) === ((_b = nextMessage.latest_reactions) === null || _b === void 0 ? void 0 : _b.length) &&
        ((_c = prevMessage.own_reactions) === null || _c === void 0 ? void 0 : _c.length) === ((_d = nextMessage.own_reactions) === null || _d === void 0 ? void 0 : _d.length) &&
        prevMessage.pinned === nextMessage.pinned &&
        prevMessage.reply_count === nextMessage.reply_count &&
        prevMessage.status === nextMessage.status &&
        prevMessage.text === nextMessage.text &&
        prevMessage.type === nextMessage.type &&
        prevMessage.updated_at === nextMessage.updated_at &&
        ((_e = prevMessage.user) === null || _e === void 0 ? void 0 : _e.updated_at) === ((_f = nextMessage.user) === null || _f === void 0 ? void 0 : _f.updated_at);
};
export var areMessagePropsEqual = function (prevProps, nextProps) {
    var prevMessage = prevProps.message, prevMessageUI = prevProps.Message;
    var nextMessage = nextProps.message, nextMessageUI = nextProps.Message;
    if (prevMessageUI !== nextMessageUI)
        return false;
    if (prevProps.endOfGroup !== nextProps.endOfGroup)
        return false;
    if (nextProps.showDetailedReactions !== prevProps.showDetailedReactions) {
        return false;
    }
    var messagesAreEqual = areMessagesEqual(prevMessage, nextMessage);
    if (!messagesAreEqual)
        return false;
    var deepEqualProps = deepequal(nextProps.messageActions, prevProps.messageActions) &&
        deepequal(nextProps.readBy, prevProps.readBy) &&
        deepequal(nextProps.highlighted, prevProps.highlighted) &&
        deepequal(nextProps.groupStyles, prevProps.groupStyles) && // last 3 messages can have different group styles
        deepequal(nextProps.mutes, prevProps.mutes) &&
        deepequal(nextProps.lastReceivedId, prevProps.lastReceivedId);
    if (!deepEqualProps)
        return false;
    return (prevProps.messageListRect === nextProps.messageListRect // MessageList wrapper layout changes
    );
};
export var areMessageUIPropsEqual = function (prevProps, nextProps) {
    var _a, _b, _c, _d;
    var prevLastReceivedId = prevProps.lastReceivedId, prevMessage = prevProps.message;
    var nextLastReceivedId = nextProps.lastReceivedId, nextMessage = nextProps.message;
    if (prevProps.editing !== nextProps.editing)
        return false;
    if (prevProps.highlighted !== nextProps.highlighted)
        return false;
    if (prevProps.endOfGroup !== nextProps.endOfGroup)
        return false;
    if (((_a = prevProps.mutes) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = nextProps.mutes) === null || _b === void 0 ? void 0 : _b.length))
        return false;
    if (((_c = prevProps.readBy) === null || _c === void 0 ? void 0 : _c.length) !== ((_d = nextProps.readBy) === null || _d === void 0 ? void 0 : _d.length))
        return false;
    if (prevProps.showDetailedReactions !== nextProps.showDetailedReactions) {
        return false;
    }
    if ((prevMessage.id === prevLastReceivedId || prevMessage.id === nextLastReceivedId) &&
        prevLastReceivedId !== nextLastReceivedId) {
        return false;
    }
    return areMessagesEqual(prevMessage, nextMessage);
};
export var messageHasReactions = function (message) { return !!(message === null || message === void 0 ? void 0 : message.latest_reactions) && !!message.latest_reactions.length; };
export var messageHasAttachments = function (message) { return !!(message === null || message === void 0 ? void 0 : message.attachments) && !!message.attachments.length; };
export var getImages = function (message) {
    if (!(message === null || message === void 0 ? void 0 : message.attachments)) {
        return [];
    }
    return message.attachments.filter(function (item) { return item.type === 'image'; });
};
export var getNonImageAttachments = function (message) {
    if (!(message === null || message === void 0 ? void 0 : message.attachments)) {
        return [];
    }
    return message.attachments.filter(function (item) { return item.type !== 'image'; });
};
/**
 * Default Tooltip Username mapper implementation.
 *
 * @param user the user.
 */
export var mapToUserNameOrId = function (user) { return user.name || user.id; };
export var getReadByTooltipText = function (users, t, client, tooltipUserNameMapper) {
    var outStr = '';
    if (!t) {
        throw new Error('getReadByTooltipText was called, but translation function is not available');
    }
    if (!tooltipUserNameMapper) {
        throw new Error('getReadByTooltipText was called, but tooltipUserNameMapper function is not available');
    }
    // first filter out client user, so restLength won't count it
    var otherUsers = users
        .filter(function (item) { return item && (client === null || client === void 0 ? void 0 : client.user) && item.id !== client.user.id; })
        .map(tooltipUserNameMapper);
    var slicedArr = otherUsers.slice(0, 5);
    var restLength = otherUsers.length - slicedArr.length;
    if (slicedArr.length === 1) {
        outStr = "".concat(slicedArr[0], " ");
    }
    else if (slicedArr.length === 2) {
        // joins all with "and" but =no commas
        // example: "bob and sam"
        outStr = t('{{ firstUser }} and {{ secondUser }}', {
            firstUser: slicedArr[0],
            secondUser: slicedArr[1],
        });
    }
    else if (slicedArr.length > 2) {
        // joins all with commas, but last one gets ", and" (oxford comma!)
        // example: "bob, joe, sam and 4 more"
        if (restLength === 0) {
            // mutate slicedArr to remove last user to display it separately
            var lastUser = slicedArr.splice(slicedArr.length - 1, 1);
            outStr = t('{{ commaSeparatedUsers }}, and {{ lastUser }}', {
                commaSeparatedUsers: slicedArr.join(', '),
                lastUser: lastUser,
            });
        }
        else {
            outStr = t('{{ commaSeparatedUsers }} and {{ moreCount }} more', {
                commaSeparatedUsers: slicedArr.join(', '),
                moreCount: restLength,
            });
        }
    }
    return outStr;
};
