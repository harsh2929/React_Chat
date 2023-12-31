import React from 'react';
import type { Data as EmojiMartData, EmojiSheetSize, NimbleEmojiIndex, NimbleEmojiProps, NimblePickerProps } from 'emoji-mart';
import type { UnknownType } from '../types/types';
export declare type CommonEmoji = {
    custom: boolean;
    emoticons: string[] | [];
    short_names: string[] | [];
};
export declare type EmojiSetDef = {
    imageUrl: string;
    sheetColumns: number;
    sheetRows: number;
    sheetSize: EmojiSheetSize;
    spriteUrl: string;
};
export declare type MinimalEmoji = CommonEmoji & EmojiSetDef & {
    colons: string;
    id: string;
    name: string;
    sheet_x: number;
    sheet_y: number;
};
export declare type EmojiConfig = {
    commonEmoji: CommonEmoji;
    defaultMinimalEmojis: MinimalEmoji[];
    emojiData: EmojiMartData;
    emojiSetDef: EmojiSetDef;
};
export declare type EmojiContextValue = {
    emojiConfig: EmojiConfig;
    Emoji?: React.ComponentType<NimbleEmojiProps>;
    EmojiIndex?: NimbleEmojiIndex;
    EmojiPicker?: React.ComponentType<NimblePickerProps>;
};
export declare const EmojiContext: any;
export declare const EmojiProvider: ({ children, value, }: PropsWithChildren<{
    value: EmojiContextValue;
}>) => any;
export declare const useEmojiContext: (componentName?: string) => Required<EmojiContextValue>;
/**
 * Typescript currently does not support partial inference, so if EmojiContext
 * typing is desired while using the HOC withEmojiContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withEmojiContext: <P extends UnknownType>(Component: React.ComponentType<P>) => {
    (props: Omit<P, keyof EmojiContextValue>): any;
    displayName: any;
};
//# sourceMappingURL=EmojiContext.d.ts.map