import type { Mute, UserResponse } from 'stream-chat';
import type { PinPermissions } from './hooks';
import type { MessageProps } from './types';
import type { MessageContextValue, StreamMessage } from '../../context';
import type { DefaultStreamChatGenerics } from '../../types/types';
/**
 * Following function validates a function which returns notification message.
 * It validates if the first parameter is function and also if return value of function is string or no.
 */
export declare const validateAndGetMessage: <T extends unknown[]>(func: (...args: T) => unknown, args: T) => string | null;
/**
 * Tell if the owner of the current message is muted
 */
export declare const isUserMuted: <StreamChatGenerics extends unknown = any>(message: any, mutes?: Mute<StreamChatGenerics>[] | undefined) => boolean;
export declare const MESSAGE_ACTIONS: {
    delete: string;
    edit: string;
    flag: string;
    mute: string;
    pin: string;
    quote: string;
    react: string;
    reply: string;
};
export declare type MessageActionsArray<T extends string = string> = Array<'delete' | 'edit' | 'flag' | 'mute' | 'pin' | 'quote' | 'react' | 'reply' | T>;
export declare const defaultPinPermissions: PinPermissions;
export declare type Capabilities = {
    canDelete?: boolean;
    canEdit?: boolean;
    canFlag?: boolean;
    canMute?: boolean;
    canPin?: boolean;
    canQuote?: boolean;
    canReact?: boolean;
    canReply?: boolean;
};
export declare const getMessageActions: (actions: MessageActionsArray | boolean, { canDelete, canEdit, canFlag, canMute, canPin, canQuote, canReact, canReply }: Capabilities) => MessageActionsArray<string>;
export declare const showMessageActionsBox: (actions: MessageActionsArray<string>, inThread?: boolean | undefined) => boolean;
export declare const areMessagePropsEqual: <StreamChatGenerics extends unknown = any>(prevProps: MessageProps<StreamChatGenerics, import("../../types/types").CustomTrigger> & {
    mutes?: Mute<StreamChatGenerics>[] | undefined;
    showDetailedReactions?: boolean | undefined;
}, nextProps: MessageProps<StreamChatGenerics, import("../../types/types").CustomTrigger> & {
    mutes?: Mute<StreamChatGenerics>[] | undefined;
    showDetailedReactions?: boolean | undefined;
}) => boolean;
export declare const areMessageUIPropsEqual: <StreamChatGenerics extends unknown = any>(prevProps: MessageContextValue<StreamChatGenerics> & {
    showDetailedReactions?: boolean | undefined;
}, nextProps: MessageContextValue<StreamChatGenerics> & {
    showDetailedReactions?: boolean | undefined;
}) => boolean;
export declare const messageHasReactions: <StreamChatGenerics extends unknown = any>(message?: any) => boolean;
export declare const messageHasAttachments: <StreamChatGenerics extends unknown = any>(message?: any) => boolean;
export declare const getImages: <StreamChatGenerics extends unknown = any>(message?: any) => any;
export declare const getNonImageAttachments: <StreamChatGenerics extends unknown = any>(message?: any) => any;
export interface TooltipUsernameMapper {
    <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(user: UserResponse<StreamChatGenerics>): string;
}
/**
 * Default Tooltip Username mapper implementation.
 *
 * @param user the user.
 */
export declare const mapToUserNameOrId: TooltipUsernameMapper;
export declare const getReadByTooltipText: <StreamChatGenerics extends unknown = any>(users: UserResponse<StreamChatGenerics>[], t: TFunction, client: StreamChat<StreamChatGenerics>, tooltipUserNameMapper: TooltipUsernameMapper) => string;
//# sourceMappingURL=utils.d.ts.map