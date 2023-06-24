import { GroupStyle } from '../utils';
import type { Channel } from 'stream-chat';
import type { StreamMessage } from '../../../context/ChannelStateContext';
export declare const useEnrichedMessages: <StreamChatGenerics extends unknown = any>(args: {
    channel: Channel<StreamChatGenerics>;
    disableDateSeparator: boolean;
    hideDeletedMessages: boolean;
    hideNewMessageSeparator: boolean;
    messages: any[];
    noGroupByUser: boolean;
    groupStyles?: ((message: any, previousMessage: any, nextMessage: any, noGroupByUser: boolean) => GroupStyle) | undefined;
    headerPosition?: number | undefined;
}) => {
    messageGroupStyles: any;
    messages: any[];
};
//# sourceMappingURL=useEnrichedMessages.d.ts.map