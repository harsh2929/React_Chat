import type { ChannelStateContextValue } from '../../../context/ChannelStateContext';
export declare const useCreateChannelStateContext: <StreamChatGenerics extends unknown = any>(value: Omit<ChannelStateContextValue<StreamChatGenerics>, "channelCapabilities"> & {
    channelCapabilitiesArray: string[];
    skipMessageDataMemoization?: boolean | undefined;
}) => ChannelStateContextValue<StreamChatGenerics>;
//# sourceMappingURL=useCreateChannelStateContext.d.ts.map