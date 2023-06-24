import type { Channel } from 'stream-chat';
export declare const usePaginatedChannels: <StreamChatGenerics extends unknown = any>(client: StreamChat<StreamChatGenerics>, filters: ChannelFilters<StreamChatGenerics>, sort: ChannelSort<StreamChatGenerics>, options: ChannelOptions, activeChannelHandler: (channels: Channel<StreamChatGenerics>[], setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[]>>) => void) => {
    channels: any;
    hasNextPage: any;
    loadNextPage: () => void;
    setChannels: any;
};
//# sourceMappingURL=usePaginatedChannels.d.ts.map