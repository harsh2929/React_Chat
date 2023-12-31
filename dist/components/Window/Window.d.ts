import { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type WindowProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** show or hide the window when a thread is active */
    hideOnThread?: boolean;
    /** optional prop to manually trigger the opening of a thread*/
    thread?: StreamMessage<StreamChatGenerics>;
};
/**
 * A UI component for conditionally displaying a Thread or Channel
 */
export declare const Window: <StreamChatGenerics extends unknown = any>(props: PropsWithChildren<WindowProps<StreamChatGenerics>>) => any;
//# sourceMappingURL=Window.d.ts.map