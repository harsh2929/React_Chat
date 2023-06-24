import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
export declare const useEmojiPicker: <StreamChatGenerics extends unknown = any>(state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>, insertText: (textToInsert: string) => void, textareaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>, closeEmojiPickerOnClick?: boolean) => {
    closeEmojiPicker: any;
    emojiPickerRef: any;
    handleEmojiKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
    onSelectEmoji: any;
    openEmojiPicker: React.MouseEventHandler<HTMLButtonElement>;
};
//# sourceMappingURL=useEmojiPicker.d.ts.map