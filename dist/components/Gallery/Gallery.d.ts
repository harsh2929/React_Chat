import { CSSProperties, MutableRefObject } from 'react';
import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type GalleryProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    images: (({
        image_url?: string | undefined;
        thumb_url?: string | undefined;
    } | Attachment<StreamChatGenerics>) & {
        previewUrl?: string;
        style?: CSSProperties;
    })[];
    innerRefs?: MutableRefObject<(HTMLElement | null)[]>;
};
/**
 * Displays images in a simple responsive grid with a light box to view the images.
 */
export declare const Gallery: <StreamChatGenerics extends unknown = any>(props: GalleryProps<StreamChatGenerics>) => any;
//# sourceMappingURL=Gallery.d.ts.map