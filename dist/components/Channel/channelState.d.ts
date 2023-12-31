import type { Reducer } from 'react';
import type { Channel, MessageResponse, ChannelState as StreamChannelState } from 'stream-chat';
import type { ChannelState, StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ChannelStateReducerAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    type: 'closeThread';
} | {
    type: 'clearHighlightedMessage';
} | {
    channel: Channel<StreamChatGenerics>;
    type: 'copyMessagesFromChannel';
    parentId?: string | null;
} | {
    channel: Channel<StreamChatGenerics>;
    type: 'copyStateFromChannelOnEvent';
} | {
    hasMoreNewer: boolean;
    highlightedMessageId: string;
    type: 'jumpToMessageFinished';
} | {
    channel: Channel<StreamChatGenerics>;
    type: 'initStateFromChannel';
} | {
    hasMore: boolean;
    messages: StreamMessage<StreamChatGenerics>[];
    type: 'loadMoreFinished';
} | {
    hasMoreNewer: boolean;
    messages: StreamMessage<StreamChatGenerics>[];
    type: 'loadMoreNewerFinished';
} | {
    threadHasMore: boolean;
    threadMessages: Array<ReturnType<StreamChannelState<StreamChatGenerics>['formatMessage']>>;
    type: 'loadMoreThreadFinished';
} | {
    channel: Channel<StreamChatGenerics>;
    message: StreamMessage<StreamChatGenerics>;
    type: 'openThread';
} | {
    error: Error;
    type: 'setError';
} | {
    loadingMore: boolean;
    type: 'setLoadingMore';
} | {
    loadingMoreNewer: boolean;
    type: 'setLoadingMoreNewer';
} | {
    message: StreamMessage<StreamChatGenerics>;
    type: 'setThread';
} | {
    channel: Channel<StreamChatGenerics>;
    type: 'setTyping';
} | {
    type: 'startLoadingThread';
} | {
    channel: Channel<StreamChatGenerics>;
    message: MessageResponse<StreamChatGenerics>;
    type: 'updateThreadOnEvent';
} | {
    type: 'jumpToLatestMessage';
};
export declare type ChannelStateReducer<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Reducer<ChannelState<StreamChatGenerics>, ChannelStateReducerAction<StreamChatGenerics>>;
export declare const channelReducer: <StreamChatGenerics extends unknown = any>(state: ChannelState<StreamChatGenerics>, action: ChannelStateReducerAction<StreamChatGenerics>) => ChannelState<StreamChatGenerics> | {
    messages: any[];
    pinnedMessages: any[];
    suppressAutoscroll: boolean;
    threadMessages: any;
    error?: Error | null | undefined;
    hasMore?: boolean | undefined;
    hasMoreNewer?: boolean | undefined;
    highlightedMessageId?: string | undefined;
    loading?: boolean | undefined;
    loadingMore?: boolean | undefined;
    loadingMoreNewer?: boolean | undefined;
    members?: any;
    quotedMessage?: any;
    read?: any;
    thread?: any;
    threadHasMore?: boolean | undefined;
    threadLoadingMore?: boolean | undefined;
    threadSuppressAutoscroll?: boolean | undefined;
    typing?: any;
    watcherCount?: number | undefined;
    watchers?: any;
} | {
    members: any;
    messages: any[];
    pinnedMessages: any[];
    read: any;
    watcherCount: any;
    watchers: any;
    suppressAutoscroll: boolean;
    error?: Error | null | undefined;
    hasMore?: boolean | undefined;
    hasMoreNewer?: boolean | undefined;
    highlightedMessageId?: string | undefined;
    loading?: boolean | undefined;
    loadingMore?: boolean | undefined;
    loadingMoreNewer?: boolean | undefined;
    quotedMessage?: any;
    thread?: any;
    threadHasMore?: boolean | undefined;
    threadLoadingMore?: boolean | undefined;
    threadMessages?: any[] | undefined;
    threadSuppressAutoscroll?: boolean | undefined;
    typing?: any;
} | {
    thread: any;
    threadMessages: any;
    suppressAutoscroll: boolean;
    error?: Error | null | undefined;
    hasMore?: boolean | undefined;
    hasMoreNewer?: boolean | undefined;
    highlightedMessageId?: string | undefined;
    loading?: boolean | undefined;
    loadingMore?: boolean | undefined;
    loadingMoreNewer?: boolean | undefined;
    members?: any;
    messages?: any[] | undefined;
    pinnedMessages?: any[] | undefined;
    quotedMessage?: any;
    read?: any;
    threadHasMore?: boolean | undefined;
    threadLoadingMore?: boolean | undefined;
    threadSuppressAutoscroll?: boolean | undefined;
    typing?: any;
    watcherCount?: number | undefined;
    watchers?: any;
};
export declare const initialState: {
    error: null;
    hasMore: boolean;
    hasMoreNewer: boolean;
    loading: boolean;
    loadingMore: boolean;
    members: {};
    messages: never[];
    pinnedMessages: never[];
    read: {};
    suppressAutoscroll: boolean;
    thread: null;
    threadHasMore: boolean;
    threadLoadingMore: boolean;
    threadMessages: never[];
    threadSuppressAutoscroll: boolean;
    typing: {};
    watcherCount: number;
    watchers: {};
};
//# sourceMappingURL=channelState.d.ts.map