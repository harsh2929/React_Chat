import { AttachmentContainerProps, RenderAttachmentProps, RenderGalleryProps } from './utils';
export declare const AttachmentWithinContainer: <StreamChatGenerics extends unknown = any>({ attachment, children, componentType, }: PropsWithChildren<AttachmentContainerProps<StreamChatGenerics>>) => any;
export declare const AttachmentActionsContainer: <StreamChatGenerics extends unknown = any>({ actionHandler, attachment, AttachmentActions, }: RenderAttachmentProps<StreamChatGenerics>) => any;
export declare const GalleryContainer: <StreamChatGenerics extends unknown = any>({ attachment, Gallery, }: RenderGalleryProps<StreamChatGenerics>) => any;
export declare const ImageContainer: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
export declare const CardContainer: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
export declare const FileContainer: <StreamChatGenerics extends unknown = any>({ attachment, File, }: RenderAttachmentProps<StreamChatGenerics>) => any;
export declare const AudioContainer: <StreamChatGenerics extends unknown = any>({ attachment, Audio, }: RenderAttachmentProps<StreamChatGenerics>) => any;
export declare const MediaContainer: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
//# sourceMappingURL=AttachmentContainer.d.ts.map