import { useEffect, useRef } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export function useMessageListScrollManager(params) {
    var onScrollBy = params.onScrollBy, scrollContainerMeasures = params.scrollContainerMeasures, scrolledUpThreshold = params.scrolledUpThreshold, scrollToBottom = params.scrollToBottom, showNewMessages = params.showNewMessages;
    var client = useChatContext('useMessageListScrollManager').client;
    var measures = useRef({
        offsetHeight: 0,
        scrollHeight: 0,
    });
    var messages = useRef();
    var scrollTop = useRef(0);
    useEffect(function () {
        var _a, _b, _c;
        var prevMeasures = measures.current;
        var prevMessages = messages.current;
        var newMessages = params.messages;
        var lastNewMessage = newMessages[newMessages.length - 1] || {};
        var lastPrevMessage = prevMessages === null || prevMessages === void 0 ? void 0 : prevMessages[prevMessages.length - 1];
        var newMeasures = scrollContainerMeasures();
        var wasAtBottom = prevMeasures.scrollHeight - prevMeasures.offsetHeight - scrollTop.current <
            scrolledUpThreshold;
        if (typeof prevMessages !== 'undefined') {
            if (prevMessages.length < newMessages.length) {
                // messages added to the top
                if ((lastPrevMessage === null || lastPrevMessage === void 0 ? void 0 : lastPrevMessage.id) === lastNewMessage.id) {
                    var listHeightDelta = newMeasures.scrollHeight - prevMeasures.scrollHeight;
                    if (scrollTop.current === 0) {
                        onScrollBy(listHeightDelta);
                    }
                }
                // messages added to the bottom
                else {
                    var lastMessageIsFromCurrentUser = ((_a = lastNewMessage.user) === null || _a === void 0 ? void 0 : _a.id) === client.userID;
                    if (lastMessageIsFromCurrentUser || wasAtBottom) {
                        scrollToBottom();
                    }
                    else {
                        showNewMessages();
                    }
                }
            }
            // message list length didn't change, but check if last message had reaction/reply update
            else {
                var hasNewReactions = ((_b = lastPrevMessage === null || lastPrevMessage === void 0 ? void 0 : lastPrevMessage.latest_reactions) === null || _b === void 0 ? void 0 : _b.length) !== ((_c = lastNewMessage.latest_reactions) === null || _c === void 0 ? void 0 : _c.length);
                var hasNewReplies = (lastPrevMessage === null || lastPrevMessage === void 0 ? void 0 : lastPrevMessage.reply_count) !== lastNewMessage.reply_count;
                if ((hasNewReactions || hasNewReplies) && wasAtBottom) {
                    scrollToBottom();
                }
            }
        }
        messages.current = newMessages;
        measures.current = newMeasures;
    }, [measures, messages, params.messages]);
    return function (scrollTopValue) {
        scrollTop.current = scrollTopValue;
    };
}
