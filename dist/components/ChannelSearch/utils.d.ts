import type { Channel, UserResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ChannelOrUserResponse<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Channel<StreamChatGenerics> | UserResponse<StreamChatGenerics>;
export declare const isChannel: <StreamChatGenerics extends unknown = any>(output: any) => output is Channel<StreamChatGenerics>;
//# sourceMappingURL=utils.d.ts.map