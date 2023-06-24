import React from 'react';
import type { Message } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const EmojiIconLarge: () => any;
export declare const EmojiIconSmall: () => any;
export declare const EmojiPickerIcon: () => any;
export declare const FileUploadIcon: () => any;
export declare const FileUploadIconFlat: () => any;
export declare const LoadingIndicatorIcon: ({ size }: {
    size?: number | undefined;
}) => any;
export declare const UploadIcon: () => any;
export declare const CloseIcon: () => any;
export declare const RetryIcon: () => any;
export declare const DownloadIcon: () => any;
export declare const SendIconV1: () => any;
export declare const SendIconV2: () => any;
export declare type SendButtonProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    sendMessage: (event: React.BaseSyntheticEvent, customMessageData?: Partial<Message<StreamChatGenerics>>) => void;
} & React.ComponentProps<'button'>;
export declare const SendButton: <StreamChatGenerics extends unknown = any>({ sendMessage, ...rest }: any) => any;
//# sourceMappingURL=icons.d.ts.map