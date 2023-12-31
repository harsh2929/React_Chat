import React from 'react';
import { useChannelPreviewInfo, } from '../ChannelPreview/hooks/useChannelPreviewInfo';
import { CloseIcon } from './icons';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
export var ThreadHeader = function (props) {
    var closeThread = props.closeThread, overrideImage = props.overrideImage, overrideTitle = props.overrideTitle;
    var t = useTranslationContext('ThreadHeader').t;
    var channel = useChannelStateContext('').channel;
    var displayTitle = useChannelPreviewInfo({
        channel: channel,
        overrideImage: overrideImage,
        overrideTitle: overrideTitle,
    }).displayTitle;
    return (React.createElement("div", { className: 'str-chat__thread-header' },
        React.createElement("div", { className: 'str-chat__thread-header-details' },
            React.createElement("div", { className: 'str-chat__thread-header-title' }, t('Thread')),
            React.createElement("div", { className: 'str-chat__thread-header-subtitle' }, displayTitle)),
        React.createElement("button", { "aria-label": 'Close thread', className: 'str-chat__square-button str-chat__close-thread-button', "data-testid": 'close-button', onClick: function (event) { return closeThread(event); } },
            React.createElement(CloseIcon, null))));
};
