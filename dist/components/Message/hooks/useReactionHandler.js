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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
export var reactionHandlerWarning = "Reaction handler was called, but it is missing one of its required arguments.\nMake sure the ChannelAction and ChannelState contexts are properly set and the hook is initialized with a valid message.";
export var useReactionHandler = function (message) {
    var updateMessage = useChannelActionContext('useReactionHandler').updateMessage;
    var channel = useChannelStateContext('useReactionHandler').channel;
    var client = useChatContext('useReactionHandler').client;
    var createMessagePreview = useCallback(function (add, reaction, message) {
        var _a, _b;
        var newReactionCounts = (message === null || message === void 0 ? void 0 : message.reaction_counts) || {};
        var reactionType = reaction.type;
        var hasReaction = !!newReactionCounts[reactionType];
        if (add) {
            newReactionCounts[reactionType] = hasReaction ? newReactionCounts[reactionType] + 1 : 1;
        }
        else {
            if (hasReaction && newReactionCounts[reactionType] > 1) {
                newReactionCounts[reactionType]--;
            }
            else {
                delete newReactionCounts[reactionType];
            }
        }
        var newReactions = add
            ? __spreadArray([reaction], ((message === null || message === void 0 ? void 0 : message.latest_reactions) || []), true) : (_a = message.latest_reactions) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return !(item.type === reaction.type && item.user_id === reaction.user_id); });
        var newOwnReactions = add
            ? __spreadArray([reaction], ((message === null || message === void 0 ? void 0 : message.own_reactions) || []), true) : (_b = message === null || message === void 0 ? void 0 : message.own_reactions) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return item.type !== reaction.type; });
        return __assign(__assign({}, message), { latest_reactions: newReactions || message.latest_reactions, own_reactions: newOwnReactions, reaction_counts: newReactionCounts, reaction_scores: newReactionCounts });
    }, [client.user, client.userID]);
    var creatReactionPreview = function (type) {
        var _a;
        return ({
            message_id: message === null || message === void 0 ? void 0 : message.id,
            score: 1,
            type: type,
            user: client.user,
            user_id: (_a = client.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    };
    var toggleReaction = throttle(function (id, type, add) { return __awaiter(void 0, void 0, void 0, function () {
        var newReaction, tempMessage, messageResponse, _a, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!message || ((_b = channel.data) === null || _b === void 0 ? void 0 : _b.frozen))
                        return [2 /*return*/];
                    newReaction = creatReactionPreview(type);
                    tempMessage = createMessagePreview(add, newReaction, message);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    updateMessage(tempMessage);
                    if (!add) return [3 /*break*/, 3];
                    return [4 /*yield*/, channel.sendReaction(id, { type: type })];
                case 2:
                    _a = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, channel.deleteReaction(id, type)];
                case 4:
                    _a = _c.sent();
                    _c.label = 5;
                case 5:
                    messageResponse = _a;
                    updateMessage(messageResponse.message);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    // revert to the original message if the API call fails
                    updateMessage(message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }, 1000);
    return function (reactionType, event) { return __awaiter(void 0, void 0, void 0, function () {
        var userExistingReaction, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (event === null || event === void 0 ? void 0 : event.preventDefault) {
                        event.preventDefault();
                    }
                    if (!message) {
                        return [2 /*return*/, console.warn(reactionHandlerWarning)];
                    }
                    userExistingReaction = null;
                    if (message.own_reactions) {
                        message.own_reactions.forEach(function (reaction) {
                            // own user should only ever contain the current user id
                            // just in case we check to prevent bugs with message updates from breaking reactions
                            if (reaction.user && client.userID === reaction.user.id && reaction.type === reactionType) {
                                userExistingReaction = reaction;
                            }
                            else if (reaction.user && client.userID !== reaction.user.id) {
                                console.warn("message.own_reactions contained reactions from a different user, this indicates a bug");
                            }
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!userExistingReaction) return [3 /*break*/, 3];
                    return [4 /*yield*/, toggleReaction(message.id, userExistingReaction.type, false)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, toggleReaction(message.id, reactionType, true)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.log({ error: error_2 });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
export var useReactionClick = function (message, reactionSelectorRef, messageWrapperRef, closeReactionSelectorOnClick) {
    var _a;
    var _b = useChannelStateContext('useReactionClick'), channel = _b.channel, _c = _b.channelCapabilities, channelCapabilities = _c === void 0 ? {} : _c, channelConfig = _b.channelConfig;
    var _d = useState(false), showDetailedReactions = _d[0], setShowDetailedReactions = _d[1];
    var hasListener = useRef(false);
    var isFrozen = !!((_a = channel.data) === null || _a === void 0 ? void 0 : _a.frozen);
    var isReactionEnabled = ((channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.reactions) !== false && channelCapabilities['send-reaction']) || isFrozen;
    var messageDeleted = !!(message === null || message === void 0 ? void 0 : message.deleted_at);
    var closeDetailedReactions = useCallback(function (event) {
        var _a;
        if (event.target instanceof HTMLElement &&
            ((_a = reactionSelectorRef === null || reactionSelectorRef === void 0 ? void 0 : reactionSelectorRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
            !closeReactionSelectorOnClick) {
            return;
        }
        setShowDetailedReactions(false);
    }, [setShowDetailedReactions, reactionSelectorRef]);
    useEffect(function () {
        var messageWrapper = messageWrapperRef === null || messageWrapperRef === void 0 ? void 0 : messageWrapperRef.current;
        if (showDetailedReactions && !hasListener.current) {
            hasListener.current = true;
            document.addEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.addEventListener('mouseleave', closeDetailedReactions);
            }
        }
        if (!showDetailedReactions && hasListener.current) {
            document.removeEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
            }
            hasListener.current = false;
        }
        return function () {
            if (hasListener.current) {
                document.removeEventListener('click', closeDetailedReactions);
                if (messageWrapper) {
                    messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
                }
                hasListener.current = false;
            }
        };
    }, [showDetailedReactions, closeDetailedReactions, messageWrapperRef]);
    useEffect(function () {
        var messageWrapper = messageWrapperRef === null || messageWrapperRef === void 0 ? void 0 : messageWrapperRef.current;
        if (messageDeleted && hasListener.current) {
            document.removeEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
            }
            hasListener.current = false;
        }
    }, [messageDeleted, closeDetailedReactions, messageWrapperRef]);
    var onReactionListClick = function (event) {
        if (event === null || event === void 0 ? void 0 : event.stopPropagation) {
            event.stopPropagation();
        }
        setShowDetailedReactions(function (prev) { return !prev; });
    };
    return {
        isReactionEnabled: isReactionEnabled,
        onReactionListClick: onReactionListClick,
        showDetailedReactions: showDetailedReactions,
    };
};
