import React from 'react';
import type { APIErrorResponse, Attachment, ErrorFromResponse, Message, UpdatedMessage, UpdateMessageAPIResponse, UserResponse } from 'stream-chat';
import type { StreamMessage } from './ChannelStateContext';
import type { ChannelStateReducerAction } from '../components/Channel/channelState';
import type { CustomMentionHandler } from '../components/Message/hooks/useMentionsHandler';
import type { DefaultStreamChatGenerics, UnknownType } from '../types/types';
export declare type MessageAttachments<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Array<Attachment<StreamChatGenerics>>;
export declare type MessageToSend<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachments?: MessageAttachments<StreamChatGenerics>;
    error?: ErrorFromResponse<APIErrorResponse>;
    errorStatusCode?: number;
    id?: string;
    mentioned_users?: UserResponse<StreamChatGenerics>[];
    parent?: StreamMessage<StreamChatGenerics>;
    parent_id?: string;
    status?: string;
    text?: string;
};
export declare type RetrySendMessage<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (message: StreamMessage<StreamChatGenerics>) => Promise<void>;
export declare type ChannelActionContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    addNotification: (text: string, type: 'success' | 'error') => void;
    closeThread: (event: React.BaseSyntheticEvent) => void;
    dispatch: React.Dispatch<ChannelStateReducerAction<StreamChatGenerics>>;
    editMessage: (message: UpdatedMessage<StreamChatGenerics>) => Promise<UpdateMessageAPIResponse<StreamChatGenerics> | void>;
    jumpToLatestMessage: () => Promise<void>;
    jumpToMessage: (messageId: string, limit?: number) => Promise<void>;
    loadMore: (limit?: number) => Promise<number>;
    loadMoreNewer: (limit?: number) => Promise<number>;
    loadMoreThread: () => Promise<void>;
    onMentionsClick: CustomMentionHandler<StreamChatGenerics>;
    onMentionsHover: CustomMentionHandler<StreamChatGenerics>;
    openThread: (message: StreamMessage<StreamChatGenerics>, event: React.BaseSyntheticEvent) => void;
    removeMessage: (message: StreamMessage<StreamChatGenerics>) => void;
    retrySendMessage: RetrySendMessage<StreamChatGenerics>;
    sendMessage: (message: MessageToSend<StreamChatGenerics>, customMessageData?: Partial<Message<StreamChatGenerics>>) => Promise<void>;
    setQuotedMessage: React.Dispatch<React.SetStateAction<StreamMessage<StreamChatGenerics> | undefined>>;
    updateMessage: (message: StreamMessage<StreamChatGenerics>) => void;
};
export declare const ChannelActionContext: any;
export declare const ChannelActionProvider: <StreamChatGenerics extends unknown = any>({ children, value, }: PropsWithChildren<{
    value: ChannelActionContextValue<StreamChatGenerics>;
}>) => any;
export declare const useChannelActionContext: <StreamChatGenerics extends unknown = any>(componentName?: string) => ChannelActionContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference, so if ChannelActionContext
 * typing is desired while using the HOC withChannelActionContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withChannelActionContext: <P extends UnknownType, StreamChatGenerics extends unknown = any>(Component: React.ComponentType<P>) => {
    (props: Omit<P, keyof ChannelActionContextValue<StreamChatGenerics>>): any;
    displayName: any;
};
//# sourceMappingURL=ChannelActionContext.d.ts.map