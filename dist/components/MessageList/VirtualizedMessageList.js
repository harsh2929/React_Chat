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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso, } from 'react-virtuoso';
import { GiphyPreviewMessage as DefaultGiphyPreviewMessage } from './GiphyPreviewMessage';
import { useGiphyPreview } from './hooks/useGiphyPreview';
import { useNewMessageNotification } from './hooks/useNewMessageNotification';
import { usePrependedMessagesCount } from './hooks/usePrependMessagesCount';
import { useShouldForceScrollToBottom } from './hooks/useShouldForceScrollToBottom';
import { MessageNotification as DefaultMessageNotification } from './MessageNotification';
import { MessageListNotifications as DefaultMessageListNotifications } from './MessageListNotifications';
import { MessageListMainPanel } from './MessageListMainPanel';
import { getGroupStyles, processMessages } from './utils';
import { CUSTOM_MESSAGE_TYPE } from '../../constants/messageTypes';
import { DateSeparator as DefaultDateSeparator } from '../DateSeparator/DateSeparator';
import { EmptyStateIndicator as DefaultEmptyStateIndicator } from '../EmptyStateIndicator/EmptyStateIndicator';
import { EventComponent } from '../EventComponent/EventComponent';
import { LoadingIndicator as DefaultLoadingIndicator } from '../Loading/LoadingIndicator';
import { Message, MessageSimple } from '../Message';
import { useChannelActionContext, } from '../../context/ChannelActionContext';
import { useChannelStateContext, } from '../../context/ChannelStateContext';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { isDate } from '../../context/TranslationContext';
var PREPEND_OFFSET = Math.pow(10, 7);
function captureResizeObserverExceededError(e) {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
        e.message === 'ResizeObserver loop limit exceeded') {
        e.stopImmediatePropagation();
    }
}
function useCaptureResizeObserverExceededError() {
    useEffect(function () {
        window.addEventListener('error', captureResizeObserverExceededError);
        return function () {
            window.removeEventListener('error', captureResizeObserverExceededError);
        };
    }, []);
}
function fractionalItemSize(element) {
    return element.getBoundingClientRect().height;
}
function findMessageIndex(messages, id) {
    return messages.findIndex(function (message) { return message.id === id; });
}
function calculateInitialTopMostItemIndex(messages, highlightedMessageId) {
    if (highlightedMessageId) {
        var index = findMessageIndex(messages, highlightedMessageId);
        if (index !== -1) {
            return { align: 'center', index: index };
        }
    }
    return messages.length - 1;
}
var VirtualizedMessageListWithContext = function (props) {
    var additionalVirtuosoProps = props.additionalVirtuosoProps, channel = props.channel, closeReactionSelectorOnClick = props.closeReactionSelectorOnClick, customMessageRenderer = props.customMessageRenderer, defaultItemHeight = props.defaultItemHeight, _a = props.disableDateSeparator, disableDateSeparator = _a === void 0 ? true : _a, groupStyles = props.groupStyles, hasMore = props.hasMore, hasMoreNewer = props.hasMoreNewer, head = props.head, _b = props.hideDeletedMessages, hideDeletedMessages = _b === void 0 ? false : _b, _c = props.hideNewMessageSeparator, hideNewMessageSeparator = _c === void 0 ? false : _c, highlightedMessageId = props.highlightedMessageId, jumpToLatestMessage = props.jumpToLatestMessage, loadingMore = props.loadingMore, loadMore = props.loadMore, loadMoreNewer = props.loadMoreNewer, propMessage = props.Message, _d = props.messageLimit, messageLimit = _d === void 0 ? 100 : _d, messages = props.messages, notifications = props.notifications, 
    // TODO: refactor to scrollSeekPlaceHolderConfiguration and components.ScrollSeekPlaceholder, like the Virtuoso Component
    _e = props.overscan, 
    // TODO: refactor to scrollSeekPlaceHolderConfiguration and components.ScrollSeekPlaceholder, like the Virtuoso Component
    overscan = _e === void 0 ? 0 : _e, scrollSeekPlaceHolder = props.scrollSeekPlaceHolder, _f = props.scrollToLatestMessageOnFocus, scrollToLatestMessageOnFocus = _f === void 0 ? false : _f, _g = props.separateGiphyPreview, separateGiphyPreview = _g === void 0 ? false : _g, _h = props.shouldGroupByUser, shouldGroupByUser = _h === void 0 ? false : _h, _j = props.stickToBottomScrollBehavior, stickToBottomScrollBehavior = _j === void 0 ? 'smooth' : _j, suppressAutoscroll = props.suppressAutoscroll, threadList = props.threadList;
    // Stops errors generated from react-virtuoso to bubble up
    // to Sentry or other tracking tools.
    useCaptureResizeObserverExceededError();
    var _k = useComponentContext('VirtualizedMessageList'), _l = _k.DateSeparator, DateSeparator = _l === void 0 ? DefaultDateSeparator : _l, _m = _k.EmptyStateIndicator, EmptyStateIndicator = _m === void 0 ? DefaultEmptyStateIndicator : _m, _o = _k.GiphyPreviewMessage, GiphyPreviewMessage = _o === void 0 ? DefaultGiphyPreviewMessage : _o, _p = _k.LoadingIndicator, LoadingIndicator = _p === void 0 ? DefaultLoadingIndicator : _p, _q = _k.MessageListNotifications, MessageListNotifications = _q === void 0 ? DefaultMessageListNotifications : _q, _r = _k.MessageNotification, MessageNotification = _r === void 0 ? DefaultMessageNotification : _r, _s = _k.MessageSystem, MessageSystem = _s === void 0 ? EventComponent : _s, _t = _k.TypingIndicator, TypingIndicator = _t === void 0 ? null : _t, _u = _k.VirtualMessage, contextMessage = _u === void 0 ? MessageSimple : _u;
    var _v = useChatContext('VirtualizedMessageList'), client = _v.client, customClasses = _v.customClasses;
    var lastRead = useMemo(function () { var _a; return (_a = channel.lastRead) === null || _a === void 0 ? void 0 : _a.call(channel); }, [channel]);
    var MessageUIComponent = propMessage || contextMessage;
    var _w = useGiphyPreview(separateGiphyPreview), giphyPreviewMessage = _w.giphyPreviewMessage, setGiphyPreviewMessage = _w.setGiphyPreviewMessage;
    var processedMessages = useMemo(function () {
        if (typeof messages === 'undefined') {
            return [];
        }
        if (disableDateSeparator &&
            !hideDeletedMessages &&
            hideNewMessageSeparator &&
            !separateGiphyPreview) {
            return messages;
        }
        return processMessages({
            enableDateSeparator: !disableDateSeparator,
            hideDeletedMessages: hideDeletedMessages,
            hideNewMessageSeparator: hideNewMessageSeparator,
            lastRead: lastRead,
            messages: messages,
            setGiphyPreviewMessage: setGiphyPreviewMessage,
            userId: client.userID || '',
        });
    }, [
        disableDateSeparator,
        hideDeletedMessages,
        hideNewMessageSeparator,
        lastRead,
        messages,
        messages === null || messages === void 0 ? void 0 : messages.length,
        client.userID,
    ]);
    var groupStylesFn = groupStyles || getGroupStyles;
    var messageGroupStyles = useMemo(function () {
        return processedMessages.reduce(function (acc, message, i) {
            var style = groupStylesFn(message, processedMessages[i - 1], processedMessages[i + 1], !shouldGroupByUser);
            if (style)
                acc[message.id] = style;
            return acc;
        }, {});
    }, 
    // processedMessages were incorrectly rebuilt with a new object identity at some point, hence the .length usage
    [processedMessages.length, shouldGroupByUser]);
    var virtuoso = useRef(null);
    var _x = useNewMessageNotification(processedMessages, client.userID, hasMoreNewer), atBottom = _x.atBottom, isMessageListScrolledToBottom = _x.isMessageListScrolledToBottom, newMessagesNotification = _x.newMessagesNotification, setIsMessageListScrolledToBottom = _x.setIsMessageListScrolledToBottom, setNewMessagesNotification = _x.setNewMessagesNotification;
    var scrollToBottom = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasMoreNewer) return [3 /*break*/, 2];
                    return [4 /*yield*/, jumpToLatestMessage()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    if (virtuoso.current) {
                        virtuoso.current.scrollToIndex(processedMessages.length - 1);
                    }
                    setNewMessagesNotification(false);
                    return [2 /*return*/];
            }
        });
    }); }, [
        virtuoso,
        processedMessages,
        setNewMessagesNotification,
        // processedMessages were incorrectly rebuilt with a new object identity at some point, hence the .length usage
        processedMessages.length,
        hasMoreNewer,
        jumpToLatestMessage,
    ]);
    var _y = React.useState(false), newMessagesReceivedInBackground = _y[0], setNewMessagesReceivedInBackground = _y[1];
    var resetNewMessagesReceivedInBackground = useCallback(function () {
        setNewMessagesReceivedInBackground(false);
    }, []);
    useEffect(function () {
        setNewMessagesReceivedInBackground(true);
    }, [messages]);
    var scrollToBottomIfConfigured = useCallback(function (event) {
        if (scrollToLatestMessageOnFocus && event.target === window) {
            if (newMessagesReceivedInBackground) {
                setTimeout(scrollToBottom, 100);
            }
        }
    }, [scrollToLatestMessageOnFocus, scrollToBottom, newMessagesReceivedInBackground]);
    useEffect(function () {
        if (typeof window !== 'undefined') {
            window.addEventListener('focus', scrollToBottomIfConfigured);
            window.addEventListener('blur', resetNewMessagesReceivedInBackground);
        }
        return function () {
            window.removeEventListener('focus', scrollToBottomIfConfigured);
            window.removeEventListener('blur', resetNewMessagesReceivedInBackground);
        };
    }, [scrollToBottomIfConfigured]);
    var numItemsPrepended = usePrependedMessagesCount(processedMessages, !disableDateSeparator);
    /**
     * Logic to update the key of the virtuoso component when the list jumps to a new location.
     */
    var _z = useState(+new Date()), messageSetKey = _z[0], setMessageSetKey = _z[1];
    var firstMessageId = useRef();
    useEffect(function () {
        var _a;
        var continuousSet = messages === null || messages === void 0 ? void 0 : messages.find(function (message) { return message.id === firstMessageId.current; });
        if (!continuousSet) {
            setMessageSetKey(+new Date());
        }
        firstMessageId.current = (_a = messages === null || messages === void 0 ? void 0 : messages[0]) === null || _a === void 0 ? void 0 : _a.id;
    }, [messages]);
    var shouldForceScrollToBottom = useShouldForceScrollToBottom(processedMessages, client.userID);
    var followOutput = function (isAtBottom) {
        if (hasMoreNewer || suppressAutoscroll) {
            return false;
        }
        if (shouldForceScrollToBottom()) {
            return isAtBottom ? stickToBottomScrollBehavior : 'auto';
        }
        // a message from another user has been received - don't scroll to bottom unless already there
        return isAtBottom ? stickToBottomScrollBehavior : false;
    };
    var messageRenderer = useCallback(function (messageList, virtuosoIndex) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var streamMessageIndex = virtuosoIndex + numItemsPrepended - PREPEND_OFFSET;
        // use custom renderer supplied by client if present and skip the rest
        if (customMessageRenderer) {
            return customMessageRenderer(messageList, streamMessageIndex);
        }
        var message = messageList[streamMessageIndex];
        if (message.customType === CUSTOM_MESSAGE_TYPE.date && message.date && isDate(message.date)) {
            return React.createElement(DateSeparator, { date: message.date, unread: message.unread });
        }
        if (!message)
            return React.createElement("div", { style: { height: '1px' } }); // returning null or zero height breaks the virtuoso
        if (message.type === 'system') {
            return React.createElement(MessageSystem, { message: message });
        }
        var groupedByUser = shouldGroupByUser &&
            streamMessageIndex > 0 &&
            ((_a = message.user) === null || _a === void 0 ? void 0 : _a.id) === ((_b = messageList[streamMessageIndex - 1].user) === null || _b === void 0 ? void 0 : _b.id);
        var firstOfGroup = shouldGroupByUser && ((_c = message.user) === null || _c === void 0 ? void 0 : _c.id) !== ((_e = (_d = messageList[streamMessageIndex - 1]) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id);
        var endOfGroup = shouldGroupByUser && ((_f = message.user) === null || _f === void 0 ? void 0 : _f.id) !== ((_h = (_g = messageList[streamMessageIndex + 1]) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.id);
        return (React.createElement(Message, { autoscrollToBottom: (_j = virtuoso.current) === null || _j === void 0 ? void 0 : _j.autoscrollToBottom, closeReactionSelectorOnClick: closeReactionSelectorOnClick, customMessageActions: props.customMessageActions, endOfGroup: endOfGroup, firstOfGroup: firstOfGroup, groupedByUser: groupedByUser, message: message, Message: MessageUIComponent, messageActions: props.messageActions }));
    }, [customMessageRenderer, shouldGroupByUser, numItemsPrepended]);
    var Item = useMemo(function () {
        // using 'display: inline-block'
        // traps CSS margins of the item elements, preventing incorrect item measurements
        var Item = function (props) {
            var _a;
            var streamMessageIndex = props['data-item-index'] + numItemsPrepended - PREPEND_OFFSET;
            var message = processedMessages[streamMessageIndex];
            var groupStyles = messageGroupStyles[message.id] || '';
            return (React.createElement("div", __assign({}, props, { className: (customClasses === null || customClasses === void 0 ? void 0 : customClasses.virtualMessage) ||
                    clsx('str-chat__virtual-list-message-wrapper str-chat__li', (_a = {},
                        _a["str-chat__li--".concat(groupStyles)] = groupStyles,
                        _a)) })));
        };
        return Item;
    }, [
        customClasses === null || customClasses === void 0 ? void 0 : customClasses.virtualMessage,
        numItemsPrepended,
        // processedMessages were incorrectly rebuilt with a new object identity at some point, hence the .length usage
        processedMessages.length,
    ]);
    var virtuosoComponents = useMemo(function () {
        var EmptyPlaceholder = function () { return (React.createElement(React.Fragment, null, EmptyStateIndicator && (React.createElement(EmptyStateIndicator, { listType: threadList ? 'thread' : 'message' })))); };
        var Header = function () {
            return loadingMore ? (React.createElement("div", { className: 'str-chat__virtual-list__loading' },
                React.createElement(LoadingIndicator, { size: 20 }))) : (head || null);
        };
        var Footer = function () {
            return TypingIndicator ? React.createElement(TypingIndicator, { avatarSize: 24 }) : React.createElement(React.Fragment, null);
        };
        return {
            EmptyPlaceholder: EmptyPlaceholder,
            Footer: Footer,
            Header: Header,
            Item: Item,
        };
    }, [loadingMore, head, Item]);
    var atBottomStateChange = function (isAtBottom) {
        atBottom.current = isAtBottom;
        setIsMessageListScrolledToBottom(isAtBottom);
        if (isAtBottom && newMessagesNotification) {
            setNewMessagesNotification(false);
        }
    };
    var startReached = function () {
        if (hasMore && loadMore) {
            loadMore(messageLimit);
        }
    };
    var endReached = function () {
        if (hasMoreNewer && loadMoreNewer) {
            loadMoreNewer(messageLimit);
        }
    };
    useEffect(function () {
        var _a;
        if (highlightedMessageId) {
            var index = findMessageIndex(processedMessages, highlightedMessageId);
            if (index !== -1) {
                (_a = virtuoso.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({ align: 'center', index: index });
            }
        }
    }, [highlightedMessageId]);
    if (!processedMessages)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(MessageListMainPanel, null,
            React.createElement("div", { className: (customClasses === null || customClasses === void 0 ? void 0 : customClasses.virtualizedMessageList) || 'str-chat__virtual-list' },
                React.createElement(Virtuoso, __assign({ atBottomStateChange: atBottomStateChange, atBottomThreshold: 200, className: 'str-chat__message-list-scroll', components: virtuosoComponents, computeItemKey: function (index) {
                        return processedMessages[numItemsPrepended + index - PREPEND_OFFSET].id;
                    }, endReached: endReached, firstItemIndex: PREPEND_OFFSET - numItemsPrepended, followOutput: followOutput, increaseViewportBy: { bottom: 200, top: 0 }, initialTopMostItemIndex: calculateInitialTopMostItemIndex(processedMessages, highlightedMessageId), itemContent: function (i) { return messageRenderer(processedMessages, i); }, itemSize: fractionalItemSize, key: messageSetKey, overscan: overscan, ref: virtuoso, startReached: startReached, style: { overflowX: 'hidden' }, totalCount: processedMessages.length }, additionalVirtuosoProps, (scrollSeekPlaceHolder ? { scrollSeek: scrollSeekPlaceHolder } : {}), (defaultItemHeight ? { defaultItemHeight: defaultItemHeight } : {}))))),
        React.createElement(MessageListNotifications, { hasNewMessages: newMessagesNotification, isMessageListScrolledToBottom: isMessageListScrolledToBottom, isNotAtLatestMessageSet: hasMoreNewer, MessageNotification: MessageNotification, notifications: notifications, scrollToBottom: scrollToBottom, threadList: threadList }),
        giphyPreviewMessage && React.createElement(GiphyPreviewMessage, { message: giphyPreviewMessage })));
};
/**
 * The VirtualizedMessageList component renders a list of messages in a virtualized list.
 * It is a consumer of the React contexts set in [Channel](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Channel/Channel.tsx).
 */
export function VirtualizedMessageList(props) {
    var _a = useChannelActionContext('VirtualizedMessageList'), jumpToLatestMessage = _a.jumpToLatestMessage, loadMore = _a.loadMore, loadMoreNewer = _a.loadMoreNewer;
    var _b = useChannelStateContext('VirtualizedMessageList'), channel = _b.channel, hasMore = _b.hasMore, hasMoreNewer = _b.hasMoreNewer, highlightedMessageId = _b.highlightedMessageId, loadingMore = _b.loadingMore, loadingMoreNewer = _b.loadingMoreNewer, contextMessages = _b.messages, notifications = _b.notifications, suppressAutoscroll = _b.suppressAutoscroll;
    var messages = props.messages || contextMessages;
    return (React.createElement(VirtualizedMessageListWithContext, __assign({ channel: channel, hasMore: !!hasMore, hasMoreNewer: !!hasMoreNewer, highlightedMessageId: highlightedMessageId, jumpToLatestMessage: jumpToLatestMessage, loadingMore: !!loadingMore, loadingMoreNewer: !!loadingMoreNewer, loadMore: loadMore, loadMoreNewer: loadMoreNewer, messages: messages, notifications: notifications, suppressAutoscroll: suppressAutoscroll }, props)));
}
