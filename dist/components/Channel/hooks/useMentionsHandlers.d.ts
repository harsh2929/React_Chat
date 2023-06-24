import React from 'react';
import type { UserResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type OnMentionAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (event: React.BaseSyntheticEvent, user?: UserResponse<StreamChatGenerics>) => void;
export declare const useMentionsHandlers: <StreamChatGenerics extends unknown = any>(onMentionsHover?: OnMentionAction<StreamChatGenerics> | undefined, onMentionsClick?: OnMentionAction<StreamChatGenerics> | undefined) => any;
//# sourceMappingURL=useMentionsHandlers.d.ts.map