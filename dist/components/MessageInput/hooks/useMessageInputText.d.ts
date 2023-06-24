import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger } from '../../../types/types';
export declare const useMessageInputText: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>) => {
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    insertText: any;
    textareaRef: any;
};
//# sourceMappingURL=useMessageInputText.d.ts.map