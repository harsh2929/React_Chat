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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useRef } from 'react';
import { deprecationAndReplacementWarning } from '../../utils/deprecationWarning';
/**
 * Prevents Chrome hangups
 * See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
 */
var mousewheelListener = function (event) {
    if (event instanceof WheelEvent && event.deltaY === 1) {
        event.preventDefault();
    }
};
export var InfiniteScroll = function (props) {
    var children = props.children, _a = props.element, element = _a === void 0 ? 'div' : _a, hasMore = props.hasMore, hasMoreNewer = props.hasMoreNewer, hasNextPage = props.hasNextPage, hasPreviousPage = props.hasPreviousPage, head = props.head, _b = props.initialLoad, initialLoad = _b === void 0 ? true : _b, isLoading = props.isLoading, listenToScroll = props.listenToScroll, loader = props.loader, loadMore = props.loadMore, loadMoreNewer = props.loadMoreNewer, loadNextPage = props.loadNextPage, loadPreviousPage = props.loadPreviousPage, _c = props.threshold, threshold = _c === void 0 ? 250 : _c, _d = props.useCapture, useCapture = _d === void 0 ? false : _d, elementProps = __rest(props, ["children", "element", "hasMore", "hasMoreNewer", "hasNextPage", "hasPreviousPage", "head", "initialLoad", "isLoading", "listenToScroll", "loader", "loadMore", "loadMoreNewer", "loadNextPage", "loadPreviousPage", "threshold", "useCapture"]);
    var loadNextPageFn = loadNextPage || loadMoreNewer;
    var loadPreviousPageFn = loadPreviousPage || loadMore;
    var hasNextPageFlag = hasNextPage || hasMoreNewer;
    var hasPreviousPageFlag = hasPreviousPage || hasMore;
    var scrollComponent = useRef();
    var scrollListener = useCallback(function () {
        var element = scrollComponent.current;
        if (!element || element.offsetParent === null) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var parentElement = element.parentElement;
        var offset = element.scrollHeight - parentElement.scrollTop - parentElement.clientHeight;
        var reverseOffset = parentElement.scrollTop;
        if (listenToScroll) {
            listenToScroll(offset, reverseOffset, threshold);
        }
        if (reverseOffset < Number(threshold) &&
            typeof loadPreviousPageFn === 'function' &&
            hasPreviousPageFlag) {
            loadPreviousPageFn();
        }
        if (offset < Number(threshold) && typeof loadNextPageFn === 'function' && hasNextPageFlag) {
            loadNextPageFn();
        }
    }, [
        hasPreviousPageFlag,
        hasNextPageFlag,
        threshold,
        listenToScroll,
        loadPreviousPageFn,
        loadNextPageFn,
    ]);
    useEffect(function () {
        deprecationAndReplacementWarning([
            [{ hasMoreNewer: hasMoreNewer }, { hasNextPage: hasNextPage }],
            [{ loadMoreNewer: loadMoreNewer }, { loadNextPage: loadNextPage }],
            [{ hasMore: hasMore }, { hasPreviousPage: hasPreviousPage }],
            [{ loadMore: loadMore }, { loadPreviousPage: loadPreviousPage }],
        ], 'InfiniteScroll');
    }, []);
    useEffect(function () {
        var _a;
        var scrollElement = (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (isLoading || !scrollElement) {
            return function () { return undefined; };
        }
        scrollElement.addEventListener('scroll', scrollListener, useCapture);
        scrollElement.addEventListener('resize', scrollListener, useCapture);
        return function () {
            scrollElement.removeEventListener('scroll', scrollListener, useCapture);
            scrollElement.removeEventListener('resize', scrollListener, useCapture);
        };
    }, [initialLoad, isLoading, scrollListener, useCapture]);
    useEffect(function () {
        var _a;
        var scrollElement = (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (scrollElement) {
            scrollElement.addEventListener('wheel', mousewheelListener, { passive: false });
        }
        return function () {
            if (scrollElement) {
                scrollElement.removeEventListener('wheel', mousewheelListener, useCapture);
            }
        };
    }, [useCapture]);
    var attributes = __assign(__assign({}, elementProps), { ref: function (element) {
            scrollComponent.current = element;
        } });
    var childrenArray = [loader, children];
    if (head) {
        childrenArray.unshift(head);
    }
    return React.createElement(element, attributes, childrenArray);
};
