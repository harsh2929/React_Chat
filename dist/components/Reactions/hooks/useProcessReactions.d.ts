import type { EmojiContextValue } from '../../../context/EmojiContext';
import type { ReactionsListProps } from '../ReactionsList';
declare type SharedReactionListProps = 'additionalEmojiProps' | 'own_reactions' | 'reaction_counts' | 'reactionOptions' | 'reactions';
declare type UseProcessReactionsParams = Pick<ReactionsListProps, SharedReactionListProps> & Pick<EmojiContextValue, 'emojiConfig'>;
export declare const useProcessReactions: <StreamChatGenerics extends unknown = any>(params: UseProcessReactionsParams) => {
    additionalEmojiProps: any;
    aggregatedUserNamesByType: any;
    emojiData: any;
    getEmojiByReactionType: any;
    iHaveReactedWithReaction: any;
    latestReactions: any;
    latestReactionTypes: any;
    reactionCounts: any;
    supportedReactionsArePresent: any;
    totalReactionCount: any;
};
export {};
//# sourceMappingURL=useProcessReactions.d.ts.map