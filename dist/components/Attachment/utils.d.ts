import { ReactNode } from 'react';
import type { ATTACHMENT_GROUPS_ORDER } from './Attachment';
import type { Attachment } from 'stream-chat';
import type { AttachmentProps } from './Attachment';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const SUPPORTED_VIDEO_FORMATS: string[];
export declare type AttachmentComponentType = typeof ATTACHMENT_GROUPS_ORDER[number];
export declare type GroupedRenderedAttachment = Record<AttachmentComponentType, ReactNode[]>;
export declare type GalleryAttachment<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    images: Attachment<StreamChatGenerics>[];
    type: 'gallery';
};
export declare type AttachmentContainerProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachment: Attachment<StreamChatGenerics> | GalleryAttachment<StreamChatGenerics>;
    componentType: AttachmentComponentType;
};
export declare type RenderAttachmentProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<AttachmentProps<StreamChatGenerics>, 'attachments'> & {
    attachment: Attachment<StreamChatGenerics>;
};
export declare type RenderGalleryProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<AttachmentProps<StreamChatGenerics>, 'attachments'> & {
    attachment: GalleryAttachment<StreamChatGenerics>;
};
export declare const isScrapedContent: <StreamChatGenerics extends unknown = any>(attachment: Attachment<StreamChatGenerics>) => any;
export declare const isUploadedImage: <StreamChatGenerics extends unknown = any>(attachment: Attachment<StreamChatGenerics>) => boolean;
export declare const isGalleryAttachmentType: <StreamChatGenerics extends unknown = any>(output: any) => output is GalleryAttachment<StreamChatGenerics>;
export declare const isAudioAttachment: <StreamChatGenerics extends unknown = any>(attachment: Attachment<StreamChatGenerics>) => boolean;
export declare const isFileAttachment: <StreamChatGenerics extends unknown = any>(attachment: Attachment<StreamChatGenerics>) => any;
export declare const isMediaAttachment: <StreamChatGenerics extends unknown = any>(attachment: Attachment<StreamChatGenerics>) => any;
export declare const isSvgAttachment: (attachment: Attachment) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AttachmentWithinContainer`
 */
export declare const renderAttachmentWithinContainer: <StreamChatGenerics extends unknown = any>(props: PropsWithChildren<AttachmentContainerProps<StreamChatGenerics>>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AttachmentActionsContainer`
 */
export declare const renderAttachmentActions: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/GalleryContainer`
 */
export declare const renderGallery: <StreamChatGenerics extends unknown = any>(props: RenderGalleryProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/ImageContainer`
 */
export declare const renderImage: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/CardContainer`
 */
export declare const renderCard: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/FileContainer`
 */
export declare const renderFile: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AudioContainer`
 */
export declare const renderAudio: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/MediaContainer`
 */
export declare const renderMedia: <StreamChatGenerics extends unknown = any>(props: RenderAttachmentProps<StreamChatGenerics>) => any;
//# sourceMappingURL=utils.d.ts.map