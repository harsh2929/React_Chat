import type { MessageInputProps } from '../MessageInput';
import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { CustomTrigger } from '../../../types/types';
export declare const useAttachments: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>, textareaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>) => {
    maxFilesLeft: number;
    numberOfUploads: number;
    removeFile: any;
    removeImage: any;
    uploadFile: any;
    uploadImage: any;
    uploadNewFiles: any;
};
//# sourceMappingURL=useAttachments.d.ts.map