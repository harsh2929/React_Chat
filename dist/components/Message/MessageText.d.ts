import type { StreamMessage } from '../../context';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type MessageTextProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    customInnerClass?: string;
    customWrapperClass?: string;
    message?: StreamMessage<StreamChatGenerics>;
    theme?: string;
};
export declare const MessageText: <StreamChatGenerics extends unknown = any>(props: MessageTextProps<StreamChatGenerics>) => any;
//# sourceMappingURL=MessageText.d.ts.map