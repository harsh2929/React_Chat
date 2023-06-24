import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type UseScrollLocationLogicParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    hasMoreNewer: boolean;
    listElement: HTMLDivElement | null;
    suppressAutoscroll: boolean;
    currentUserId?: string;
    messages?: StreamMessage<StreamChatGenerics>[];
    scrolledUpThreshold?: number;
};
export declare const useScrollLocationLogic: <StreamChatGenerics extends unknown = any>(params: UseScrollLocationLogicParams<StreamChatGenerics>) => {
    hasNewMessages: any;
    isMessageListScrolledToBottom: any;
    onScroll: any;
    scrollToBottom: any;
    wrapperRect: any;
};
//# sourceMappingURL=useScrollLocationLogic.d.ts.map