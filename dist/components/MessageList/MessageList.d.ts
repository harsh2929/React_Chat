import React from 'react';
import { ChannelActionContextValue } from '../../context/ChannelActionContext';
import { InfiniteScrollProps } from '../InfiniteScrollPaginator/InfiniteScroll';
import type { GroupStyle } from './utils';
import type { MessageProps } from '../Message/types';
import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
declare type PropsDrilledToMessage = 'additionalMessageInputProps' | 'closeReactionSelectorOnClick' | 'customMessageActions' | 'disableQuotedMessages' | 'formatDate' | 'getDeleteMessageErrorNotification' | 'getFlagMessageErrorNotification' | 'getFlagMessageSuccessNotification' | 'getMuteUserErrorNotification' | 'getMuteUserSuccessNotification' | 'getPinMessageErrorNotification' | 'Message' | 'messageActions' | 'onlySenderCanEdit' | 'onMentionsClick' | 'onMentionsHover' | 'onUserClick' | 'onUserHover' | 'openThread' | 'pinPermissions' | 'renderText' | 'retrySendMessage' | 'unsafeHTML';
export declare type MessageListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Partial<Pick<MessageProps<StreamChatGenerics>, PropsDrilledToMessage>> & {
    /** Disables the injection of date separator components in MessageList, defaults to `false` */
    disableDateSeparator?: boolean;
    /** Callback function to set group styles for each message */
    groupStyles?: (message: StreamMessage<StreamChatGenerics>, previousMessage: StreamMessage<StreamChatGenerics>, nextMessage: StreamMessage<StreamChatGenerics>, noGroupByUser: boolean) => GroupStyle;
    /** Whether the list has more items to load */
    hasMore?: boolean;
    /** Element to be rendered at the top of the thread message list. By default, these are the Message and ThreadStart components */
    head?: React.ReactElement;
    /** Position to render HeaderComponent */
    headerPosition?: number;
    /** Hides the MessageDeleted components from the list, defaults to `false` */
    hideDeletedMessages?: boolean;
    /** Hides the DateSeparator component when new messages are received in a channel that's watched but not active, defaults to false */
    hideNewMessageSeparator?: boolean;
    /** Overrides the default props passed to [InfiniteScroll](https://github.com/GetStream/stream-chat-react/blob/master/src/components/InfiniteScrollPaginator/InfiniteScroll.tsx) */
    internalInfiniteScrollProps?: InfiniteScrollProps;
    /** Function called when latest messages should be loaded, after the list has jumped at an earlier message set */
    jumpToLatestMessage?: () => Promise<void>;
    /** Whether or not the list is currently loading more items */
    loadingMore?: boolean;
    /** Whether or not the list is currently loading newer items */
    loadingMoreNewer?: boolean;
    /** Function called when more messages are to be loaded, defaults to function stored in [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/) */
    loadMore?: ChannelActionContextValue['loadMore'] | (() => Promise<void>);
    /** Function called when newer messages are to be loaded, defaults to function stored in [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/) */
    loadMoreNewer?: ChannelActionContextValue['loadMoreNewer'] | (() => Promise<void>);
    /** The limit to use when paginating messages */
    messageLimit?: number;
    /** The messages to render in the list, defaults to messages stored in [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/) */
    messages?: StreamMessage<StreamChatGenerics>[];
    /** If true, turns off message UI grouping by user */
    noGroupByUser?: boolean;
    /** If true, `readBy` data supplied to the `Message` components will include all user read states per sent message */
    returnAllReadData?: boolean;
    /** The pixel threshold to determine whether or not the user is scrolled up in the list, defaults to 200px */
    scrolledUpThreshold?: number;
    /** If true, indicates the message list is a thread  */
    threadList?: boolean;
};
/**
 * The MessageList component renders a list of Messages.
 * It is a consumer of the following contexts:
 * - [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/)
 * - [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/)
 * - [ComponentContext](https://getstream.io/chat/docs/sdk/react/contexts/component_context/)
 * - [TypingContext](https://getstream.io/chat/docs/sdk/react/contexts/typing_context/)
 */
export declare const MessageList: <StreamChatGenerics extends unknown = any>(props: MessageListProps<StreamChatGenerics>) => any;
export {};
//# sourceMappingURL=MessageList.d.ts.map