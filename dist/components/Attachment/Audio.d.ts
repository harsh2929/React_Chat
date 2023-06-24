import React from 'react';
import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type AudioProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    og: Attachment<StreamChatGenerics>;
};
declare type PlayButtonProps = {
    isPlaying: boolean;
    onClick: () => void;
};
export declare const PlayButton: ({ isPlaying, onClick }: PlayButtonProps) => any;
declare type ProgressBarProps = {
    progress: number;
} & Pick<React.ComponentProps<'div'>, 'onClick'>;
export declare const ProgressBar: ({ onClick, progress }: ProgressBarProps) => any;
/**
 * Audio attachment with play/pause button and progress bar
 */
export declare const Audio: <StreamChatGenerics extends unknown = any>(props: AudioProps<StreamChatGenerics>) => any;
export {};
//# sourceMappingURL=Audio.d.ts.map