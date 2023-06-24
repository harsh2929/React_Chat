import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const QuotedMessagePreviewHeader: <StreamChatGenerics extends unknown = any>() => any;
export declare type QuotedMessagePreviewProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    quotedMessage: StreamMessage<StreamChatGenerics>;
};
export declare const QuotedMessagePreview: <StreamChatGenerics extends unknown = any>({ quotedMessage, }: QuotedMessagePreviewProps<StreamChatGenerics>) => any;
//# sourceMappingURL=QuotedMessagePreview.d.ts.map