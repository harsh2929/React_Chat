import React from 'react';
var UnMemoizedLoadingIndicator = function (props) {
    var _a = props.color, color = _a === void 0 ? '#006CFF' : _a, _b = props.size, size = _b === void 0 ? 15 : _b;
    return (React.createElement("div", { className: "str-chat__loading-indicator ".concat(color), "data-testid": 'loading-indicator-wrapper', style: { height: size, width: size } },
        React.createElement("svg", { height: size, viewBox: "0 0 30 30", width: size, xmlns: 'http://www.w3.org/2000/svg' },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: 'a', x1: '50%', x2: '50%', y1: '0%', y2: '100%' },
                    React.createElement("stop", { offset: '0%', stopColor: '#FFF', stopOpacity: '0' }),
                    React.createElement("stop", { "data-testid": 'loading-indicator-circle', offset: '100%', stopColor: color, stopOpacity: '1', style: { stopColor: color } }))),
            React.createElement("path", { d: 'M2.518 23.321l1.664-1.11A12.988 12.988 0 0 0 15 28c7.18 0 13-5.82 13-13S22.18 2 15 2V0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-5.206 0-9.792-2.652-12.482-6.679z', fill: 'url(#a)', fillRule: 'evenodd' }))));
};
/**
 * Simple loading spinner
 */
export var LoadingIndicator = React.memo(UnMemoizedLoadingIndicator, function (prevProps, nextProps) {
    return prevProps.color === nextProps.color && prevProps.size === nextProps.size;
});
