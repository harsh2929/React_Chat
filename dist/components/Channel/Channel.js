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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, } from 'react';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { logChatPromiseExecution, } from 'stream-chat';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { channelReducer, initialState } from './channelState';
import { commonEmoji, defaultMinimalEmojis, emojiSetDef } from './emojiData';
import { useCreateChannelStateContext } from './hooks/useCreateChannelStateContext';
import { useCreateTypingContext } from './hooks/useCreateTypingContext';
import { useEditMessageHandler } from './hooks/useEditMessageHandler';
import { useIsMounted } from './hooks/useIsMounted';
import { useMentionsHandlers } from './hooks/useMentionsHandlers';
import { Attachment as DefaultAttachment } from '../Attachment/Attachment';
import { LoadingErrorIndicator as DefaultLoadingErrorIndicator, } from '../Loading';
import { LoadingChannel as DefaultLoadingIndicator } from './LoadingChannel';
import { MessageSimple } from '../Message/MessageSimple';
import { DropzoneProvider } from '../MessageInput/DropzoneProvider';
import { ChannelActionProvider, } from '../../context/ChannelActionContext';
import { ChannelStateProvider, } from '../../context/ChannelStateContext';
import { ComponentProvider } from '../../context/ComponentContext';
import { useChatContext } from '../../context/ChatContext';
import { EmojiProvider } from '../../context/EmojiContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { TypingProvider } from '../../context/TypingContext';
import { DEFAULT_INITIAL_CHANNEL_PAGE_SIZE, DEFAULT_NEXT_CHANNEL_PAGE_SIZE, DEFAULT_THREAD_PAGE_SIZE, } from '../../constants/limits';
import { hasMoreMessagesProbably, hasNotMoreMessages } from '../MessageList/utils';
import defaultEmojiData from '../../stream-emoji.json';
import { makeAddNotifications } from './utils';
import { useChannelContainerClasses } from './hooks/useChannelContainerClasses';
import { getImageAttachmentConfiguration, getVideoAttachmentConfiguration, } from '../Attachment/attachment-sizing';
var UnMemoizedChannel = function (props) {
    var propsChannel = props.channel, _a = props.EmptyPlaceholder, EmptyPlaceholder = _a === void 0 ? null : _a, LoadingErrorIndicator = props.LoadingErrorIndicator, _b = props.LoadingIndicator, LoadingIndicator = _b === void 0 ? DefaultLoadingIndicator : _b;
    var _c = useChatContext('Channel'), contextChannel = _c.channel, channelsQueryState = _c.channelsQueryState, customClasses = _c.customClasses, theme = _c.theme;
    var _d = useChannelContainerClasses({
        customClasses: customClasses,
    }), channelClass = _d.channelClass, chatClass = _d.chatClass;
    var channel = propsChannel || contextChannel;
    var className = clsx(chatClass, theme, channelClass);
    if (channelsQueryState.queryInProgress === 'reload' && LoadingIndicator) {
        return (React.createElement("div", { className: className },
            React.createElement(LoadingIndicator, null)));
    }
    if (channelsQueryState.error && LoadingErrorIndicator) {
        return (React.createElement("div", { className: className },
            React.createElement(LoadingErrorIndicator, { error: channelsQueryState.error })));
    }
    if (!(channel === null || channel === void 0 ? void 0 : channel.cid)) {
        return React.createElement("div", { className: className }, EmptyPlaceholder);
    }
    // @ts-ignore
    return React.createElement(ChannelInner, __assign({}, props, { channel: channel, key: channel.cid }));
};
var ChannelInner = function (props) {
    var _a;
    var acceptedFiles = props.acceptedFiles, activeUnreadHandler = props.activeUnreadHandler, channel = props.channel, children = props.children, doMarkReadRequest = props.doMarkReadRequest, doSendMessageRequest = props.doSendMessageRequest, doUpdateMessageRequest = props.doUpdateMessageRequest, _b = props.dragAndDropWindow, dragAndDropWindow = _b === void 0 ? false : _b, _c = props.emojiData, emojiData = _c === void 0 ? defaultEmojiData : _c, _d = props.LoadingErrorIndicator, LoadingErrorIndicator = _d === void 0 ? DefaultLoadingErrorIndicator : _d, _e = props.LoadingIndicator, LoadingIndicator = _e === void 0 ? DefaultLoadingIndicator : _e, maxNumberOfFiles = props.maxNumberOfFiles, _f = props.multipleUploads, multipleUploads = _f === void 0 ? true : _f, onMentionsClick = props.onMentionsClick, onMentionsHover = props.onMentionsHover, _g = props.optionalMessageInputProps, optionalMessageInputProps = _g === void 0 ? {} : _g, skipMessageDataMemoization = props.skipMessageDataMemoization;
    var _h = useChatContext('Channel'), client = _h.client, customClasses = _h.customClasses, latestMessageDatesByChannels = _h.latestMessageDatesByChannels, mutes = _h.mutes, theme = _h.theme;
    var t = useTranslationContext('Channel').t;
    var _j = useChannelContainerClasses({ customClasses: customClasses }), channelClass = _j.channelClass, chatClass = _j.chatClass, chatContainerClass = _j.chatContainerClass, windowsEmojiClass = _j.windowsEmojiClass;
    var _k = useState(channel.getConfig()), channelConfig = _k[0], setChannelConfig = _k[1];
    var _l = useState([]), notifications = _l[0], setNotifications = _l[1];
    var _m = useState(), quotedMessage = _m[0], setQuotedMessage = _m[1];
    var notificationTimeouts = [];
    var _o = useReducer(channelReducer, __assign(__assign({}, initialState), { loading: !channel.initialized })), state = _o[0], dispatch = _o[1];
    var isMounted = useIsMounted();
    var originalTitle = useRef('');
    var lastRead = useRef(new Date());
    var online = useRef(true);
    var channelCapabilitiesArray = (_a = channel.data) === null || _a === void 0 ? void 0 : _a.own_capabilities;
    var emojiConfig = {
        commonEmoji: commonEmoji,
        defaultMinimalEmojis: defaultMinimalEmojis,
        emojiData: emojiData,
        emojiSetDef: emojiSetDef,
    };
    var throttledCopyStateFromChannel = throttle(function () { return dispatch({ channel: channel, type: 'copyStateFromChannelOnEvent' }); }, 500, {
        leading: true,
        trailing: true,
    });
    var markRead = function () {
        if (channel.disconnected || !(channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.read_events)) {
            return;
        }
        lastRead.current = new Date();
        if (doMarkReadRequest) {
            doMarkReadRequest(channel);
        }
        else {
            logChatPromiseExecution(channel.markRead(), 'mark read');
        }
        if (activeUnreadHandler) {
            activeUnreadHandler(0, originalTitle.current);
        }
        else if (originalTitle.current) {
            document.title = originalTitle.current;
        }
    };
    var markReadThrottled = throttle(markRead, 500, { leading: true, trailing: true });
    var handleEvent = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (event.message) {
            dispatch({
                channel: channel,
                message: event.message,
                type: 'updateThreadOnEvent',
            });
        }
        if (event.type === 'user.watching.start' || event.type === 'user.watching.stop')
            return;
        if (event.type === 'typing.start' || event.type === 'typing.stop') {
            return dispatch({ channel: channel, type: 'setTyping' });
        }
        if (event.type === 'connection.changed' && typeof event.online === 'boolean') {
            online.current = event.online;
        }
        if (event.type === 'message.new') {
            var mainChannelUpdated = true;
            if (((_a = event.message) === null || _a === void 0 ? void 0 : _a.parent_id) && !((_b = event.message) === null || _b === void 0 ? void 0 : _b.show_in_channel)) {
                mainChannelUpdated = false;
            }
            if (mainChannelUpdated && ((_d = (_c = event.message) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id) !== client.userID) {
                if (!document.hidden) {
                    markReadThrottled();
                }
                else if ((channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.read_events) && !channel.muteStatus().muted) {
                    var unread = channel.countUnread(lastRead.current);
                    if (activeUnreadHandler) {
                        activeUnreadHandler(unread, originalTitle.current);
                    }
                    else {
                        document.title = "(".concat(unread, ") ").concat(originalTitle.current);
                    }
                }
            }
            if (((_f = (_e = event.message) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.id) === client.userID &&
                ((_g = event === null || event === void 0 ? void 0 : event.message) === null || _g === void 0 ? void 0 : _g.created_at) &&
                ((_h = event === null || event === void 0 ? void 0 : event.message) === null || _h === void 0 ? void 0 : _h.cid)) {
                var messageDate = new Date(event.message.created_at);
                var cid = event.message.cid;
                if (!latestMessageDatesByChannels[cid] ||
                    latestMessageDatesByChannels[cid].getTime() < messageDate.getTime()) {
                    latestMessageDatesByChannels[cid] = messageDate;
                }
            }
        }
        throttledCopyStateFromChannel();
    };
    // useLayoutEffect here to prevent spinner. Use Suspense when it is available in stable release
    useLayoutEffect(function () {
        var errored = false;
        var done = false;
        var onVisibilityChange = function () {
            if (!document.hidden)
                markRead();
        };
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!channel.initialized) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.watch()];
                    case 2:
                        _a.sent();
                        config = channel.getConfig();
                        setChannelConfig(config);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        dispatch({ error: e_1, type: 'setError' });
                        errored = true;
                        return [3 /*break*/, 4];
                    case 4:
                        done = true;
                        originalTitle.current = document.title;
                        if (!errored) {
                            dispatch({ channel: channel, type: 'initStateFromChannel' });
                            if (channel.countUnread() > 0)
                                markRead();
                            // The more complex sync logic is done in Chat
                            document.addEventListener('visibilitychange', onVisibilityChange);
                            client.on('connection.changed', handleEvent);
                            client.on('connection.recovered', handleEvent);
                            client.on('user.updated', handleEvent);
                            client.on('user.deleted', handleEvent);
                            channel.on(handleEvent);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            if (errored || !done)
                return;
            document.removeEventListener('visibilitychange', onVisibilityChange);
            channel === null || channel === void 0 ? void 0 : channel.off(handleEvent);
            client.off('connection.changed', handleEvent);
            client.off('connection.recovered', handleEvent);
            client.off('user.updated', handleEvent);
            client.off('user.deleted', handleEvent);
            notificationTimeouts.forEach(clearTimeout);
        };
    }, [channel.cid, doMarkReadRequest]);
    useEffect(function () {
        var _a;
        if (!state.thread)
            return;
        var message = (_a = state.messages) === null || _a === void 0 ? void 0 : _a.find(function (m) { var _a; return m.id === ((_a = state.thread) === null || _a === void 0 ? void 0 : _a.id); });
        if (message)
            dispatch({ message: message, type: 'setThread' });
    }, [state.messages, state.thread]);
    /** MESSAGE */
    // Adds a temporary notification to message list, will be removed after 5 seconds
    var addNotification = makeAddNotifications(setNotifications, notificationTimeouts);
    var loadMoreFinished = debounce(function (hasMore, messages) {
        if (!isMounted.current)
            return;
        dispatch({ hasMore: hasMore, messages: messages, type: 'loadMoreFinished' });
    }, 2000, {
        leading: true,
        trailing: true,
    });
    var loadMore = function (limit) {
        if (limit === void 0) { limit = DEFAULT_NEXT_CHANNEL_PAGE_SIZE; }
        return __awaiter(void 0, void 0, void 0, function () {
            var oldestMessage, notHasMore, oldestID, perPage, queryResponse, e_2, hasMoreMessages;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!online.current || !window.navigator.onLine)
                            return [2 /*return*/, 0];
                        oldestMessage = (_a = state === null || state === void 0 ? void 0 : state.messages) === null || _a === void 0 ? void 0 : _a[0];
                        if (state.loadingMore || state.loadingMoreNewer || (oldestMessage === null || oldestMessage === void 0 ? void 0 : oldestMessage.status) !== 'received') {
                            return [2 /*return*/, 0];
                        }
                        notHasMore = hasNotMoreMessages(channel.state.messages.length, DEFAULT_INITIAL_CHANNEL_PAGE_SIZE);
                        if (notHasMore) {
                            loadMoreFinished(false, channel.state.messages);
                            return [2 /*return*/, channel.state.messages.length];
                        }
                        dispatch({ loadingMore: true, type: 'setLoadingMore' });
                        oldestID = oldestMessage === null || oldestMessage === void 0 ? void 0 : oldestMessage.id;
                        perPage = limit;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.query({
                                messages: { id_lt: oldestID, limit: perPage },
                                watchers: { limit: perPage },
                            })];
                    case 2:
                        queryResponse = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        console.warn('message pagination request failed with error', e_2);
                        dispatch({ loadingMore: false, type: 'setLoadingMore' });
                        return [2 /*return*/, 0];
                    case 4:
                        hasMoreMessages = queryResponse.messages.length === perPage;
                        loadMoreFinished(hasMoreMessages, channel.state.messages);
                        return [2 /*return*/, queryResponse.messages.length];
                }
            });
        });
    };
    var loadMoreNewer = function (limit) {
        if (limit === void 0) { limit = 100; }
        return __awaiter(void 0, void 0, void 0, function () {
            var newestMessage, newestId, perPage, queryResponse, e_3, hasMoreNewer;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!online.current || !window.navigator.onLine)
                            return [2 /*return*/, 0];
                        newestMessage = (_a = state === null || state === void 0 ? void 0 : state.messages) === null || _a === void 0 ? void 0 : _a[((_b = state === null || state === void 0 ? void 0 : state.messages) === null || _b === void 0 ? void 0 : _b.length) - 1];
                        if (state.loadingMore || state.loadingMoreNewer)
                            return [2 /*return*/, 0];
                        dispatch({ loadingMoreNewer: true, type: 'setLoadingMoreNewer' });
                        newestId = newestMessage === null || newestMessage === void 0 ? void 0 : newestMessage.id;
                        perPage = limit;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.query({
                                messages: { id_gt: newestId, limit: perPage },
                                watchers: { limit: perPage },
                            })];
                    case 2:
                        queryResponse = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _c.sent();
                        console.warn('message pagination request failed with error', e_3);
                        dispatch({ loadingMoreNewer: false, type: 'setLoadingMoreNewer' });
                        return [2 /*return*/, 0];
                    case 4:
                        hasMoreNewer = channel.state.messages !== channel.state.latestMessages;
                        dispatch({ hasMoreNewer: hasMoreNewer, messages: channel.state.messages, type: 'loadMoreNewerFinished' });
                        return [2 /*return*/, queryResponse.messages.length];
                }
            });
        });
    };
    var clearHighlightedMessageTimeoutId = useRef(null);
    var jumpToMessage = function (messageId, messageLimit) {
        if (messageLimit === void 0) { messageLimit = 100; }
        return __awaiter(void 0, void 0, void 0, function () {
            var indexOfMessage, hasMoreMessages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch({ loadingMore: true, type: 'setLoadingMore' });
                        return [4 /*yield*/, channel.state.loadMessageIntoState(messageId, undefined, messageLimit)];
                    case 1:
                        _a.sent();
                        indexOfMessage = channel.state.messages.findIndex(function (message) { return message.id === messageId; });
                        hasMoreMessages = indexOfMessage >= Math.floor(messageLimit / 2);
                        loadMoreFinished(hasMoreMessages, channel.state.messages);
                        dispatch({
                            hasMoreNewer: channel.state.messages !== channel.state.latestMessages,
                            highlightedMessageId: messageId,
                            type: 'jumpToMessageFinished',
                        });
                        if (clearHighlightedMessageTimeoutId.current) {
                            clearTimeout(clearHighlightedMessageTimeoutId.current);
                        }
                        clearHighlightedMessageTimeoutId.current = setTimeout(function () {
                            clearHighlightedMessageTimeoutId.current = null;
                            dispatch({ type: 'clearHighlightedMessage' });
                        }, 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    var jumpToLatestMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var hasMoreOlder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, channel.state.loadMessageIntoState('latest')];
                case 1:
                    _a.sent();
                    hasMoreOlder = channel.state.messages.length >= 25;
                    loadMoreFinished(hasMoreOlder, channel.state.messages);
                    dispatch({
                        type: 'jumpToLatestMessage',
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var updateMessage = function (updatedMessage) {
        // add the message to the local channel state
        channel.state.addMessageSorted(updatedMessage, true);
        dispatch({
            channel: channel,
            parentId: state.thread && updatedMessage.parent_id,
            type: 'copyMessagesFromChannel',
        });
    };
    var isUserResponseArray = function (output) { var _a; return ((_a = output[0]) === null || _a === void 0 ? void 0 : _a.id) != null; };
    var doSendMessage = function (message, customMessageData) { return __awaiter(void 0, void 0, void 0, function () {
        var attachments, id, _a, mentioned_users, parent_id, text, mentions, messageData, messageResponse, error_1, stringError, parsedError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    attachments = message.attachments, id = message.id, _a = message.mentioned_users, mentioned_users = _a === void 0 ? [] : _a, parent_id = message.parent_id, text = message.text;
                    mentions = isUserResponseArray(mentioned_users)
                        ? mentioned_users.map(function (_a) {
                            var id = _a.id;
                            return id;
                        })
                        : mentioned_users;
                    messageData = __assign({ attachments: attachments, id: id, mentioned_users: mentions, parent_id: parent_id, quoted_message_id: parent_id === (quotedMessage === null || quotedMessage === void 0 ? void 0 : quotedMessage.parent_id) ? quotedMessage === null || quotedMessage === void 0 ? void 0 : quotedMessage.id : undefined, text: text }, customMessageData);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    messageResponse = void 0;
                    if (!doSendMessageRequest) return [3 /*break*/, 3];
                    return [4 /*yield*/, doSendMessageRequest(channel.cid, messageData)];
                case 2:
                    messageResponse = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, channel.sendMessage(messageData)];
                case 4:
                    messageResponse = _b.sent();
                    _b.label = 5;
                case 5:
                    // replace it after send is completed
                    if (messageResponse === null || messageResponse === void 0 ? void 0 : messageResponse.message) {
                        updateMessage(__assign(__assign({}, messageResponse.message), { status: 'received' }));
                    }
                    if (quotedMessage && parent_id === (quotedMessage === null || quotedMessage === void 0 ? void 0 : quotedMessage.parent_id))
                        setQuotedMessage(undefined);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    stringError = JSON.stringify(error_1);
                    parsedError = stringError ? JSON.parse(stringError) : {};
                    updateMessage(__assign(__assign({}, message), { error: parsedError, errorStatusCode: parsedError.status || undefined, status: 'failed' }));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var sendMessage = function (_a, customMessageData) {
        var _b = _a.attachments, attachments = _b === void 0 ? [] : _b, _c = _a.mentioned_users, mentioned_users = _c === void 0 ? [] : _c, parent = _a.parent, _d = _a.text, text = _d === void 0 ? '' : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            var messagePreview;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        channel.state.filterErrorMessages();
                        messagePreview = __assign({ __html: text, attachments: attachments, created_at: new Date(), html: text, id: (_e = customMessageData === null || customMessageData === void 0 ? void 0 : customMessageData.id) !== null && _e !== void 0 ? _e : "".concat(client.userID, "-").concat(nanoid()), mentioned_users: mentioned_users, reactions: [], status: 'sending', text: text, type: 'regular', user: client.user }, ((parent === null || parent === void 0 ? void 0 : parent.id) ? { parent_id: parent.id } : null));
                        updateMessage(messagePreview);
                        return [4 /*yield*/, doSendMessage(messagePreview, customMessageData)];
                    case 1:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var retrySendMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateMessage(__assign(__assign({}, message), { errorStatusCode: undefined, status: 'sending' }));
                    return [4 /*yield*/, doSendMessage(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var removeMessage = function (message) {
        channel.state.removeMessage(message);
        dispatch({
            channel: channel,
            parentId: state.thread && message.parent_id,
            type: 'copyMessagesFromChannel',
        });
    };
    /** THREAD */
    var openThread = function (message, event) {
        event.preventDefault();
        setQuotedMessage(function (current) {
            if ((current === null || current === void 0 ? void 0 : current.parent_id) !== (message === null || message === void 0 ? void 0 : message.parent_id)) {
                return undefined;
            }
            else {
                return current;
            }
        });
        dispatch({ channel: channel, message: message, type: 'openThread' });
    };
    var closeThread = function (event) {
        event.preventDefault();
        dispatch({ type: 'closeThread' });
    };
    var loadMoreThreadFinished = debounce(function (threadHasMore, threadMessages) {
        dispatch({
            threadHasMore: threadHasMore,
            threadMessages: threadMessages,
            type: 'loadMoreThreadFinished',
        });
    }, 2000, { leading: true, trailing: true });
    var loadMoreThread = function (limit) {
        if (limit === void 0) { limit = DEFAULT_THREAD_PAGE_SIZE; }
        return __awaiter(void 0, void 0, void 0, function () {
            var parentID, oldMessages, oldestMessageID, queryResponse, threadHasMoreMessages, newThreadMessages, e_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (state.threadLoadingMore || !state.thread)
                            return [2 /*return*/];
                        dispatch({ type: 'startLoadingThread' });
                        parentID = state.thread.id;
                        if (!parentID) {
                            return [2 /*return*/, dispatch({ type: 'closeThread' })];
                        }
                        oldMessages = channel.state.threads[parentID] || [];
                        oldestMessageID = (_a = oldMessages[0]) === null || _a === void 0 ? void 0 : _a.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.getReplies(parentID, {
                                id_lt: oldestMessageID,
                                limit: limit,
                            })];
                    case 2:
                        queryResponse = _b.sent();
                        threadHasMoreMessages = hasMoreMessagesProbably(queryResponse.messages.length, limit);
                        newThreadMessages = channel.state.threads[parentID] || [];
                        // next set loadingMore to false so we can start asking for more data
                        loadMoreThreadFinished(threadHasMoreMessages, newThreadMessages);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _b.sent();
                        loadMoreThreadFinished(false, oldMessages);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var onMentionsHoverOrClick = useMentionsHandlers(onMentionsHover, onMentionsClick);
    var editMessage = useEditMessageHandler(doUpdateMessageRequest);
    var typing = state.typing, restState = __rest(state, ["typing"]);
    var channelStateContextValue = useCreateChannelStateContext(__assign(__assign({}, restState), { acceptedFiles: acceptedFiles, channel: channel, channelCapabilitiesArray: channelCapabilitiesArray, channelConfig: channelConfig, dragAndDropWindow: dragAndDropWindow, giphyVersion: props.giphyVersion || 'fixed_height', imageAttachmentSizeHandler: props.imageAttachmentSizeHandler || getImageAttachmentConfiguration, maxNumberOfFiles: maxNumberOfFiles, multipleUploads: multipleUploads, mutes: mutes, notifications: notifications, quotedMessage: quotedMessage, shouldGenerateVideoThumbnail: props.shouldGenerateVideoThumbnail || true, videoAttachmentSizeHandler: props.videoAttachmentSizeHandler || getVideoAttachmentConfiguration, watcher_count: state.watcherCount }));
    var channelActionContextValue = useMemo(function () { return ({
        addNotification: addNotification,
        closeThread: closeThread,
        dispatch: dispatch,
        editMessage: editMessage,
        jumpToLatestMessage: jumpToLatestMessage,
        jumpToMessage: jumpToMessage,
        loadMore: loadMore,
        loadMoreNewer: loadMoreNewer,
        loadMoreThread: loadMoreThread,
        onMentionsClick: onMentionsHoverOrClick,
        onMentionsHover: onMentionsHoverOrClick,
        openThread: openThread,
        removeMessage: removeMessage,
        retrySendMessage: retrySendMessage,
        sendMessage: sendMessage,
        setQuotedMessage: setQuotedMessage,
        skipMessageDataMemoization: skipMessageDataMemoization,
        updateMessage: updateMessage,
    }); }, [channel.cid, loadMore, loadMoreNewer, quotedMessage, jumpToMessage, jumpToLatestMessage]);
    var componentContextValue = useMemo(function () { return ({
        Attachment: props.Attachment || DefaultAttachment,
        AutocompleteSuggestionHeader: props.AutocompleteSuggestionHeader,
        AutocompleteSuggestionItem: props.AutocompleteSuggestionItem,
        AutocompleteSuggestionList: props.AutocompleteSuggestionList,
        Avatar: props.Avatar,
        CooldownTimer: props.CooldownTimer,
        DateSeparator: props.DateSeparator,
        EditMessageInput: props.EditMessageInput,
        EmojiIcon: props.EmojiIcon,
        EmptyStateIndicator: props.EmptyStateIndicator,
        FileUploadIcon: props.FileUploadIcon,
        GiphyPreviewMessage: props.GiphyPreviewMessage,
        HeaderComponent: props.HeaderComponent,
        Input: props.Input,
        LoadingIndicator: props.LoadingIndicator,
        Message: props.Message || MessageSimple,
        MessageDeleted: props.MessageDeleted,
        MessageListNotifications: props.MessageListNotifications,
        MessageNotification: props.MessageNotification,
        MessageOptions: props.MessageOptions,
        MessageRepliesCountButton: props.MessageRepliesCountButton,
        MessageStatus: props.MessageStatus,
        MessageSystem: props.MessageSystem,
        MessageTimestamp: props.MessageTimestamp,
        ModalGallery: props.ModalGallery,
        PinIndicator: props.PinIndicator,
        QuotedMessage: props.QuotedMessage,
        QuotedMessagePreview: props.QuotedMessagePreview,
        ReactionSelector: props.ReactionSelector,
        ReactionsList: props.ReactionsList,
        SendButton: props.SendButton,
        ThreadHead: props.ThreadHead,
        ThreadHeader: props.ThreadHeader,
        ThreadStart: props.ThreadStart,
        TriggerProvider: props.TriggerProvider,
        TypingIndicator: props.TypingIndicator,
        VirtualMessage: props.VirtualMessage,
    }); }, []);
    var emojiContextValue = useMemo(function () { return ({
        Emoji: props.Emoji,
        emojiConfig: emojiConfig,
        EmojiIndex: props.EmojiIndex,
        EmojiPicker: props.EmojiPicker,
    }); }, []);
    var typingContextValue = useCreateTypingContext({
        typing: typing,
    });
    var OptionalMessageInputProvider = useMemo(function () { return (dragAndDropWindow ? DropzoneProvider : React.Fragment); }, [dragAndDropWindow]);
    var className = clsx(chatClass, theme, channelClass);
    if (state.error) {
        return (React.createElement("div", { className: className },
            React.createElement(LoadingErrorIndicator, { error: state.error })));
    }
    if (state.loading) {
        return (React.createElement("div", { className: className },
            React.createElement(LoadingIndicator, null)));
    }
    if (!channel.watch) {
        return (React.createElement("div", { className: className },
            React.createElement("div", null, t('Channel Missing'))));
    }
    return (React.createElement("div", { className: clsx(className, windowsEmojiClass) },
        React.createElement(ChannelStateProvider, { value: channelStateContextValue },
            React.createElement(ChannelActionProvider, { value: channelActionContextValue },
                React.createElement(ComponentProvider, { value: componentContextValue },
                    React.createElement(EmojiProvider, { value: emojiContextValue },
                        React.createElement(TypingProvider, { value: typingContextValue },
                            React.createElement("div", { className: "".concat(chatContainerClass) },
                                React.createElement(OptionalMessageInputProvider, __assign({}, optionalMessageInputProps), children)))))))));
};
/**
 * A wrapper component that provides channel data and renders children.
 * The Channel component provides the following contexts:
 * - [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/)
 * - [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/)
 * - [ComponentContext](https://getstream.io/chat/docs/sdk/react/contexts/component_context/)
 * - [EmojiContext](https://getstream.io/chat/docs/sdk/react/contexts/emoji_context/)
 * - [TypingContext](https://getstream.io/chat/docs/sdk/react/contexts/typing_context/)
 */
export var Channel = React.memo(UnMemoizedChannel);
