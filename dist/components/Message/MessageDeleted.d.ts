import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type MessageDeletedProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    message: StreamMessage<StreamChatGenerics>;
};
export declare const MessageDeleted: <StreamChatGenerics extends unknown = any>(props: MessageDeletedProps<StreamChatGenerics>) => any;
//# sourceMappingURL=MessageDeleted.d.ts.map