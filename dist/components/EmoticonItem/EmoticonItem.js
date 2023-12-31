import React from 'react';
var UnMemoizedEmoticonItem = function (props) {
    var entity = props.entity;
    var hasEntity = Object.keys(entity).length;
    var itemParts = entity === null || entity === void 0 ? void 0 : entity.itemNameParts;
    var renderName = function () {
        if (!hasEntity)
            return null;
        return (hasEntity &&
            itemParts.parts.map(function (part, i) {
                return part.toLowerCase() === itemParts.match.toLowerCase() ? (React.createElement("span", { className: 'str-chat__emoji-item--highlight', key: "part-".concat(i) }, part)) : (React.createElement("span", { className: 'str-chat__emoji-item--part', key: "part-".concat(i) }, part));
            }));
    };
    return (React.createElement("div", { className: 'str-chat__emoji-item' },
        React.createElement("span", { className: 'str-chat__emoji-item--entity' }, entity.native),
        React.createElement("span", { className: 'str-chat__emoji-item--name' }, renderName())));
};
export var EmoticonItem = React.memo(UnMemoizedEmoticonItem);
