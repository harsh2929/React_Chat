import type { Channel, ChannelConfigWithInfo, MessageResponse, Mute, ChannelState as StreamChannelState } from 'stream-chat';
import type { DefaultStreamChatGenerics, GiphyVersions, ImageAttachmentSizeHandler, UnknownType, VideoAttachmentSizeHandler } from '../types/types';
export declare type ChannelNotifications = Array<{
    id: string;
    text: string;
    type: 'success' | 'error';
}>;
export declare type StreamMessage<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = ReturnType<StreamChannelState<StreamChatGenerics>['formatMessage']> | MessageResponse<StreamChatGenerics>;
export declare type ChannelState<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    suppressAutoscroll: boolean;
    error?: Error | null;
    hasMore?: boolean;
    hasMoreNewer?: boolean;
    highlightedMessageId?: string;
    loading?: boolean;
    loadingMore?: boolean;
    loadingMoreNewer?: boolean;
    members?: StreamChannelState<StreamChatGenerics>['members'];
    messages?: StreamMessage<StreamChatGenerics>[];
    pinnedMessages?: StreamMessage<StreamChatGenerics>[];
    quotedMessage?: StreamMessage<StreamChatGenerics>;
    read?: StreamChannelState<StreamChatGenerics>['read'];
    thread?: StreamMessage<StreamChatGenerics> | null;
    threadHasMore?: boolean;
    threadLoadingMore?: boolean;
    threadMessages?: StreamMessage<StreamChatGenerics>[];
    threadSuppressAutoscroll?: boolean;
    typing?: StreamChannelState<StreamChatGenerics>['typing'];
    watcherCount?: number;
    watchers?: StreamChannelState<StreamChatGenerics>['watchers'];
};
export declare type ChannelStateContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<ChannelState<StreamChatGenerics>, 'typing'> & {
    channel: Channel<StreamChatGenerics>;
    channelCapabilities: Record<string, boolean>;
    channelConfig: ChannelConfigWithInfo<StreamChatGenerics> | undefined;
    imageAttachmentSizeHandler: ImageAttachmentSizeHandler;
    multipleUploads: boolean;
    notifications: ChannelNotifications;
    shouldGenerateVideoThumbnail: boolean;
    videoAttachmentSizeHandler: VideoAttachmentSizeHandler;
    acceptedFiles?: string[];
    dragAndDropWindow?: boolean;
    giphyVersion?: GiphyVersions;
    maxNumberOfFiles?: number;
    mutes?: Array<Mute<StreamChatGenerics>>;
    watcher_count?: number;
};
export declare const ChannelStateContext: any;
export declare const ChannelStateProvider: <StreamChatGenerics extends unknown = any>({ children, value, }: PropsWithChildren<{
    value: ChannelStateContextValue<StreamChatGenerics>;
}>) => any;
export declare const useChannelStateContext: <StreamChatGenerics extends unknown = any>(componentName?: string) => ChannelStateContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference, so if ChannelStateContext
 * typing is desired while using the HOC withChannelStateContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withChannelStateContext: <P extends UnknownType, StreamChatGenerics extends unknown = any>(Component: React.ComponentType<P>) => {
    (props: Omit<P, "error" | "members" | "read" | "watchers" | "suppressAutoscroll" | "hasMore" | "hasMoreNewer" | "highlightedMessageId" | "loading" | "loadingMore" | "loadingMoreNewer" | "messages" | "pinnedMessages" | "quotedMessage" | "thread" | "threadHasMore" | "threadLoadingMore" | "threadMessages" | "threadSuppressAutoscroll" | "watcherCount" | "channel" | "channelCapabilities" | "channelConfig" | "imageAttachmentSizeHandler" | "multipleUploads" | "notifications" | "shouldGenerateVideoThumbnail" | "videoAttachmentSizeHandler" | "acceptedFiles" | "dragAndDropWindow" | "giphyVersion" | "maxNumberOfFiles" | "mutes" | "watcher_count">): any;
    displayName: any;
};
//# sourceMappingURL=ChannelStateContext.d.ts.map