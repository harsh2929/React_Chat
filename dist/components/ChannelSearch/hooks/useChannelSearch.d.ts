import React from 'react';
import { ChannelOrUserResponse } from '../utils';
import type { ChannelFilters, ChannelOptions, ChannelSort, UserFilters, UserOptions, UserSort } from 'stream-chat';
import type { Channel } from 'stream-chat';
import type { SearchBarController } from '../SearchBar';
import type { SearchInputController } from '../SearchInput';
import type { SearchResultsController } from '../SearchResults';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type ChannelSearchFunctionParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setResults: React.Dispatch<React.SetStateAction<ChannelOrUserResponse<StreamChatGenerics>[]>>;
    setSearching: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare type SearchController<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = SearchInputController & SearchBarController & SearchResultsController<StreamChatGenerics>;
export declare type SearchQueryParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    channelFilters?: {
        filters?: ChannelFilters<StreamChatGenerics>;
        options?: ChannelOptions;
        sort?: ChannelSort<StreamChatGenerics>;
    };
    userFilters?: {
        filters?: UserFilters<StreamChatGenerics>;
        options?: UserOptions;
        sort?: UserSort<StreamChatGenerics>;
    };
};
export declare type ChannelSearchParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** The type of channel to create on user result select, defaults to `messaging` */
    channelType?: string;
    /** Clear search state / results on every click outside the search input, defaults to true */
    clearSearchOnClickOutside?: boolean;
    /** Disables execution of the search queries, defaults to false */
    disabled?: boolean;
    /** Callback invoked with every search input change handler */
    onSearch?: SearchInputController['onSearch'];
    /** Callback invoked when the search UI is deactivated */
    onSearchExit?: () => void;
    /** Custom handler function to run on search result item selection */
    onSelectResult?: (params: ChannelSearchFunctionParams<StreamChatGenerics>, result: ChannelOrUserResponse<StreamChatGenerics>) => Promise<void> | void;
    /** Boolean to search for channels as well as users in the server query, default is false and just searches for users */
    searchForChannels?: boolean;
    /** Custom search function to override the default implementation */
    searchFunction?: (params: ChannelSearchFunctionParams<StreamChatGenerics>, event: React.BaseSyntheticEvent) => Promise<void> | void;
    /** Object containing filters/sort/options overrides for user / channel search */
    searchQueryParams?: SearchQueryParams<StreamChatGenerics>;
};
export declare type ChannelSearchControllerParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = ChannelSearchParams<StreamChatGenerics> & {
    /** Set the array of channels displayed in the ChannelList */
    setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>;
};
export declare const useChannelSearch: <StreamChatGenerics extends unknown = any>({ channelType, clearSearchOnClickOutside, disabled, onSearch: onSearchCallback, onSearchExit, onSelectResult, searchForChannels, searchFunction, searchQueryParams, setChannels, }: ChannelSearchControllerParams<StreamChatGenerics>) => SearchController<StreamChatGenerics>;
//# sourceMappingURL=useChannelSearch.d.ts.map