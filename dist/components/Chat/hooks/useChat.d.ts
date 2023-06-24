import { SupportedTranslations } from '../../../context/TranslationContext';
import { Streami18n } from '../../../i18n';
import type { StreamChat } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type UseChatParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    client: StreamChat<StreamChatGenerics>;
    defaultLanguage?: SupportedTranslations;
    i18nInstance?: Streami18n;
    initialNavOpen?: boolean;
};
export declare const useChat: <StreamChatGenerics extends unknown = any>({ client, defaultLanguage, i18nInstance, initialNavOpen, }: UseChatParams<StreamChatGenerics>) => {
    channel: any;
    closeMobileNav: () => any;
    getAppSettings: () => any;
    latestMessageDatesByChannels: any;
    mutes: any;
    navOpen: any;
    openMobileNav: () => number;
    setActiveChannel: any;
    translators: any;
};
//# sourceMappingURL=useChat.d.ts.map