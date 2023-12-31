import { useMemo } from 'react';
export var useCreateMessageInputContext = function (value) {
    var additionalTextareaProps = value.additionalTextareaProps, attachments = value.attachments, autocompleteTriggers = value.autocompleteTriggers, clearEditingState = value.clearEditingState, closeCommandsList = value.closeCommandsList, closeEmojiPicker = value.closeEmojiPicker, closeMentionsList = value.closeMentionsList, cooldownInterval = value.cooldownInterval, cooldownRemaining = value.cooldownRemaining, disabled = value.disabled, disableMentions = value.disableMentions, doFileUploadRequest = value.doFileUploadRequest, doImageUploadRequest = value.doImageUploadRequest, emojiIndex = value.emojiIndex, emojiPickerIsOpen = value.emojiPickerIsOpen, emojiPickerRef = value.emojiPickerRef, errorHandler = value.errorHandler, fileOrder = value.fileOrder, fileUploads = value.fileUploads, focus = value.focus, grow = value.grow, handleChange = value.handleChange, handleEmojiKeyDown = value.handleEmojiKeyDown, handleSubmit = value.handleSubmit, imageOrder = value.imageOrder, imageUploads = value.imageUploads, insertText = value.insertText, isUploadEnabled = value.isUploadEnabled, maxFilesLeft = value.maxFilesLeft, maxRows = value.maxRows, mentionAllAppUsers = value.mentionAllAppUsers, mentioned_users = value.mentioned_users, mentionQueryParams = value.mentionQueryParams, message = value.message, noFiles = value.noFiles, numberOfUploads = value.numberOfUploads, onPaste = value.onPaste, onSelectEmoji = value.onSelectEmoji, onSelectUser = value.onSelectUser, openCommandsList = value.openCommandsList, openEmojiPicker = value.openEmojiPicker, openMentionsList = value.openMentionsList, overrideSubmitHandler = value.overrideSubmitHandler, parent = value.parent, publishTypingEvent = value.publishTypingEvent, removeFile = value.removeFile, removeImage = value.removeImage, setCooldownRemaining = value.setCooldownRemaining, setText = value.setText, shouldSubmit = value.shouldSubmit, showCommandsList = value.showCommandsList, showMentionsList = value.showMentionsList, text = value.text, textareaRef = value.textareaRef, uploadFile = value.uploadFile, uploadImage = value.uploadImage, uploadNewFiles = value.uploadNewFiles, useMentionsTransliteration = value.useMentionsTransliteration;
    var editing = message === null || message === void 0 ? void 0 : message.editing;
    var fileUploadsValue = Object.entries(fileUploads)
        // eslint-disable-next-line
        .map(function (_a) {
        var _ = _a[0], value = _a[1];
        return value.state;
    })
        .join();
    var imageUploadsValue = Object.entries(imageUploads)
        // eslint-disable-next-line
        .map(function (_a) {
        var _ = _a[0], value = _a[1];
        return value.state;
    })
        .join();
    var mentionedUsersLength = mentioned_users.length;
    var parentId = parent === null || parent === void 0 ? void 0 : parent.id;
    var messageInputContext = useMemo(function () { return ({
        additionalTextareaProps: additionalTextareaProps,
        attachments: attachments,
        autocompleteTriggers: autocompleteTriggers,
        clearEditingState: clearEditingState,
        closeCommandsList: closeCommandsList,
        closeEmojiPicker: closeEmojiPicker,
        closeMentionsList: closeMentionsList,
        cooldownInterval: cooldownInterval,
        cooldownRemaining: cooldownRemaining,
        disabled: disabled,
        disableMentions: disableMentions,
        doFileUploadRequest: doFileUploadRequest,
        doImageUploadRequest: doImageUploadRequest,
        emojiIndex: emojiIndex,
        emojiPickerIsOpen: emojiPickerIsOpen,
        emojiPickerRef: emojiPickerRef,
        errorHandler: errorHandler,
        fileOrder: fileOrder,
        fileUploads: fileUploads,
        focus: focus,
        grow: grow,
        handleChange: handleChange,
        handleEmojiKeyDown: handleEmojiKeyDown,
        handleSubmit: handleSubmit,
        imageOrder: imageOrder,
        imageUploads: imageUploads,
        insertText: insertText,
        isUploadEnabled: isUploadEnabled,
        maxFilesLeft: maxFilesLeft,
        maxRows: maxRows,
        mentionAllAppUsers: mentionAllAppUsers,
        mentioned_users: mentioned_users,
        mentionQueryParams: mentionQueryParams,
        message: message,
        noFiles: noFiles,
        numberOfUploads: numberOfUploads,
        onPaste: onPaste,
        onSelectEmoji: onSelectEmoji,
        onSelectUser: onSelectUser,
        openCommandsList: openCommandsList,
        openEmojiPicker: openEmojiPicker,
        openMentionsList: openMentionsList,
        overrideSubmitHandler: overrideSubmitHandler,
        parent: parent,
        publishTypingEvent: publishTypingEvent,
        removeFile: removeFile,
        removeImage: removeImage,
        setCooldownRemaining: setCooldownRemaining,
        setText: setText,
        shouldSubmit: shouldSubmit,
        showCommandsList: showCommandsList,
        showMentionsList: showMentionsList,
        text: text,
        textareaRef: textareaRef,
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        uploadNewFiles: uploadNewFiles,
        useMentionsTransliteration: useMentionsTransliteration,
    }); }, [
        cooldownInterval,
        cooldownRemaining,
        editing,
        emojiPickerIsOpen,
        fileUploadsValue,
        imageUploadsValue,
        isUploadEnabled,
        mentionedUsersLength,
        parentId,
        publishTypingEvent,
        showCommandsList,
        showMentionsList,
        text,
    ]);
    return messageInputContext;
};
