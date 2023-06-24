import { StreamMessage } from '../../../context/ChannelStateContext';
import type { ReactEventHandler } from '../types';
export declare const reactionHandlerWarning = "Reaction handler was called, but it is missing one of its required arguments.\nMake sure the ChannelAction and ChannelState contexts are properly set and the hook is initialized with a valid message.";
export declare const useReactionHandler: <StreamChatGenerics extends unknown = any>(message?: any) => (reactionType: string, event?: any) => Promise<void>;
export declare const useReactionClick: <StreamChatGenerics extends unknown = any>(message?: any, reactionSelectorRef?: any, messageWrapperRef?: any, closeReactionSelectorOnClick?: boolean) => {
    isReactionEnabled: boolean;
    onReactionListClick: ReactEventHandler;
    showDetailedReactions: any;
};
//# sourceMappingURL=useReactionHandler.d.ts.map