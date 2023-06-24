import { StreamMessage } from '../../../context/ChannelStateContext';
export declare const useUserRole: <StreamChatGenerics extends unknown = any>(message: any, onlySenderCanEdit?: boolean, disableQuotedMessages?: boolean) => {
    canDelete: boolean;
    canEdit: boolean;
    canFlag: boolean;
    canMute: boolean;
    canQuote: boolean;
    canReact: boolean;
    canReply: boolean;
    isAdmin: boolean;
    isModerator: boolean;
    isMyMessage: boolean;
    isOwner: boolean;
};
//# sourceMappingURL=useUserRole.d.ts.map