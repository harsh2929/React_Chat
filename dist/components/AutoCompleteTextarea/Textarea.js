var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import getCaretCoordinates from 'textarea-caret';
import { isValidElementType } from 'react-is';
import clsx from 'clsx';
import { List as DefaultSuggestionList } from './List';
import { DEFAULT_CARET_POSITION, defaultScrollToItem, errorMessage, triggerPropsCheck, } from './utils';
import { CommandItem } from '../CommandItem/CommandItem';
import { UserItem } from '../UserItem/UserItem';
var ReactTextareaAutocomplete = /** @class */ (function (_super) {
    __extends(ReactTextareaAutocomplete, _super);
    function ReactTextareaAutocomplete(props) {
        var _this = _super.call(this, props) || this;
        _this.getSelectionPosition = function () {
            if (!_this.textareaRef)
                return null;
            return {
                selectionEnd: _this.textareaRef.selectionEnd,
                selectionStart: _this.textareaRef.selectionStart,
            };
        };
        _this.getSelectedText = function () {
            if (!_this.textareaRef)
                return null;
            var _a = _this.textareaRef, selectionEnd = _a.selectionEnd, selectionStart = _a.selectionStart;
            if (selectionStart === selectionEnd)
                return null;
            return _this.state.value.substr(selectionStart, selectionEnd - selectionStart);
        };
        _this.setCaretPosition = function (position) {
            if (position === void 0) { position = 0; }
            if (!_this.textareaRef)
                return;
            _this.textareaRef.focus();
            _this.textareaRef.setSelectionRange(position, position);
        };
        _this.getCaretPosition = function () {
            if (!_this.textareaRef)
                return 0;
            return _this.textareaRef.selectionEnd;
        };
        /**
         * isComposing prevents double submissions in Korean and other languages.
         * starting point for a read:
         * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing
         * In the long term, the fix should happen by handling keypress, but changing this has unknown implications.
         * @param event React.KeyboardEvent
         */
        _this._defaultShouldSubmit = function (event) {
            return event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing;
        };
        _this._handleKeyDown = function (event) {
            var _a = _this.props.shouldSubmit, shouldSubmit = _a === void 0 ? _this._defaultShouldSubmit : _a;
            // prevent default behaviour when the selection list is rendered
            if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && _this.dropdownRef)
                event.preventDefault();
            if (shouldSubmit === null || shouldSubmit === void 0 ? void 0 : shouldSubmit(event))
                return _this._onEnter(event);
            if (event.key === ' ')
                return _this._onSpace(event);
            if (event.key === 'Escape')
                return _this._closeAutocomplete();
        };
        _this._onEnter = function (event) {
            if (!_this.textareaRef)
                return;
            var trigger = _this.state.currentTrigger;
            if (!trigger || !_this.state.data) {
                // trigger a submit
                _this._replaceWord();
                if (_this.textareaRef) {
                    _this.textareaRef.selectionEnd = 0;
                }
                _this.props.handleSubmit(event);
                _this._closeAutocomplete();
            }
        };
        _this._onSpace = function () {
            if (!_this.props.replaceWord || !_this.textareaRef)
                return;
            // don't change characters if the element doesn't have focus
            var hasFocus = _this.textareaRef.matches(':focus');
            if (!hasFocus)
                return;
            _this._replaceWord();
        };
        _this._replaceWord = function () {
            var value = _this.state.value;
            var lastWordRegex = /([^\s]+)(\s*)$/;
            var match = lastWordRegex.exec(value.slice(0, _this.getCaretPosition()));
            var lastWord = match && match[1];
            if (!lastWord)
                return;
            var spaces = match[2];
            var newWord = _this.props.replaceWord(lastWord);
            if (newWord == null)
                return;
            var textBeforeWord = value.slice(0, _this.getCaretPosition() - match[0].length);
            var textAfterCaret = value.slice(_this.getCaretPosition(), -1);
            var newText = textBeforeWord + newWord + spaces + textAfterCaret;
            _this.setState({
                value: newText,
            }, function () {
                // fire onChange event after successful selection
                var e = new CustomEvent('change', { bubbles: true });
                _this.textareaRef.dispatchEvent(e);
                if (_this.props.onChange)
                    _this.props.onChange(e);
            });
        };
        _this._onSelect = function (newToken) {
            var _a = _this.props, closeCommandsList = _a.closeCommandsList, closeMentionsList = _a.closeMentionsList, onChange = _a.onChange, showCommandsList = _a.showCommandsList, showMentionsList = _a.showMentionsList;
            var _b = _this.state, stateTrigger = _b.currentTrigger, selectionEnd = _b.selectionEnd, textareaValue = _b.value;
            var currentTrigger = showCommandsList ? '/' : showMentionsList ? '@' : stateTrigger;
            if (!currentTrigger)
                return;
            var computeCaretPosition = function (position, token, startToken) {
                switch (position) {
                    case 'start':
                        return startToken;
                    case 'next':
                    case 'end':
                        return startToken + token.length;
                    default:
                        if (!Number.isInteger(position)) {
                            throw new Error('RTA: caretPosition should be "start", "next", "end" or number.');
                        }
                        return position;
                }
            };
            var textToModify = showCommandsList
                ? '/'
                : showMentionsList
                    ? '@'
                    : textareaValue.slice(0, selectionEnd);
            var startOfTokenPosition = textToModify.lastIndexOf(currentTrigger);
            // we add space after emoji is selected if a caret position is next
            var newTokenString = newToken.caretPosition === 'next' ? "".concat(newToken.text, " ") : newToken.text;
            var newCaretPosition = computeCaretPosition(newToken.caretPosition, newTokenString, startOfTokenPosition);
            var modifiedText = textToModify.substring(0, startOfTokenPosition) + newTokenString;
            var valueToReplace = textareaValue.replace(textToModify, modifiedText);
            // set the new textarea value and after that set the caret back to its position
            _this.setState({
                dataLoading: false,
                value: valueToReplace,
            }, function () {
                // fire onChange event after successful selection
                var e = new CustomEvent('change', { bubbles: true });
                _this.textareaRef.dispatchEvent(e);
                if (onChange)
                    onChange(e);
                _this.setCaretPosition(newCaretPosition);
            });
            _this._closeAutocomplete();
            if (showCommandsList)
                closeCommandsList();
            if (showMentionsList)
                closeMentionsList();
        };
        _this._getItemOnSelect = function (paramTrigger) {
            var stateTrigger = _this.state.currentTrigger;
            var triggerSettings = _this._getCurrentTriggerSettings(paramTrigger);
            var currentTrigger = paramTrigger || stateTrigger;
            if (!currentTrigger || !triggerSettings)
                return null;
            var callback = triggerSettings.callback;
            if (!callback)
                return null;
            return function (item) {
                if (typeof callback !== 'function') {
                    throw new Error('Output functor is not defined! You have to define "output" function. https://github.com/webscopeio/react-textarea-autocomplete#trigger-type');
                }
                if (callback) {
                    return callback(item, currentTrigger);
                }
                return null;
            };
        };
        _this._getTextToReplace = function (paramTrigger) {
            var _a = _this.state, actualToken = _a.actualToken, stateTrigger = _a.currentTrigger;
            var triggerSettings = _this._getCurrentTriggerSettings(paramTrigger);
            var currentTrigger = paramTrigger || stateTrigger;
            if (!currentTrigger || !triggerSettings)
                return null;
            var output = triggerSettings.output;
            return function (item) {
                if (typeof item === 'object' && (!output || typeof output !== 'function')) {
                    throw new Error('Output functor is not defined! If you are using items as object you have to define "output" function. https://github.com/webscopeio/react-textarea-autocomplete#trigger-type');
                }
                if (output) {
                    var textToReplace = output(item, currentTrigger);
                    if (!textToReplace || typeof textToReplace === 'number') {
                        throw new Error("Output functor should return string or object in shape {text: string, caretPosition: string | number}.\nGot \"".concat(String(textToReplace), "\". Check the implementation for trigger \"").concat(currentTrigger, "\" and its token \"").concat(actualToken, "\"\n\nSee https://github.com/webscopeio/react-textarea-autocomplete#trigger-type for more informations.\n"));
                    }
                    if (typeof textToReplace === 'string') {
                        return {
                            caretPosition: DEFAULT_CARET_POSITION,
                            text: textToReplace,
                        };
                    }
                    if (!textToReplace.text && currentTrigger !== ':') {
                        throw new Error("Output \"text\" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger \"".concat(currentTrigger, "\" and its token \"").concat(actualToken, "\"\n"));
                    }
                    if (!textToReplace.caretPosition) {
                        throw new Error("Output \"caretPosition\" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger \"".concat(currentTrigger, "\" and its token \"").concat(actualToken, "\"\n"));
                    }
                    return textToReplace;
                }
                if (typeof item !== 'string') {
                    throw new Error('Output item should be string\n');
                }
                return {
                    caretPosition: DEFAULT_CARET_POSITION,
                    text: "".concat(currentTrigger).concat(item).concat(currentTrigger),
                };
            };
        };
        _this._getCurrentTriggerSettings = function (paramTrigger) {
            var stateTrigger = _this.state.currentTrigger;
            var currentTrigger = paramTrigger || stateTrigger;
            if (!currentTrigger)
                return null;
            return _this.props.trigger[currentTrigger];
        };
        _this._getValuesFromProvider = function () {
            var _a = _this.state, actualToken = _a.actualToken, currentTrigger = _a.currentTrigger;
            var triggerSettings = _this._getCurrentTriggerSettings();
            if (!currentTrigger || !triggerSettings)
                return;
            var component = triggerSettings.component, dataProvider = triggerSettings.dataProvider;
            if (typeof dataProvider !== 'function') {
                throw new Error('Trigger provider has to be a function!');
            }
            _this.setState({ dataLoading: true });
            // Modified: send the full text to support / style commands
            dataProvider(actualToken, _this.state.value, function (data, token) {
                // Make sure that the result is still relevant for current query
                if (token !== _this.state.actualToken)
                    return;
                if (!Array.isArray(data)) {
                    throw new Error('Trigger provider has to provide an array!');
                }
                if (!isValidElementType(component)) {
                    throw new Error('Component should be defined!');
                }
                // throw away if we resolved old trigger
                if (currentTrigger !== _this.state.currentTrigger)
                    return;
                // if we haven't resolved any data let's close the autocomplete
                if (!data.length) {
                    _this._closeAutocomplete();
                    return;
                }
                _this.setState({
                    component: component,
                    data: data,
                    dataLoading: false,
                });
            });
        };
        _this._getSuggestions = function (paramTrigger) {
            var _a = _this.state, stateTrigger = _a.currentTrigger, data = _a.data;
            var currentTrigger = paramTrigger || stateTrigger;
            if (!currentTrigger || !data || (data && !data.length))
                return null;
            return data;
        };
        /**
         * Close autocomplete, also clean up trigger (to avoid slow promises)
         */
        _this._closeAutocomplete = function () {
            _this.setState({
                currentTrigger: null,
                data: null,
                dataLoading: false,
                left: null,
                top: null,
            });
        };
        _this._cleanUpProps = function () {
            var props = __assign({}, _this.props);
            var notSafe = [
                'additionalTextareaProps',
                'className',
                'closeCommandsList',
                'closeMentionsList',
                'closeOnClickOutside',
                'containerClassName',
                'containerStyle',
                'disableMentions',
                'dropdownClassName',
                'dropdownStyle',
                'grow',
                'handleSubmit',
                'innerRef',
                'itemClassName',
                'itemStyle',
                'listClassName',
                'listStyle',
                'loaderClassName',
                'loaderStyle',
                'loadingComponent',
                'minChar',
                'movePopupAsYouType',
                'onCaretPositionChange',
                'onChange',
                'ref',
                'replaceWord',
                'scrollToItem',
                'shouldSubmit',
                'showCommandsList',
                'showMentionsList',
                'SuggestionItem',
                'SuggestionList',
                'trigger',
                'value',
            ];
            // eslint-disable-next-line
            for (var prop in props) {
                if (notSafe.includes(prop))
                    delete props[prop];
            }
            return props;
        };
        _this._isCommand = function (text) {
            if (text[0] !== '/')
                return false;
            var tokens = text.split(' ');
            return tokens.length <= 1;
        };
        _this._changeHandler = function (e) {
            var _a = _this.props, minChar = _a.minChar, movePopupAsYouType = _a.movePopupAsYouType, onCaretPositionChange = _a.onCaretPositionChange, onChange = _a.onChange, trigger = _a.trigger;
            var _b = _this.state, left = _b.left, top = _b.top;
            var textarea = e.target;
            var selectionEnd = textarea.selectionEnd, selectionStart = textarea.selectionStart, value = textarea.value;
            if (onChange) {
                e.persist();
                onChange(e);
            }
            if (onCaretPositionChange)
                onCaretPositionChange(_this.getCaretPosition());
            _this.setState({ value: value });
            var currentTrigger;
            var lastToken;
            if (_this._isCommand(value)) {
                currentTrigger = '/';
                lastToken = value;
            }
            else {
                var triggerTokens = Object.keys(trigger).join().replace('/', '');
                var triggerNorWhitespace = "[^\\s".concat(triggerTokens, "]*");
                var regex = new RegExp("(?!^|\\W)?[".concat(triggerTokens, "]").concat(triggerNorWhitespace, "\\s?").concat(triggerNorWhitespace, "$"), 'g');
                var tokenMatch = value.slice(0, selectionEnd).match(regex);
                lastToken = tokenMatch && tokenMatch[tokenMatch.length - 1].trim();
                currentTrigger = (lastToken && Object.keys(trigger).find(function (a) { return a === lastToken[0]; })) || null;
            }
            /*
             if we lost the trigger token or there is no following character we want to close
             the autocomplete
            */
            if (!lastToken || lastToken.length <= minChar) {
                _this._closeAutocomplete();
                return;
            }
            var actualToken = lastToken.slice(1);
            // if trigger is not configured step out from the function, otherwise proceed
            if (!currentTrigger)
                return;
            if (movePopupAsYouType ||
                (top === null && left === null) ||
                // if we have single char - trigger it means we want to re-position the autocomplete
                lastToken.length === 1) {
                var _c = getCaretCoordinates(textarea, selectionEnd), newLeft = _c.left, newTop = _c.top;
                _this.setState({
                    // make position relative to textarea
                    left: newLeft,
                    top: newTop - _this.textareaRef.scrollTop || 0,
                });
            }
            _this.setState({
                actualToken: actualToken,
                currentTrigger: currentTrigger,
                selectionEnd: selectionEnd,
                selectionStart: selectionStart,
            }, function () {
                try {
                    _this._getValuesFromProvider();
                }
                catch (err) {
                    errorMessage(err.message);
                }
            });
        };
        _this._selectHandler = function (e) {
            var _a = _this.props, onCaretPositionChange = _a.onCaretPositionChange, onSelect = _a.onSelect;
            if (onCaretPositionChange)
                onCaretPositionChange(_this.getCaretPosition());
            if (onSelect) {
                e.persist();
                onSelect(e);
            }
        };
        // The textarea itself is outside the auto-select dropdown.
        _this._onClickAndBlurHandler = function (e) {
            var _a = _this.props, closeOnClickOutside = _a.closeOnClickOutside, onBlur = _a.onBlur;
            // If this is a click: e.target is the textarea, and e.relatedTarget is the thing
            // that was actually clicked. If we clicked inside the auto-select dropdown, then
            // that's not a blur, from the auto-select point of view, so then do nothing.
            var el = e.relatedTarget;
            if (_this.dropdownRef && el instanceof Node && _this.dropdownRef.contains(el)) {
                return;
            }
            if (closeOnClickOutside)
                _this._closeAutocomplete();
            if (onBlur) {
                e.persist();
                onBlur(e);
            }
        };
        _this._onScrollHandler = function () { return _this._closeAutocomplete(); };
        _this._dropdownScroll = function (item) {
            var scrollToItem = _this.props.scrollToItem;
            if (!scrollToItem)
                return;
            if (scrollToItem === true) {
                defaultScrollToItem(_this.dropdownRef, item);
                return;
            }
            if (typeof scrollToItem !== 'function' || scrollToItem.length !== 2) {
                throw new Error('`scrollToItem` has to be boolean (true for default implementation) or function with two parameters: container, item.');
            }
            scrollToItem(_this.dropdownRef, item);
        };
        _this.getTriggerProps = function () {
            var _a = _this.props, showCommandsList = _a.showCommandsList, showMentionsList = _a.showMentionsList, trigger = _a.trigger;
            var _b = _this.state, component = _b.component, currentTrigger = _b.currentTrigger, selectionEnd = _b.selectionEnd, value = _b.value;
            var selectedItem = _this._getItemOnSelect();
            var suggestionData = _this._getSuggestions();
            var textToReplace = _this._getTextToReplace();
            var triggerProps = {
                component: component,
                currentTrigger: currentTrigger,
                getSelectedItem: selectedItem,
                getTextToReplace: textToReplace,
                selectionEnd: selectionEnd,
                value: value,
                values: suggestionData,
            };
            if ((showCommandsList && trigger['/']) || (showMentionsList && trigger['@'])) {
                var currentCommands_1;
                var getCommands = trigger[showCommandsList ? '/' : '@'].dataProvider;
                getCommands === null || getCommands === void 0 ? void 0 : getCommands('', showCommandsList ? '/' : '@', function (data) {
                    currentCommands_1 = data;
                });
                triggerProps.component = showCommandsList ? CommandItem : UserItem;
                triggerProps.currentTrigger = showCommandsList ? '/' : '@';
                triggerProps.getTextToReplace = _this._getTextToReplace(showCommandsList ? '/' : '@');
                triggerProps.getSelectedItem = _this._getItemOnSelect(showCommandsList ? '/' : '@');
                triggerProps.selectionEnd = 1;
                triggerProps.value = showCommandsList ? '/' : '@';
                triggerProps.values = currentCommands_1;
            }
            return triggerProps;
        };
        _this.setDropdownRef = function (element) {
            _this.dropdownRef = element;
        };
        var _a = _this.props, loadingComponent = _a.loadingComponent, trigger = _a.trigger, value = _a.value;
        // TODO: it would be better to have the parent control state...
        // if (value) this.state.value = value;
        if (!loadingComponent) {
            throw new Error('RTA: loadingComponent is not defined');
        }
        if (!trigger) {
            throw new Error('RTA: trigger is not defined');
        }
        _this.state = {
            actualToken: '',
            component: null,
            currentTrigger: null,
            data: null,
            dataLoading: false,
            left: null,
            selectionEnd: 0,
            selectionStart: 0,
            top: null,
            value: value || '',
        };
        return _this;
    }
    /**
     * setup to emulate the UNSAFE_componentWillReceiveProps
     */
    ReactTextareaAutocomplete.getDerivedStateFromProps = function (props, state) {
        if (props.value !== state.propsValue || !state.value) {
            return { propsValue: props.value, value: props.value };
        }
        else {
            return null;
        }
    };
    ReactTextareaAutocomplete.prototype.renderSuggestionListContainer = function () {
        var _a = this.props, disableMentions = _a.disableMentions, dropdownClassName = _a.dropdownClassName, dropdownStyle = _a.dropdownStyle, itemClassName = _a.itemClassName, itemStyle = _a.itemStyle, listClassName = _a.listClassName, SuggestionItem = _a.SuggestionItem, _b = _a.SuggestionList, SuggestionList = _b === void 0 ? DefaultSuggestionList : _b;
        var triggerProps = this.getTriggerProps();
        if (triggerProps.values &&
            triggerProps.currentTrigger &&
            !(disableMentions && triggerProps.currentTrigger === '@')) {
            return (React.createElement("div", { className: clsx('rta__autocomplete', 'str-chat__suggestion-list-container', dropdownClassName), ref: this.setDropdownRef, style: dropdownStyle },
                React.createElement(SuggestionList, __assign({ className: clsx('str-chat__suggestion-list', listClassName), dropdownScroll: this._dropdownScroll, itemClassName: clsx('str-chat__suggestion-list-item', itemClassName), itemStyle: itemStyle, onSelect: this._onSelect, SuggestionItem: SuggestionItem }, triggerProps))));
        }
        return null;
    };
    ReactTextareaAutocomplete.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, containerClassName = _a.containerClassName, containerStyle = _a.containerStyle, style = _a.style;
        var maxRows = this.props.maxRows;
        var _b = this.state, dataLoading = _b.dataLoading, value = _b.value;
        if (!this.props.grow)
            maxRows = 1;
        // By setting defaultValue to undefined, avoid error:
        // ForwardRef(TextareaAutosize) contains a textarea with both value and defaultValue props.
        // Textarea elements must be either controlled or uncontrolled
        return (React.createElement("div", { className: clsx('rta', containerClassName, {
                'rta--loading': dataLoading,
            }), style: containerStyle },
            this.renderSuggestionListContainer(),
            React.createElement(Textarea, __assign({ "data-testid": 'message-input' }, this._cleanUpProps(), { className: clsx('rta__textarea', className), maxRows: maxRows, onBlur: this._onClickAndBlurHandler, onChange: this._changeHandler, onClick: this._onClickAndBlurHandler, onFocus: this.props.onFocus, onKeyDown: this._handleKeyDown, onScroll: this._onScrollHandler, onSelect: this._selectHandler, ref: function (ref) {
                    var _a;
                    (_a = _this.props) === null || _a === void 0 ? void 0 : _a.innerRef(ref);
                    _this.textareaRef = ref;
                }, style: style, value: value }, this.props.additionalTextareaProps, { defaultValue: undefined }))));
    };
    ReactTextareaAutocomplete.defaultProps = {
        closeOnClickOutside: true,
        maxRows: 10,
        minChar: 1,
        movePopupAsYouType: false,
        scrollToItem: true,
        value: '',
    };
    return ReactTextareaAutocomplete;
}(React.Component));
export { ReactTextareaAutocomplete };
ReactTextareaAutocomplete.propTypes = {
    className: PropTypes.string,
    closeOnClickOutside: PropTypes.bool,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    disableMentions: PropTypes.bool,
    dropdownClassName: PropTypes.string,
    dropdownStyle: PropTypes.object,
    itemClassName: PropTypes.string,
    itemStyle: PropTypes.object,
    listClassName: PropTypes.string,
    listStyle: PropTypes.object,
    loaderClassName: PropTypes.string,
    loaderStyle: PropTypes.object,
    loadingComponent: PropTypes.elementType,
    minChar: PropTypes.number,
    onBlur: PropTypes.func,
    onCaretPositionChange: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    shouldSubmit: PropTypes.func,
    style: PropTypes.object,
    SuggestionList: PropTypes.elementType,
    trigger: triggerPropsCheck,
    value: PropTypes.string,
};
