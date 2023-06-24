import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger } from '../../../types/types';
export declare const useSubmitHandler: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>, numberOfUploads: number) => {
    handleSubmit: (event: React.BaseSyntheticEvent, customMessageData?: any) => Promise<void>;
};
//# sourceMappingURL=useSubmitHandler.d.ts.map