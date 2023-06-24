import React from 'react';
import type { UserResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from './types/types';
export declare const isOnlyEmojis: (text?: string) => boolean;
export declare const matchMarkdownLinks: (message: string) => (string | null)[];
export declare const messageCodeBlocks: (message: string) => RegExpMatchArray;
export declare const markDownRenderers: {
    [nodeType: string]: React.ElementType;
};
export declare const emojiMarkdownPlugin: () => <T extends unknown>(markdownAST: T) => T;
export declare const mentionsMarkdownPlugin: <StreamChatGenerics extends unknown = any>(mentioned_users: UserResponse<StreamChatGenerics>[]) => () => <T extends unknown>(markdownAST: T) => T;
export declare type MentionProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    mentioned_user: UserResponse<StreamChatGenerics>;
};
export declare type RenderTextOptions = {
    customMarkDownRenderers?: {
        [nodeType: string]: React.ElementType;
    };
};
export declare const renderText: <StreamChatGenerics extends unknown = any>(text?: string, mentioned_users?: UserResponse<StreamChatGenerics>[] | undefined, options?: RenderTextOptions) => any;
export declare function escapeRegExp(text: string): string;
/**
 * @deprecated will be removed in the next major release
 */
export declare const generateRandomId: any;
export declare const getWholeChar: (str: string, i: number) => string;
//# sourceMappingURL=utils.d.ts.map