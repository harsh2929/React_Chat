import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare function useNewMessageNotification<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(messages: StreamMessage<StreamChatGenerics>[], currentUserId: string | undefined, hasMoreNewer?: boolean): {
    atBottom: any;
    isMessageListScrolledToBottom: any;
    newMessagesNotification: any;
    setIsMessageListScrolledToBottom: any;
    setNewMessagesNotification: any;
};
//# sourceMappingURL=useNewMessageNotification.d.ts.map