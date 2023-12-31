import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type FileAttachmentProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachment: Attachment<StreamChatGenerics>;
};
export declare const FileAttachment: <StreamChatGenerics extends unknown = any>({ attachment, }: FileAttachmentProps<StreamChatGenerics>) => any;
//# sourceMappingURL=FileAttachment.d.ts.map