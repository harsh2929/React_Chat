import { CustomMessageActions, MessageContextValue } from '../../context/MessageContext';
import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type CustomMessageActionsType<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    customMessageActions: CustomMessageActions<StreamChatGenerics>;
    message: StreamMessage<StreamChatGenerics>;
};
declare type PropsDrilledToMessageActionsBox = 'getMessageActions' | 'handleDelete' | 'handleEdit' | 'handleFlag' | 'handleMute' | 'handlePin';
export declare type MessageActionsBoxProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<MessageContextValue<StreamChatGenerics>, PropsDrilledToMessageActionsBox> & {
    isUserMuted: () => boolean;
    mine: boolean;
    open: boolean;
};
/**
 * A popup box that displays the available actions on a message, such as edit, delete, pin, etc.
 */
export declare const MessageActionsBox: <StreamChatGenerics extends unknown = any>(props: MessageActionsBoxProps<StreamChatGenerics>) => any;
export {};
//# sourceMappingURL=MessageActionsBox.d.ts.map