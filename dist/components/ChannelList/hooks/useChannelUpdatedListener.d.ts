import type { Channel, Event } from 'stream-chat';
export declare const useChannelUpdatedListener: <StreamChatGenerics extends unknown = any>(setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[]>>, customHandler?: ((setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[]>>, event: Event<StreamChatGenerics>) => void) | undefined, forceUpdate?: () => void) => void;
//# sourceMappingURL=useChannelUpdatedListener.d.ts.map