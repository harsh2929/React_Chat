import React, { useEffect } from 'react';
import { FileUploadButton, ImageDropzone } from 'react-file-utils';
import { EmojiPicker } from './EmojiPicker';
import { EmojiIconSmall as DefaultEmojiIcon, FileUploadIconFlat as DefaultFileUploadIcon, SendButton as DefaultSendButton, } from './icons';
import { UploadsPreview } from './UploadsPreview';
import { ChatAutoComplete } from '../ChatAutoComplete/ChatAutoComplete';
import { Tooltip } from '../Tooltip/Tooltip';
import { useChatContext } from '../../context/ChatContext';
import { useChannelActionContext } from '../../context/ChannelActionContext';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useMessageInputContext } from '../../context/MessageInputContext';
import { useComponentContext } from '../../context/ComponentContext';
import { QuotedMessagePreview as DefaultQuotedMessagePreview } from './QuotedMessagePreview';
import { CooldownTimer as DefaultCooldownTimer } from './CooldownTimer';
/**
 * @deprecated This component has beend deprecated in favor of [`MessageInputFlat`](./MessageInputFlat.tsx) from which
 * `MessageInputSmall` "inherited" most of the code with only slight modification to classNames
 * and markup.
 * In case you need to change styling in places where `MessageInputSmall` has been used previously ([`Thread`](../Thread/Thread.tsx))
 * please do so by updating the CSS or by overriding the component itself.
 *
 * **Will be removed with the complete transition to the theming V2 (next major release - `v11.0.0`).**
 */
export var MessageInputSmall = function () {
    var _a = useChannelStateContext('MessageInputSmall'), acceptedFiles = _a.acceptedFiles, multipleUploads = _a.multipleUploads, quotedMessage = _a.quotedMessage;
    var setQuotedMessage = useChannelActionContext('MessageInputSmall').setQuotedMessage;
    var t = useTranslationContext('MessageInputSmall').t;
    var channel = useChatContext('MessageInputSmall').channel;
    var _b = useMessageInputContext('MessageInputSmall'), closeEmojiPicker = _b.closeEmojiPicker, cooldownRemaining = _b.cooldownRemaining, emojiPickerIsOpen = _b.emojiPickerIsOpen, handleSubmit = _b.handleSubmit, isUploadEnabled = _b.isUploadEnabled, maxFilesLeft = _b.maxFilesLeft, numberOfUploads = _b.numberOfUploads, openEmojiPicker = _b.openEmojiPicker, setCooldownRemaining = _b.setCooldownRemaining, uploadNewFiles = _b.uploadNewFiles;
    var _c = useComponentContext('MessageInputSmall'), _d = _c.CooldownTimer, CooldownTimer = _d === void 0 ? DefaultCooldownTimer : _d, _e = _c.EmojiIcon, EmojiIcon = _e === void 0 ? DefaultEmojiIcon : _e, _f = _c.FileUploadIcon, FileUploadIcon = _f === void 0 ? DefaultFileUploadIcon : _f, _g = _c.SendButton, SendButton = _g === void 0 ? DefaultSendButton : _g, _h = _c.QuotedMessagePreview, QuotedMessagePreview = _h === void 0 ? DefaultQuotedMessagePreview : _h;
    useEffect(function () {
        var handleQuotedMessageUpdate = function (e) {
            var _a;
            if (!(quotedMessage && ((_a = e.message) === null || _a === void 0 ? void 0 : _a.id) === quotedMessage.id))
                return;
            if (e.type === 'message.deleted') {
                setQuotedMessage(undefined);
                return;
            }
            setQuotedMessage(e.message);
        };
        channel === null || channel === void 0 ? void 0 : channel.on('message.deleted', handleQuotedMessageUpdate);
        channel === null || channel === void 0 ? void 0 : channel.on('message.updated', handleQuotedMessageUpdate);
        return function () {
            channel === null || channel === void 0 ? void 0 : channel.off('message.deleted', handleQuotedMessageUpdate);
            channel === null || channel === void 0 ? void 0 : channel.off('message.updated', handleQuotedMessageUpdate);
        };
    }, [channel, quotedMessage]);
    return (React.createElement("div", { className: 'str-chat__small-message-input__wrapper' },
        React.createElement(ImageDropzone, { accept: acceptedFiles, disabled: !isUploadEnabled || maxFilesLeft === 0 || !!cooldownRemaining, handleFiles: uploadNewFiles, maxNumberOfFiles: maxFilesLeft, multiple: multipleUploads },
            React.createElement("div", { className: "str-chat__small-message-input ".concat(SendButton ? 'str-chat__small-message-input--send-button-active' : '', " ").concat(quotedMessage && quotedMessage.parent_id ? 'str-chat__input-flat-quoted' : '', " ").concat(numberOfUploads ? 'str-chat__small-message-input-has-attachments' : '', " ") },
                quotedMessage && quotedMessage.parent_id && (React.createElement(QuotedMessagePreview, { quotedMessage: quotedMessage })),
                isUploadEnabled && React.createElement(UploadsPreview, null),
                React.createElement("div", { className: 'str-chat__small-message-input--textarea-wrapper' },
                    React.createElement(ChatAutoComplete, null),
                    cooldownRemaining ? (React.createElement("div", { className: 'str-chat__input-small-cooldown' },
                        React.createElement(CooldownTimer, { cooldownInterval: cooldownRemaining, setCooldownRemaining: setCooldownRemaining }))) : (React.createElement(React.Fragment, null,
                        isUploadEnabled && (React.createElement("div", { className: 'str-chat__fileupload-wrapper', "data-testid": 'fileinput' },
                            React.createElement(Tooltip, null, maxFilesLeft
                                ? t('Attach files')
                                : t("You've reached the maximum number of files")),
                            React.createElement(FileUploadButton, { accepts: acceptedFiles, disabled: maxFilesLeft === 0, handleFiles: uploadNewFiles, multiple: multipleUploads },
                                React.createElement("span", { className: 'str-chat__small-message-input-fileupload' },
                                    React.createElement(FileUploadIcon, null))))),
                        React.createElement("div", { className: 'str-chat__emojiselect-wrapper' },
                            React.createElement(Tooltip, null, emojiPickerIsOpen
                                ? t('Close emoji picker')
                                : t('Open emoji picker')),
                            React.createElement("button", { "aria-label": 'Emoji picker', className: 'str-chat__small-message-input-emojiselect', onClick: emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker },
                                React.createElement(EmojiIcon, null))))),
                    React.createElement(EmojiPicker, { small: true })),
                !cooldownRemaining && React.createElement(SendButton, { sendMessage: handleSubmit })))));
};
