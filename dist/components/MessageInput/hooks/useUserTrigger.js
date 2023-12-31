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
import { useCallback, useState } from 'react';
import throttle from 'lodash.throttle';
import { searchLocalUsers } from './utils';
import { UserItem } from '../../UserItem/UserItem';
import { useChatContext } from '../../../context/ChatContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
export var useUserTrigger = function (params) {
    var disableMentions = params.disableMentions, mentionAllAppUsers = params.mentionAllAppUsers, _a = params.mentionQueryParams, mentionQueryParams = _a === void 0 ? {} : _a, onSelectUser = params.onSelectUser, useMentionsTransliteration = params.useMentionsTransliteration;
    var _b = useState(false), searching = _b[0], setSearching = _b[1];
    var _c = useChatContext('useUserTrigger'), client = _c.client, mutes = _c.mutes, themeVersion = _c.themeVersion;
    var channel = useChannelStateContext('useUserTrigger').channel;
    var members = channel.state.members;
    var watchers = channel.state.watchers;
    var getMembersAndWatchers = useCallback(function () {
        var memberUsers = members ? Object.values(members).map(function (_a) {
            var user = _a.user;
            return user;
        }) : [];
        var watcherUsers = watchers ? Object.values(watchers) : [];
        var users = __spreadArray(__spreadArray([], memberUsers, true), watcherUsers, true);
        // make sure we don't list users twice
        var uniqueUsers = {};
        users.forEach(function (user) {
            if (user && !uniqueUsers[user.id]) {
                uniqueUsers[user.id] = user;
            }
        });
        return Object.values(uniqueUsers);
    }, [members, watchers]);
    var queryMembersThrottled = useCallback(throttle(function (query, onReady) { return __awaiter(void 0, void 0, void 0, function () {
        var response, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, channel.queryMembers({
                            name: { $autocomplete: query },
                        })];
                case 1:
                    response = _a.sent();
                    users = response.members.map(function (member) { return member.user; });
                    if (onReady && users.length) {
                        onReady(users);
                    }
                    else {
                        onReady([]);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log({ error: error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, 200), [channel]);
    var queryUsers = function (query, onReady) { return __awaiter(void 0, void 0, void 0, function () {
        var users, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!query || searching)
                        return [2 /*return*/];
                    setSearching(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.queryUsers(__assign({ $or: [{ id: { $autocomplete: query } }, { name: { $autocomplete: query } }], id: { $ne: client.userID } }, mentionQueryParams.filters), __assign({ id: 1 }, mentionQueryParams.sort), __assign({ limit: 10 }, mentionQueryParams.options))];
                case 2:
                    users = (_a.sent()).users;
                    if (onReady && users.length) {
                        onReady(users);
                    }
                    else {
                        onReady([]);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log({ error: error_2 });
                    return [3 /*break*/, 4];
                case 4:
                    setSearching(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var queryUsersThrottled = throttle(queryUsers, 200);
    return {
        callback: function (item) { return onSelectUser(item); },
        component: UserItem,
        dataProvider: function (query, text, onReady) {
            var _a, _b;
            if (disableMentions)
                return;
            var filterMutes = function (data) {
                if (text.includes('/unmute') && !mutes.length) {
                    return [];
                }
                if (!mutes.length)
                    return data;
                if (text.includes('/unmute')) {
                    return data.filter(function (suggestion) {
                        return mutes.some(function (mute) { return mute.target.id === suggestion.id; });
                    });
                }
                return data.filter(function (suggestion) { return mutes.every(function (mute) { return mute.target.id !== suggestion.id; }); });
            };
            if (mentionAllAppUsers) {
                return queryUsersThrottled(query, function (data) {
                    if (onReady)
                        onReady(filterMutes(data), query);
                });
            }
            /**
             * By default, we return maximum 100 members via queryChannels api call.
             * Thus it is safe to assume, that if number of members in channel.state is < 100,
             * then all the members are already available on client side and we don't need to
             * make any api call to queryMembers endpoint.
             */
            if (!query || Object.values(members || {}).length < 100) {
                var users = getMembersAndWatchers();
                var params_1 = {
                    ownUserId: client.userID,
                    query: query,
                    text: text,
                    useMentionsTransliteration: useMentionsTransliteration,
                    users: users,
                };
                var matchingUsers = searchLocalUsers(params_1);
                var usersToShow = (_b = (_a = mentionQueryParams.options) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : (themeVersion === '2' ? 7 : 10);
                var data = matchingUsers.slice(0, usersToShow);
                if (onReady)
                    onReady(filterMutes(data), query);
                return data;
            }
            return queryMembersThrottled(query, function (data) {
                if (onReady)
                    onReady(filterMutes(data), query);
            });
        },
        output: function (entity) { return ({
            caretPosition: 'next',
            key: entity.id,
            text: "@".concat(entity.name || entity.id),
        }); },
    };
};
