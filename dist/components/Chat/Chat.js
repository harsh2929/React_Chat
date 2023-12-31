import React from 'react';
import { useChat } from './hooks/useChat';
import { useCreateChatContext } from './hooks/useCreateChatContext';
import { useChannelsQueryState } from './hooks/useChannelsQueryState';
import { darkModeTheme, useCustomStyles } from './hooks/useCustomStyles';
import { ChatProvider } from '../../context/ChatContext';
import { TranslationProvider } from '../../context/TranslationContext';
/**
 * Wrapper component for a StreamChat application. Chat needs to be placed around any other chat components
 * as it provides the ChatContext.
 */
export var Chat = function (props) {
    var children = props.children, client = props.client, customClasses = props.customClasses, customStyles = props.customStyles, _a = props.darkMode, darkMode = _a === void 0 ? false : _a, defaultLanguage = props.defaultLanguage, i18nInstance = props.i18nInstance, _b = props.initialNavOpen, initialNavOpen = _b === void 0 ? true : _b, _c = props.theme, theme = _c === void 0 ? 'messaging light' : _c, _d = props.useImageFlagEmojisOnWindows, useImageFlagEmojisOnWindows = _d === void 0 ? false : _d;
    var _e = useChat({ client: client, defaultLanguage: defaultLanguage, i18nInstance: i18nInstance, initialNavOpen: initialNavOpen }), channel = _e.channel, closeMobileNav = _e.closeMobileNav, getAppSettings = _e.getAppSettings, latestMessageDatesByChannels = _e.latestMessageDatesByChannels, mutes = _e.mutes, navOpen = _e.navOpen, openMobileNav = _e.openMobileNav, setActiveChannel = _e.setActiveChannel, translators = _e.translators;
    var channelsQueryState = useChannelsQueryState();
    var themeVersion = (getComputedStyle(document.documentElement)
        .getPropertyValue('--str-chat__theme-version')
        .replace(' ', '') || '1');
    useCustomStyles(darkMode ? darkModeTheme : customStyles);
    var chatContextValue = useCreateChatContext({
        channel: channel,
        channelsQueryState: channelsQueryState,
        client: client,
        closeMobileNav: closeMobileNav,
        customClasses: customClasses,
        getAppSettings: getAppSettings,
        latestMessageDatesByChannels: latestMessageDatesByChannels,
        mutes: mutes,
        navOpen: navOpen,
        openMobileNav: openMobileNav,
        setActiveChannel: setActiveChannel,
        theme: theme,
        themeVersion: themeVersion,
        useImageFlagEmojisOnWindows: useImageFlagEmojisOnWindows,
    });
    if (!translators.t)
        return null;
    return (React.createElement(ChatProvider, { value: chatContextValue },
        React.createElement(TranslationProvider, { value: translators }, children)));
};
