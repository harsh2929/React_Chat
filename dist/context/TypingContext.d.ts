import type { ChannelState as StreamChannelState } from 'stream-chat';
import type { DefaultStreamChatGenerics, UnknownType } from '../types/types';
export declare type TypingContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    typing?: StreamChannelState<StreamChatGenerics>['typing'];
};
export declare const TypingContext: any;
export declare const TypingProvider: <StreamChatGenerics extends unknown = any>({ children, value, }: PropsWithChildren<{
    value: TypingContextValue<StreamChatGenerics>;
}>) => any;
export declare const useTypingContext: <StreamChatGenerics extends unknown = any>(componentName?: string) => TypingContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference, so if TypingContext
 * typing is desired while using the HOC withTypingContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withTypingContext: <P extends UnknownType, StreamChatGenerics extends unknown = any>(Component: React.ComponentType<P>) => {
    (props: Omit<P, "typing">): any;
    displayName: any;
};
//# sourceMappingURL=TypingContext.d.ts.map