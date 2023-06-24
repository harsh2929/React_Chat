import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type ChannelPreviewInfoParams<StreamChatGenerics extends DefaultStreamChatGenerics> = {
    channel: Channel<StreamChatGenerics>;
    /** Manually set the image to render, defaults to the Channel image */
    overrideImage?: string;
    /** Set title manually */
    overrideTitle?: string;
};
export declare const useChannelPreviewInfo: <StreamChatGenerics extends unknown = any>(props: ChannelPreviewInfoParams<StreamChatGenerics>) => {
    displayImage: any;
    displayTitle: any;
};
//# sourceMappingURL=useChannelPreviewInfo.d.ts.map