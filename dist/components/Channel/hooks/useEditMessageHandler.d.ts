import type { StreamChat, UpdatedMessage } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
declare type UpdateHandler<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (cid: string, updatedMessage: UpdatedMessage<StreamChatGenerics>) => ReturnType<StreamChat<StreamChatGenerics>['updateMessage']>;
export declare const useEditMessageHandler: <StreamChatGenerics extends unknown = any>(doUpdateMessageRequest?: UpdateHandler<StreamChatGenerics> | undefined) => (updatedMessage: UpdatedMessage<StreamChatGenerics>) => any;
export {};
//# sourceMappingURL=useEditMessageHandler.d.ts.map