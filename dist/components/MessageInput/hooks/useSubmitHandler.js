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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useRef } from 'react';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useTranslationContext } from '../../../context/TranslationContext';
var getAttachmentTypeFromMime = function (mime) {
    if (mime.includes('video/'))
        return 'video';
    if (mime.includes('audio/'))
        return 'audio';
    return 'file';
};
export var useSubmitHandler = function (props, state, dispatch, numberOfUploads) {
    var clearEditingState = props.clearEditingState, message = props.message, overrideSubmitHandler = props.overrideSubmitHandler, parent = props.parent, publishTypingEvent = props.publishTypingEvent;
    var attachments = state.attachments, fileOrder = state.fileOrder, fileUploads = state.fileUploads, imageOrder = state.imageOrder, imageUploads = state.imageUploads, mentioned_users = state.mentioned_users, text = state.text;
    var channel = useChannelStateContext('useSubmitHandler').channel;
    var _a = useChannelActionContext('useSubmitHandler'), addNotification = _a.addNotification, editMessage = _a.editMessage, sendMessage = _a.sendMessage;
    var t = useTranslationContext('useSubmitHandler').t;
    var textReference = useRef({ hasChanged: false, initialText: text });
    useEffect(function () {
        if (!textReference.current.initialText.length) {
            textReference.current.initialText = text;
            return;
        }
        textReference.current.hasChanged = text !== textReference.current.initialText;
    }, [text]);
    var getAttachmentsFromUploads = function () {
        var imageAttachments = imageOrder
            .map(function (id) { return imageUploads[id]; })
            .filter(function (upload) { return upload.state !== 'failed'; })
            .filter(function (_a, _, self) {
            var id = _a.id, url = _a.url;
            return self.every(function (upload) { return upload.id === id || upload.url !== url; });
        })
            .filter(function (upload) {
            // keep the OG attachments in case the text has not changed as the BE
            // won't re-enrich the message when only attachments have changed
            if (!textReference.current.hasChanged)
                return true;
            return !upload.og_scrape_url;
        })
            .map(function (_a) {
            var name = _a.file.name, url = _a.url, rest = __rest(_a, ["file", "url"]);
            return ({
                author_name: rest.author_name,
                fallback: name,
                image_url: url,
                og_scrape_url: rest.og_scrape_url,
                text: rest.text,
                title: rest.title,
                title_link: rest.title_link,
                type: 'image',
            });
        });
        var fileAttachments = fileOrder
            .map(function (id) { return fileUploads[id]; })
            .filter(function (upload) { return upload.state !== 'failed'; })
            .map(function (upload) { return ({
            asset_url: upload.url,
            file_size: upload.file.size,
            mime_type: upload.file.type,
            thumb_url: upload.thumb_url,
            title: upload.file.name,
            type: getAttachmentTypeFromMime(upload.file.type || ''),
        }); });
        return __spreadArray(__spreadArray(__spreadArray([], attachments, true), imageAttachments, true), fileAttachments, true);
    };
    var handleSubmit = function (event, customMessageData) { return __awaiter(void 0, void 0, void 0, function () {
        var trimmedMessage, isEmptyMessage, someAttachmentsUploading, newAttachments, actualMentionedUsers, updatedMessage, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    trimmedMessage = text.trim();
                    isEmptyMessage = trimmedMessage === '' ||
                        trimmedMessage === '>' ||
                        trimmedMessage === '``````' ||
                        trimmedMessage === '``' ||
                        trimmedMessage === '**' ||
                        trimmedMessage === '____' ||
                        trimmedMessage === '__' ||
                        trimmedMessage === '****';
                    if (isEmptyMessage && numberOfUploads === 0)
                        return [2 /*return*/];
                    someAttachmentsUploading = Object.values(imageUploads).some(function (upload) { return upload.state === 'uploading'; }) ||
                        Object.values(fileUploads).some(function (upload) { return upload.state === 'uploading'; });
                    if (someAttachmentsUploading) {
                        return [2 /*return*/, addNotification(t('Wait until all attachments have uploaded'), 'error')];
                    }
                    newAttachments = getAttachmentsFromUploads();
                    actualMentionedUsers = Array.from(new Set(mentioned_users.filter(function (_a) {
                        var id = _a.id, name = _a.name;
                        return text.includes("@".concat(id)) || text.includes("@".concat(name));
                    })));
                    updatedMessage = {
                        attachments: newAttachments,
                        mentioned_users: actualMentionedUsers,
                        text: text,
                    };
                    if (!message) return [3 /*break*/, 5];
                    delete message.i18n;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, editMessage(__assign(__assign(__assign({}, message), updatedMessage), customMessageData))];
                case 2:
                    _a.sent();
                    clearEditingState === null || clearEditingState === void 0 ? void 0 : clearEditingState();
                    dispatch({ type: 'clear' });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    addNotification(t('Edit message request failed'), 'error');
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 13];
                case 5:
                    _a.trys.push([5, 12, , 13]);
                    dispatch({ type: 'clear' });
                    if (!overrideSubmitHandler) return [3 /*break*/, 7];
                    return [4 /*yield*/, overrideSubmitHandler(__assign(__assign({}, updatedMessage), { parent: parent }), channel.cid, customMessageData)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, sendMessage(__assign(__assign({}, updatedMessage), { parent: parent }), customMessageData)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    if (!publishTypingEvent) return [3 /*break*/, 11];
                    return [4 /*yield*/, channel.stopTyping()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_2 = _a.sent();
                    dispatch({
                        getNewText: function () { return text; },
                        type: 'setText',
                    });
                    actualMentionedUsers === null || actualMentionedUsers === void 0 ? void 0 : actualMentionedUsers.forEach(function (user) {
                        dispatch({ type: 'addMentionedUser', user: user });
                    });
                    addNotification(t('Send message request failed'), 'error');
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return { handleSubmit: handleSubmit };
};
