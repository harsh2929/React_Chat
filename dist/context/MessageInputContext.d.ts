import type { TriggerSettings } from '../components/MessageInput/DefaultTriggerProvider';
import type { CooldownTimerState, MessageInputProps } from '../components/MessageInput';
import type { CommandsListState, MentionsListState, MessageInputHookProps, MessageInputState } from '../components/MessageInput/hooks/useMessageInputState';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../types/types';
export declare type MessageInputContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger> = MessageInputState<StreamChatGenerics> & MessageInputHookProps<StreamChatGenerics> & Omit<MessageInputProps<StreamChatGenerics, V>, 'Input'> & CooldownTimerState & {
    autocompleteTriggers?: TriggerSettings<StreamChatGenerics, V>;
} & CommandsListState & MentionsListState;
export declare const MessageInputContext: any;
export declare const MessageInputContextProvider: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>({ children, value, }: PropsWithChildren<{
    value: MessageInputContextValue<StreamChatGenerics, V>;
}>) => any;
export declare const useMessageInputContext: <StreamChatGenerics extends unknown = any, V extends CustomTrigger = CustomTrigger>(componentName?: string) => MessageInputContextValue<StreamChatGenerics, V>;
//# sourceMappingURL=MessageInputContext.d.ts.map