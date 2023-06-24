import React from 'react';
import { TooltipUsernameMapper } from './utils';
import { AvatarProps } from '../Avatar';
export declare type MessageStatusProps = {
    Avatar?: React.ComponentType<AvatarProps>;
    messageType?: string;
    tooltipUserNameMapper?: TooltipUsernameMapper;
};
export declare const MessageStatus: <StreamChatGenerics extends unknown = any>(props: MessageStatusProps) => any;
//# sourceMappingURL=MessageStatus.d.ts.map