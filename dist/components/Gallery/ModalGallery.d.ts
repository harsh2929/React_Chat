import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ModalGalleryProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** The images for the Carousel component */
    images: Attachment<StreamChatGenerics>[];
    /** The index for the component */
    index?: number;
};
export declare const ModalGallery: <StreamChatGenerics extends unknown = any>(props: ModalGalleryProps<StreamChatGenerics>) => any;
//# sourceMappingURL=ModalGallery.d.ts.map