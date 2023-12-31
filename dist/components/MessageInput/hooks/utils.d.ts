import type { ImageUpload } from 'react-file-utils';
import type { UserResponse } from 'stream-chat';
import type { ChannelActionContextValue } from '../../../context/ChannelActionContext';
import type { ChatContextValue } from '../../../context/ChatContext';
import type { TranslationContextValue } from '../../../context/TranslationContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const accentsMap: {
    [key: string]: string;
};
export declare const removeDiacritics: (text?: string) => string;
export declare const calculateLevenshtein: (query: string, name: string) => number;
export declare type SearchLocalUserParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    ownUserId: string | undefined;
    query: string;
    text: string;
    users: UserResponse<StreamChatGenerics>[];
    useMentionsTransliteration?: boolean;
};
export declare const searchLocalUsers: <StreamChatGenerics extends unknown = any>(params: SearchLocalUserParams<StreamChatGenerics>) => UserResponse<StreamChatGenerics>[];
declare type CheckUploadPermissionsParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    addNotification: ChannelActionContextValue<StreamChatGenerics>['addNotification'];
    file: ImageUpload['file'];
    getAppSettings: ChatContextValue<StreamChatGenerics>['getAppSettings'];
    t: TranslationContextValue['t'];
    uploadType: 'image' | 'file';
};
export declare const checkUploadPermissions: <StreamChatGenerics extends unknown = any>(params: CheckUploadPermissionsParams<StreamChatGenerics>) => Promise<boolean>;
export {};
//# sourceMappingURL=utils.d.ts.map