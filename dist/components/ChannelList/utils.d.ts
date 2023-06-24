import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const getChannel: <StreamChatGenerics extends unknown = any>(client: StreamChat<StreamChatGenerics>, type: string, id: string) => Promise<any>;
export declare const MAX_QUERY_CHANNELS_LIMIT = 30;
declare type MoveChannelUpParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    channels: Array<Channel<StreamChatGenerics>>;
    cid: string;
    activeChannel?: Channel<StreamChatGenerics>;
};
export declare const moveChannelUp: <StreamChatGenerics extends unknown = any>({ activeChannel, channels, cid, }: MoveChannelUpParams<StreamChatGenerics>) => any;
export {};
//# sourceMappingURL=utils.d.ts.map