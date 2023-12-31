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
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { isMutableRef } from './utils/utils';
import { Avatar as DefaultAvatar } from '../Avatar';
import { getStrippedEmojiData } from '../Channel/emojiData';
import { useComponentContext } from '../../context/ComponentContext';
import { useEmojiContext } from '../../context/EmojiContext';
import { useMessageContext } from '../../context/MessageContext';
var UnMemoizedReactionSelector = React.forwardRef(function (props, ref) {
    var _a;
    var _b = props.additionalEmojiProps, additionalEmojiProps = _b === void 0 ? {} : _b, propAvatar = props.Avatar, _c = props.detailedView, detailedView = _c === void 0 ? true : _c, propHandleReaction = props.handleReaction, propLatestReactions = props.latest_reactions, propOwnReactions = props.own_reactions, propReactionCounts = props.reaction_counts, propReactionOptions = props.reactionOptions, _d = props.reverse, reverse = _d === void 0 ? false : _d;
    var contextAvatar = useComponentContext('ReactionSelector').Avatar;
    var _e = useEmojiContext('ReactionSelector'), Emoji = _e.Emoji, emojiConfig = _e.emojiConfig;
    var _f = useMessageContext('ReactionSelector'), contextHandleReaction = _f.handleReaction, message = _f.message;
    var _g = emojiConfig || {}, defaultMinimalEmojis = _g.defaultMinimalEmojis, fullEmojiData = _g.emojiData, emojiSetDef = _g.emojiSetDef;
    var Avatar = propAvatar || contextAvatar || DefaultAvatar;
    var handleReaction = propHandleReaction || contextHandleReaction;
    var latestReactions = propLatestReactions || (message === null || message === void 0 ? void 0 : message.latest_reactions) || [];
    var ownReactions = propOwnReactions || (message === null || message === void 0 ? void 0 : message.own_reactions) || [];
    var reactionCounts = propReactionCounts || (message === null || message === void 0 ? void 0 : message.reaction_counts) || {};
    var reactionOptions = propReactionOptions || defaultMinimalEmojis;
    var reactionsAreCustom = !!(propReactionOptions === null || propReactionOptions === void 0 ? void 0 : propReactionOptions.length);
    var emojiData = useMemo(function () { return (reactionsAreCustom ? fullEmojiData : getStrippedEmojiData(fullEmojiData)); }, [fullEmojiData, reactionsAreCustom]);
    var _h = useState(null), tooltipReactionType = _h[0], setTooltipReactionType = _h[1];
    var _j = useState(null), tooltipPositions = _j[0], setTooltipPositions = _j[1];
    var targetRef = useRef(null);
    var tooltipRef = useRef(null);
    var showTooltip = useCallback(function (event, reactionType) {
        targetRef.current = event.currentTarget;
        setTooltipReactionType(reactionType);
    }, []);
    var hideTooltip = useCallback(function () {
        setTooltipReactionType(null);
        setTooltipPositions(null);
    }, []);
    useEffect(function () {
        var _a, _b, _c;
        if (tooltipReactionType) {
            var tooltip = (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            var target = (_b = targetRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            var container = isMutableRef(ref) ? (_c = ref.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect() : null;
            if (!tooltip || !target || !container)
                return;
            var tooltipPosition = tooltip.width === container.width || tooltip.x < container.x
                ? 0
                : target.left + target.width / 2 - container.left - tooltip.width / 2;
            var arrowPosition = target.x - tooltip.x + target.width / 2 - tooltipPosition;
            setTooltipPositions({
                arrow: arrowPosition,
                tooltip: tooltipPosition,
            });
        }
    }, [tooltipReactionType, ref]);
    var getUsersPerReactionType = function (type) {
        return latestReactions
            .map(function (reaction) {
            var _a, _b;
            if (reaction.type === type) {
                return ((_a = reaction.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = reaction.user) === null || _b === void 0 ? void 0 : _b.id);
            }
            return null;
        })
            .filter(Boolean);
    };
    var iHaveReactedWithReaction = function (reactionType) {
        return ownReactions.find(function (reaction) { return reaction.type === reactionType; });
    };
    var getLatestUserForReactionType = function (type) {
        var _a;
        return ((_a = latestReactions.find(function (reaction) { return reaction.type === type && !!reaction.user; })) === null || _a === void 0 ? void 0 : _a.user) ||
            undefined;
    };
    return (React.createElement("div", { className: clsx('str-chat__reaction-selector str-chat__message-reaction-selector', {
            'str-chat__reaction-selector--reverse': reverse,
        }), "data-testid": 'reaction-selector', ref: ref },
        !!tooltipReactionType && detailedView && (React.createElement("div", { className: 'str-chat__reaction-selector-tooltip', ref: tooltipRef, style: {
                left: tooltipPositions === null || tooltipPositions === void 0 ? void 0 : tooltipPositions.tooltip,
                visibility: tooltipPositions ? 'visible' : 'hidden',
            } },
            React.createElement("div", { className: 'arrow', style: { left: tooltipPositions === null || tooltipPositions === void 0 ? void 0 : tooltipPositions.arrow } }), (_a = getUsersPerReactionType(tooltipReactionType)) === null || _a === void 0 ? void 0 :
            _a.map(function (user, i, users) { return (React.createElement("span", { className: 'latest-user-username', key: "key-".concat(i, "-").concat(user) }, "".concat(user).concat(i < users.length - 1 ? ', ' : ''))); }))),
        React.createElement("ul", { className: 'str-chat__message-reactions-list str-chat__message-reactions-options' }, reactionOptions.map(function (reactionOption) {
            var latestUser = getLatestUserForReactionType(reactionOption.id);
            var count = reactionCounts && reactionCounts[reactionOption.id];
            return (React.createElement("li", { key: "item-".concat(reactionOption.id) },
                React.createElement("button", { "aria-label": "Select Reaction: ".concat(reactionOption.name), className: clsx('str-chat__message-reactions-list-item str-chat__message-reactions-option', {
                        'str-chat__message-reactions-option-selected': iHaveReactedWithReaction(reactionOption.id),
                    }), "data-text": reactionOption.id, onClick: function (event) { return handleReaction(reactionOption.id, event); } },
                    !!count && detailedView && (React.createElement("div", { className: 'latest-user str-chat__message-reactions-last-user', onClick: hideTooltip, onMouseEnter: function (e) { return showTooltip(e, reactionOption.id); }, onMouseLeave: hideTooltip }, latestUser ? (React.createElement(Avatar, { image: latestUser.image, name: latestUser.name, size: 20, user: latestUser })) : (React.createElement("div", { className: 'latest-user-not-found' })))),
                    React.createElement(Suspense, { fallback: null },
                        React.createElement("span", { className: 'str-chat__message-reaction-emoji' },
                            React.createElement(Emoji, __assign({ data: emojiData, emoji: reactionOption, size: 20 }, (reactionsAreCustom ? additionalEmojiProps : emojiSetDef))))),
                    Boolean(count) && detailedView && (React.createElement("span", { className: 'str-chat__message-reactions-list-item__count' }, count || '')))));
        }))));
});
/**
 * Component that allows a user to select a reaction.
 */
export var ReactionSelector = React.memo(UnMemoizedReactionSelector);
