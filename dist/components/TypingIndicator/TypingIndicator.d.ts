import React from 'react';
import { AvatarProps } from '../Avatar';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type TypingIndicatorProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Custom UI component to display user avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ComponentType<AvatarProps<StreamChatGenerics>>;
    /** Avatar size in pixels, @default 32px */
    avatarSize?: number;
    /** Whether the typing indicator is in a thread */
    threadList?: boolean;
};
export declare const TypingIndicator: <StreamChatGenerics extends unknown = any>(props: TypingIndicatorProps<StreamChatGenerics>) => any;
//# sourceMappingURL=TypingIndicator.d.ts.map