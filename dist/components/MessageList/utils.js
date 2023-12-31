/* eslint-disable no-continue */
import { nanoid } from 'nanoid';
import { CUSTOM_MESSAGE_TYPE } from '../../constants/messageTypes';
import { isDate } from '../../context/TranslationContext';
/**
 * processMessages - Transform the input message list according to config parameters
 *
 * Inserts date separators btw. messages created on different dates or before unread incoming messages. By default:
 * - enabled in main message list
 * - disabled in virtualized message list
 * - disabled in thread
 *
 * Allows to filter out deleted messages, contolled by hideDeletedMessages param. This is disabled by default.
 *
 * Sets Giphy preview message for VirtualizedMessageList
 *
 * The only required params are messages and userId, the rest are config params:
 *
 * @return {StreamMessage<StreamChatGenerics>[]} Transformed list of messages
 */
export var processMessages = function (params) {
    var _a, _b;
    var enableDateSeparator = params.enableDateSeparator, hideDeletedMessages = params.hideDeletedMessages, hideNewMessageSeparator = params.hideNewMessageSeparator, lastRead = params.lastRead, messages = params.messages, setGiphyPreviewMessage = params.setGiphyPreviewMessage, userId = params.userId;
    var unread = false;
    var ephemeralMessagePresent = false;
    var lastDateSeparator;
    var newMessages = [];
    for (var i = 0; i < messages.length; i += 1) {
        var message = messages[i];
        if (hideDeletedMessages && message.type === 'deleted') {
            continue;
        }
        if (setGiphyPreviewMessage && message.type === 'ephemeral' && message.command === 'giphy') {
            ephemeralMessagePresent = true;
            setGiphyPreviewMessage(message);
            continue;
        }
        var messageDate = (message.created_at && isDate(message.created_at) && message.created_at.toDateString()) || '';
        var previousMessage = messages[i - 1];
        var prevMessageDate = messageDate;
        if (enableDateSeparator && (previousMessage === null || previousMessage === void 0 ? void 0 : previousMessage.created_at) && isDate(previousMessage.created_at)) {
            prevMessageDate = previousMessage.created_at.toDateString();
        }
        if (!unread && !hideNewMessageSeparator) {
            unread = (lastRead && message.created_at && new Date(lastRead) < message.created_at) || false;
            // do not show date separator for current user's messages
            if (enableDateSeparator && unread && ((_a = message.user) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
                newMessages.push({
                    customType: CUSTOM_MESSAGE_TYPE.date,
                    date: message.created_at,
                    id: makeDateMessageId(message.created_at),
                    unread: unread,
                });
            }
        }
        if (enableDateSeparator &&
            (i === 0 || // always put date separator before the first message
                messageDate !== prevMessageDate || // add date separator btw. 2 messages created on different date
                // if hiding deleted messages replace the previous deleted message(s) with A separator if the last rendered message was created on different date
                (hideDeletedMessages &&
                    (previousMessage === null || previousMessage === void 0 ? void 0 : previousMessage.type) === 'deleted' &&
                    lastDateSeparator !== messageDate)) &&
            ((_b = newMessages === null || newMessages === void 0 ? void 0 : newMessages[newMessages.length - 1]) === null || _b === void 0 ? void 0 : _b.customType) !== CUSTOM_MESSAGE_TYPE.date // do not show two date separators in a row)
        ) {
            lastDateSeparator = messageDate;
            newMessages.push({
                customType: CUSTOM_MESSAGE_TYPE.date,
                date: message.created_at,
                id: makeDateMessageId(message.created_at),
            }, message);
        }
        else {
            newMessages.push(message);
        }
    }
    // clean up the giphy preview component state after a Cancel action
    if (setGiphyPreviewMessage && !ephemeralMessagePresent) {
        setGiphyPreviewMessage(undefined);
    }
    return newMessages;
};
export var makeDateMessageId = function (date) {
    var idSuffix;
    try {
        idSuffix = !date ? nanoid() : date instanceof Date ? date.toISOString() : date;
    }
    catch (e) {
        idSuffix = nanoid();
    }
    return "".concat(CUSTOM_MESSAGE_TYPE.date, "-").concat(idSuffix);
};
// fast since it usually iterates just the last few messages
export var getLastReceived = function (messages) {
    for (var i = messages.length - 1; i > 0; i -= 1) {
        if (messages[i].status === 'received') {
            return messages[i].id;
        }
    }
    return null;
};
export var getReadStates = function (messages, read, returnAllReadData) {
    if (read === void 0) { read = {}; }
    // create object with empty array for each message id
    var readData = {};
    Object.values(read).forEach(function (readState) {
        if (!readState.last_read)
            return;
        var userLastReadMsgId;
        // loop messages sent by current user and add read data for other users in channel
        messages.forEach(function (msg) {
            if (msg.updated_at && msg.updated_at < readState.last_read) {
                userLastReadMsgId = msg.id;
                // if true, save other user's read data for all messages they've read
                if (returnAllReadData) {
                    if (!readData[userLastReadMsgId]) {
                        readData[userLastReadMsgId] = [];
                    }
                    readData[userLastReadMsgId].push(readState.user);
                }
            }
        });
        // if true, only save read data for other user's last read message
        if (userLastReadMsgId && !returnAllReadData) {
            if (!readData[userLastReadMsgId]) {
                readData[userLastReadMsgId] = [];
            }
            readData[userLastReadMsgId].push(readState.user);
        }
    });
    return readData;
};
export var insertIntro = function (messages, headerPosition) {
    var newMessages = messages;
    var intro = {
        customType: CUSTOM_MESSAGE_TYPE.intro,
    };
    // if no headerPosition is set, HeaderComponent will go at the top
    if (!headerPosition) {
        newMessages.unshift(intro);
        return newMessages;
    }
    // if no messages, intro gets inserted
    if (!newMessages.length) {
        newMessages.unshift(intro);
        return newMessages;
    }
    // else loop over the messages
    for (var i = 0; i < messages.length; i += 1) {
        var message = messages[i];
        var messageTime = message.created_at && isDate(message.created_at) ? message.created_at.getTime() : null;
        var nextMessage = messages[i + 1];
        var nextMessageTime = nextMessage.created_at && isDate(nextMessage.created_at)
            ? nextMessage.created_at.getTime()
            : null;
        // header position is smaller than message time so comes after;
        if (messageTime && messageTime < headerPosition) {
            // if header position is also smaller than message time continue;
            if (nextMessageTime && nextMessageTime < headerPosition) {
                if (messages[i + 1] && messages[i + 1].customType === CUSTOM_MESSAGE_TYPE.date)
                    continue;
                if (!nextMessageTime) {
                    newMessages.push(intro);
                    return newMessages;
                }
            }
            else {
                newMessages.splice(i + 1, 0, intro);
                return newMessages;
            }
        }
    }
    return newMessages;
};
export var getGroupStyles = function (message, previousMessage, nextMessage, noGroupByUser) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (message.customType === CUSTOM_MESSAGE_TYPE.date)
        return '';
    if (message.customType === CUSTOM_MESSAGE_TYPE.intro)
        return '';
    if (noGroupByUser || ((_a = message.attachments) === null || _a === void 0 ? void 0 : _a.length) !== 0)
        return 'single';
    var isTopMessage = !previousMessage ||
        previousMessage.customType === CUSTOM_MESSAGE_TYPE.intro ||
        previousMessage.customType === CUSTOM_MESSAGE_TYPE.date ||
        previousMessage.type === 'system' ||
        ((_b = previousMessage.attachments) === null || _b === void 0 ? void 0 : _b.length) !== 0 ||
        ((_c = message.user) === null || _c === void 0 ? void 0 : _c.id) !== ((_d = previousMessage.user) === null || _d === void 0 ? void 0 : _d.id) ||
        previousMessage.type === 'error' ||
        previousMessage.deleted_at ||
        (message.reaction_counts && Object.keys(message.reaction_counts).length > 0);
    var isBottomMessage = !nextMessage ||
        nextMessage.customType === CUSTOM_MESSAGE_TYPE.date ||
        nextMessage.type === 'system' ||
        nextMessage.customType === CUSTOM_MESSAGE_TYPE.intro ||
        ((_e = nextMessage.attachments) === null || _e === void 0 ? void 0 : _e.length) !== 0 ||
        ((_f = message.user) === null || _f === void 0 ? void 0 : _f.id) !== ((_g = nextMessage.user) === null || _g === void 0 ? void 0 : _g.id) ||
        nextMessage.type === 'error' ||
        nextMessage.deleted_at ||
        (nextMessage.reaction_counts && Object.keys(nextMessage.reaction_counts).length > 0);
    if (!isTopMessage && !isBottomMessage) {
        if (message.deleted_at || message.type === 'error')
            return 'single';
        return 'middle';
    }
    if (isBottomMessage) {
        if (isTopMessage || message.deleted_at || message.type === 'error')
            return 'single';
        return 'bottom';
    }
    if (isTopMessage)
        return 'top';
    return '';
};
// "Probably" included, because it may happen that the last page was returned and it has exactly the size of the limit
// but the back-end cannot provide us with information on whether it has still more messages in the DB
// FIXME: once the pagination state is moved from Channel to MessageList, these should be moved as well.
//  The MessageList should have configurable the limit for performing the requests.
//  This parameter would then be used within these functions
export var hasMoreMessagesProbably = function (returnedCountMessages, limit) {
    return returnedCountMessages === limit;
};
export var hasNotMoreMessages = function (returnedCountMessages, limit) {
    return returnedCountMessages < limit;
};
