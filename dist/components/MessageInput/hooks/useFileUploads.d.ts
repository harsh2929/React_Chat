import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger } from '../../../types/types';
export declare const useFileUploads: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>) => {
    removeFile: any;
    uploadFile: any;
};
//# sourceMappingURL=useFileUploads.d.ts.map