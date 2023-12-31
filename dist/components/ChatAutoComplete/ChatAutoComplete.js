import React, { useCallback } from 'react';
import { AutoCompleteTextarea } from '../AutoCompleteTextarea';
import { LoadingIndicator } from '../Loading/LoadingIndicator';
import { useMessageInputContext } from '../../context/MessageInputContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useComponentContext } from '../../context/ComponentContext';
var UnMemoizedChatAutoComplete = function (props) {
    var _a = useComponentContext('ChatAutoComplete'), SuggestionItem = _a.AutocompleteSuggestionItem, SuggestionList = _a.AutocompleteSuggestionList;
    var t = useTranslationContext('ChatAutoComplete').t;
    var messageInput = useMessageInputContext('ChatAutoComplete');
    var cooldownRemaining = messageInput.cooldownRemaining, disabled = messageInput.disabled, emojiIndex = messageInput.emojiIndex, innerRef = messageInput.textareaRef;
    var placeholder = props.placeholder || t('Type your message');
    var emojiReplace = props.wordReplace
        ? function (word) { var _a; return (_a = props.wordReplace) === null || _a === void 0 ? void 0 : _a.call(props, word, emojiIndex); }
        : function (word) {
            var found = (emojiIndex === null || emojiIndex === void 0 ? void 0 : emojiIndex.search(word)) || [];
            var emoji = found
                .filter(Boolean)
                .slice(0, 10)
                .find(function (_a) {
                var emoticons = _a.emoticons;
                return !!(emoticons === null || emoticons === void 0 ? void 0 : emoticons.includes(word));
            });
            if (!emoji || !('native' in emoji))
                return null;
            return emoji.native;
        };
    var updateInnerRef = useCallback(function (ref) {
        if (innerRef) {
            innerRef.current = ref;
        }
    }, [innerRef]);
    return (React.createElement(AutoCompleteTextarea, { additionalTextareaProps: messageInput.additionalTextareaProps, "aria-label": cooldownRemaining ? t('Slow Mode ON') : placeholder, className: 'str-chat__textarea__textarea str-chat__message-textarea', closeCommandsList: messageInput.closeCommandsList, closeMentionsList: messageInput.closeMentionsList, containerClassName: 'str-chat__textarea str-chat__message-textarea-react-host', disabled: disabled || !!cooldownRemaining, disableMentions: messageInput.disableMentions, dropdownClassName: 'str-chat__emojisearch', grow: messageInput.grow, handleSubmit: props.handleSubmit || messageInput.handleSubmit, innerRef: updateInnerRef, itemClassName: 'str-chat__emojisearch__item', listClassName: 'str-chat__emojisearch__list', loadingComponent: LoadingIndicator, maxRows: messageInput.maxRows, minChar: 0, onBlur: props.onBlur, onChange: props.onChange || messageInput.handleChange, onFocus: props.onFocus, onPaste: props.onPaste || messageInput.onPaste, placeholder: cooldownRemaining ? t('Slow Mode ON') : placeholder, replaceWord: emojiReplace, rows: props.rows || 1, shouldSubmit: messageInput.shouldSubmit, showCommandsList: messageInput.showCommandsList, showMentionsList: messageInput.showMentionsList, SuggestionItem: SuggestionItem, SuggestionList: SuggestionList, trigger: messageInput.autocompleteTriggers || {}, value: props.value || messageInput.text }));
};
export var ChatAutoComplete = React.memo(UnMemoizedChatAutoComplete);
