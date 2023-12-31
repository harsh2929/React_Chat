import React from 'react';
import { AvatarProps } from '../Avatar';
import { ReactionEmoji } from '../Channel/emojiData';
import type { NimbleEmojiProps } from 'emoji-mart';
import type { ReactionResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ReactionSelectorProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Additional props to be passed to the [NimbleEmoji](https://github.com/missive/emoji-mart/blob/master/src/components/emoji/nimble-emoji.js) component from `emoji-mart` */
    additionalEmojiProps?: Partial<NimbleEmojiProps>;
    /** Custom UI component to display user avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ElementType<AvatarProps>;
    /** If true, shows the user's avatar with the reaction */
    detailedView?: boolean;
    /** Function that adds/removes a reaction on a message (overrides the function stored in `MessageContext`) */
    handleReaction?: (reactionType: string, event: React.BaseSyntheticEvent) => Promise<void>;
    /** An array of the reaction objects to display in the list */
    latest_reactions?: ReactionResponse<StreamChatGenerics>[];
    /** An array of the own reaction objects to distinguish own reactions visually */
    own_reactions?: ReactionResponse<StreamChatGenerics>[];
    /** An object that keeps track of the count of each type of reaction on a message */
    reaction_counts?: {
        [key: string]: number;
    };
    /** A list of the currently supported reactions on a message */
    reactionOptions?: ReactionEmoji[];
    /** If true, adds a CSS class that reverses the horizontal positioning of the selector */
    reverse?: boolean;
};
/**
 * Component that allows a user to select a reaction.
 */
export declare const ReactionSelector: any;
//# sourceMappingURL=ReactionSelector.d.ts.map