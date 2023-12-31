import React, { useEffect } from 'react';
import { FileUploadButton, ImageDropzone } from 'react-file-utils';
import { EmojiPicker } from './EmojiPicker';
import { EmojiIconSmall as DefaultEmojiIcon, FileUploadIcon as DefaultFileUploadIcon, } from './icons';
import { UploadsPreview } from './UploadsPreview';
import { ChatAutoComplete } from '../ChatAutoComplete/ChatAutoComplete';
import { Tooltip } from '../Tooltip/Tooltip';
import { MessageInputFlat } from './MessageInputFlat';
import { useChannelStateContext, useChatContext, useComponentContext, useMessageInputContext, useTranslationContext, } from '../../context';
export var EditMessageForm = function () {
    var _a = useChannelStateContext('EditMessageForm'), acceptedFiles = _a.acceptedFiles, multipleUploads = _a.multipleUploads;
    var t = useTranslationContext('EditMessageForm').t;
    var _b = useMessageInputContext('EditMessageForm'), clearEditingState = _b.clearEditingState, closeEmojiPicker = _b.closeEmojiPicker, emojiPickerIsOpen = _b.emojiPickerIsOpen, handleSubmit = _b.handleSubmit, isUploadEnabled = _b.isUploadEnabled, maxFilesLeft = _b.maxFilesLeft, openEmojiPicker = _b.openEmojiPicker, uploadNewFiles = _b.uploadNewFiles;
    var _c = useComponentContext('EditMessageForm'), _d = _c.EmojiIcon, EmojiIcon = _d === void 0 ? DefaultEmojiIcon : _d, _e = _c.FileUploadIcon, FileUploadIcon = _e === void 0 ? DefaultFileUploadIcon : _e;
    var themeVersion = useChatContext('EditMessageForm').themeVersion;
    useEffect(function () {
        var onKeyDown = function (event) {
            if (event.key === 'Escape')
                clearEditingState === null || clearEditingState === void 0 ? void 0 : clearEditingState();
        };
        document.addEventListener('keydown', onKeyDown);
        return function () { return document.removeEventListener('keydown', onKeyDown); };
    }, [clearEditingState]);
    if (themeVersion === '2')
        return (React.createElement("form", { className: 'str-chat__edit-message-form', onSubmit: handleSubmit },
            React.createElement(MessageInputFlat, null),
            React.createElement("div", { className: 'str-chat__edit-message-form-options' },
                React.createElement("button", { className: 'str-chat__edit-message-cancel', "data-testid": 'cancel-button', onClick: clearEditingState }, t('Cancel')),
                React.createElement("button", { className: 'str-chat__edit-message-send', "data-testid": 'send-button', type: 'submit' }, t('Send')))));
    return (React.createElement("div", { className: 'str-chat__edit-message-form' },
        React.createElement(ImageDropzone, { accept: acceptedFiles, disabled: !isUploadEnabled || maxFilesLeft === 0, handleFiles: uploadNewFiles, maxNumberOfFiles: maxFilesLeft, multiple: multipleUploads },
            React.createElement("form", { onSubmit: handleSubmit },
                isUploadEnabled && React.createElement(UploadsPreview, null),
                React.createElement(EmojiPicker, { small: true }),
                React.createElement(ChatAutoComplete, null),
                React.createElement("div", { className: 'str-chat__message-team-form-footer' },
                    React.createElement("div", { className: 'str-chat__edit-message-form-options' },
                        React.createElement("button", { "aria-label": 'Open Emoji Picker', className: 'str-chat__input-emojiselect', onClick: emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker },
                            React.createElement(EmojiIcon, null)),
                        isUploadEnabled && (React.createElement("div", { className: 'str-chat__fileupload-wrapper', "data-testid": 'fileinput' },
                            React.createElement(Tooltip, null, maxFilesLeft
                                ? t('Attach files')
                                : t("You've reached the maximum number of files")),
                            React.createElement(FileUploadButton, { accepts: acceptedFiles, disabled: maxFilesLeft === 0, handleFiles: uploadNewFiles, multiple: multipleUploads },
                                React.createElement("span", { className: 'str-chat__input-fileupload' },
                                    React.createElement(FileUploadIcon, null)))))),
                    React.createElement("div", null,
                        React.createElement("button", { className: 'str-chat__edit-message-cancel', onClick: clearEditingState }, t('Cancel')),
                        React.createElement("button", { className: 'str-chat__edit-message-send', type: 'submit' }, t('Send'))))))));
};
