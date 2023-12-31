import React, { useMemo } from 'react';
import { QuotedMessage as DefaultQuotedMessage } from './QuotedMessage';
import { messageHasAttachments } from './utils';
import { useComponentContext, useMessageContext, useTranslationContext } from '../../context';
import { renderText as defaultRenderText, isOnlyEmojis } from '../../utils';
var UnMemoizedMessageTextComponent = function (props) {
    var _a;
    var customInnerClass = props.customInnerClass, _b = props.customWrapperClass, customWrapperClass = _b === void 0 ? '' : _b, propMessage = props.message, _c = props.theme, theme = _c === void 0 ? 'simple' : _c;
    var _d = useComponentContext('MessageText').QuotedMessage, QuotedMessage = _d === void 0 ? DefaultQuotedMessage : _d;
    var _e = useMessageContext('MessageText'), contextMessage = _e.message, onMentionsClickMessage = _e.onMentionsClickMessage, onMentionsHoverMessage = _e.onMentionsHoverMessage, _f = _e.renderText, renderText = _f === void 0 ? defaultRenderText : _f, unsafeHTML = _e.unsafeHTML;
    var _g = useTranslationContext('MessageText'), t = _g.t, userLanguage = _g.userLanguage;
    var message = propMessage || contextMessage;
    var hasAttachment = messageHasAttachments(message);
    var messageTextToRender = ((_a = message.i18n) === null || _a === void 0 ? void 0 : _a["".concat(userLanguage, "_text")]) || message.text;
    var messageText = useMemo(function () { return renderText(messageTextToRender, message.mentioned_users); }, [
        message.mentioned_users,
        messageTextToRender,
    ]);
    var wrapperClass = customWrapperClass || 'str-chat__message-text';
    var innerClass = customInnerClass || "str-chat__message-text-inner str-chat__message-".concat(theme, "-text-inner");
    if (!messageTextToRender && !message.quoted_message)
        return null;
    return (React.createElement("div", { className: wrapperClass, tabIndex: 0 },
        React.createElement("div", { className: "\n          ".concat(innerClass, "\n          ").concat(hasAttachment ? " str-chat__message-".concat(theme, "-text-inner--has-attachment") : '', "\n          ").concat(isOnlyEmojis(message.text) && !message.quoted_message
                ? " str-chat__message-".concat(theme, "-text-inner--is-emoji")
                : '', "\n        ").trim(), "data-testid": 'message-text-inner-wrapper', onClick: onMentionsClickMessage, onMouseOver: onMentionsHoverMessage },
            message.quoted_message && React.createElement(QuotedMessage, null),
            message.type === 'error' && (React.createElement("div", { className: "str-chat__".concat(theme, "-message--error-message str-chat__message--error-message") }, t('Error · Unsent'))),
            message.status === 'failed' && (React.createElement("div", { className: "str-chat__".concat(theme, "-message--error-message str-chat__message--error-message") }, message.errorStatusCode !== 403
                ? t('Message Failed · Click to try again')
                : t('Message Failed · Unauthorized'))),
            unsafeHTML && message.html ? (React.createElement("div", { dangerouslySetInnerHTML: { __html: message.html } })) : (React.createElement("div", null, messageText)))));
};
export var MessageText = React.memo(UnMemoizedMessageTextComponent);
