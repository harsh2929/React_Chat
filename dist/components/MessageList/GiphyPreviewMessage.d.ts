import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type GiphyPreviewMessageProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    message: StreamMessage<StreamChatGenerics>;
};
export declare const GiphyPreviewMessage: <StreamChatGenerics extends unknown = any>(props: GiphyPreviewMessageProps<StreamChatGenerics>) => any;
//# sourceMappingURL=GiphyPreviewMessage.d.ts.map