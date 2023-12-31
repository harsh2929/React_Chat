import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useMessageListScrollManager } from './useMessageListScrollManager';
export var useScrollLocationLogic = function (params) {
    var _a = params.messages, messages = _a === void 0 ? [] : _a, _b = params.scrolledUpThreshold, scrolledUpThreshold = _b === void 0 ? 200 : _b, hasMoreNewer = params.hasMoreNewer, suppressAutoscroll = params.suppressAutoscroll, listElement = params.listElement;
    var _c = useState(false), hasNewMessages = _c[0], setHasNewMessages = _c[1];
    var _d = useState(), wrapperRect = _d[0], setWrapperRect = _d[1];
    var _e = useState(true), isMessageListScrolledToBottom = _e[0], setIsMessageListScrolledToBottom = _e[1];
    var closeToBottom = useRef(false);
    var closeToTop = useRef(false);
    var scrollCounter = useRef({ autoScroll: 0, scroll: 0 });
    var scrollToBottom = useCallback(function () {
        if (!(listElement === null || listElement === void 0 ? void 0 : listElement.scrollTo) || hasMoreNewer || suppressAutoscroll) {
            return;
        }
        scrollCounter.current.autoScroll += 1;
        listElement.scrollTo({
            top: listElement.scrollHeight,
        });
        setHasNewMessages(false);
    }, [listElement, hasMoreNewer, suppressAutoscroll]);
    useLayoutEffect(function () {
        if (listElement) {
            setWrapperRect(listElement.getBoundingClientRect());
            scrollToBottom();
        }
    }, [listElement, hasMoreNewer]);
    var updateScrollTop = useMessageListScrollManager({
        messages: messages,
        onScrollBy: function (scrollBy) {
            listElement === null || listElement === void 0 ? void 0 : listElement.scrollBy({ top: scrollBy });
        },
        scrollContainerMeasures: function () { return ({
            offsetHeight: (listElement === null || listElement === void 0 ? void 0 : listElement.offsetHeight) || 0,
            scrollHeight: (listElement === null || listElement === void 0 ? void 0 : listElement.scrollHeight) || 0,
        }); },
        scrolledUpThreshold: scrolledUpThreshold,
        scrollToBottom: scrollToBottom,
        showNewMessages: function () { return setHasNewMessages(true); },
    });
    var onScroll = useCallback(function (event) {
        var element = event.target;
        var scrollTop = element.scrollTop;
        updateScrollTop(scrollTop);
        var offsetHeight = element.offsetHeight;
        var scrollHeight = element.scrollHeight;
        var prevCloseToBottom = closeToBottom.current;
        closeToBottom.current = scrollHeight - (scrollTop + offsetHeight) < scrolledUpThreshold;
        closeToTop.current = scrollTop < scrolledUpThreshold;
        if (closeToBottom.current) {
            setHasNewMessages(false);
        }
        if (prevCloseToBottom && !closeToBottom.current) {
            setIsMessageListScrolledToBottom(false);
        }
        else if (!prevCloseToBottom && closeToBottom.current) {
            setIsMessageListScrolledToBottom(true);
        }
    }, [updateScrollTop, closeToTop, closeToBottom, scrolledUpThreshold]);
    return {
        hasNewMessages: hasNewMessages,
        isMessageListScrolledToBottom: isMessageListScrolledToBottom,
        onScroll: onScroll,
        scrollToBottom: scrollToBottom,
        wrapperRect: wrapperRect,
    };
};
