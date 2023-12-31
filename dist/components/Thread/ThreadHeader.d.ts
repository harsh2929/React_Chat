import React from 'react';
import { ChannelPreviewInfoParams } from '../ChannelPreview/hooks/useChannelPreviewInfo';
import { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ThreadHeaderProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Callback for closing the thread */
    closeThread: (event: React.BaseSyntheticEvent) => void;
    /** The thread parent message */
    thread: StreamMessage<StreamChatGenerics>;
};
export declare const ThreadHeader: <StreamChatGenerics extends unknown = any>(props: ThreadHeaderProps<StreamChatGenerics> & Pick<ChannelPreviewInfoParams<StreamChatGenerics>, "overrideImage" | "overrideTitle">) => any;
//# sourceMappingURL=ThreadHeader.d.ts.map