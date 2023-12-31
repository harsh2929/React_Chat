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
import React, { useContext } from 'react';
import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getDisplayName } from './utils/getDisplayName';
import { defaultTranslatorFunction } from '../i18n';
Dayjs.extend(calendar);
Dayjs.extend(localizedFormat);
export var isLanguageSupported = function (language) {
    var translations = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'tr'];
    return translations.some(function (translation) { return language === translation; });
};
export var isDayOrMoment = function (output) {
    return !!(output === null || output === void 0 ? void 0 : output.isSame);
};
export var isDate = function (output) {
    return !!(output === null || output === void 0 ? void 0 : output.getMonth);
};
export var isNumberOrString = function (output) {
    return typeof output === 'string' || typeof output === 'number';
};
export var defaultDateTimeParser = function (input) { return Dayjs(input); };
export var TranslationContext = React.createContext({
    t: defaultTranslatorFunction,
    tDateTimeParser: defaultDateTimeParser,
    userLanguage: 'en',
});
export var TranslationProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(TranslationContext.Provider, { value: value }, children));
};
export var useTranslationContext = function (componentName) {
    var contextValue = useContext(TranslationContext);
    if (!contextValue) {
        console.warn("The useTranslationContext hook was called outside of the TranslationContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ".concat(componentName, " component."));
        return {};
    }
    return contextValue;
};
export var withTranslationContext = function (Component) {
    var WithTranslationContextComponent = function (props) {
        var translationContext = useTranslationContext();
        return React.createElement(Component, __assign({}, props, translationContext));
    };
    WithTranslationContextComponent.displayName = "WithTranslationContext".concat(getDisplayName(Component));
    return WithTranslationContextComponent;
};
