import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
export var renderPreviewText = function (text) { return React.createElement(ReactMarkdown, { source: text }); };
export var getLatestMessagePreview = function (channel, t, userLanguage) {
    var _a, _b;
    if (userLanguage === void 0) { userLanguage = 'en'; }
    var latestMessage = channel.state.messages[channel.state.messages.length - 1];
    var previewTextToRender = ((_a = latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.i18n) === null || _a === void 0 ? void 0 : _a["".concat(userLanguage, "_text")]) ||
        (latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.text);
    if (!latestMessage) {
        return t('Nothing yet...');
    }
    if (latestMessage.deleted_at) {
        return t('Message deleted');
    }
    if (previewTextToRender) {
        var renderedText = renderPreviewText(previewTextToRender);
        return renderedText;
    }
    if (latestMessage.command) {
        return "/".concat(latestMessage.command);
    }
    if ((_b = latestMessage.attachments) === null || _b === void 0 ? void 0 : _b.length) {
        return t('🏙 Attachment...');
    }
    return t('Empty message...');
};
export var getDisplayTitle = function (channel, currentUser) {
    var _a, _b;
    var title = (_a = channel.data) === null || _a === void 0 ? void 0 : _a.name;
    var members = Object.values(channel.state.members);
    if (!title && members.length === 2) {
        var otherMember = members.find(function (member) { var _a; return ((_a = member.user) === null || _a === void 0 ? void 0 : _a.id) !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id); });
        if ((_b = otherMember === null || otherMember === void 0 ? void 0 : otherMember.user) === null || _b === void 0 ? void 0 : _b.name) {
            title = otherMember.user.name;
        }
    }
    return title;
};
export var getDisplayImage = function (channel, currentUser) {
    var _a, _b;
    var image = (_a = channel.data) === null || _a === void 0 ? void 0 : _a.image;
    var members = Object.values(channel.state.members);
    if (!image && members.length === 2) {
        var otherMember = members.find(function (member) { var _a; return ((_a = member.user) === null || _a === void 0 ? void 0 : _a.id) !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id); });
        if ((_b = otherMember === null || otherMember === void 0 ? void 0 : otherMember.user) === null || _b === void 0 ? void 0 : _b.image) {
            image = otherMember.user.image;
        }
    }
    return image;
};
