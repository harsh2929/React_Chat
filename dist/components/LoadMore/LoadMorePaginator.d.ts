import React from 'react';
import { LoadMoreButtonProps } from './LoadMoreButton';
import type { PaginatorProps } from '../../types/types';
export declare type LoadMorePaginatorProps = PaginatorProps & {
    /** A UI button component that handles pagination logic */
    LoadMoreButton?: React.ComponentType<LoadMoreButtonProps>;
    /** indicates if the `LoadMoreButton` should be displayed at the top of the list of channels instead of the bottom of the list (the default) */
    reverse?: boolean;
};
export declare const UnMemoizedLoadMorePaginator: (props: PropsWithChildren<LoadMorePaginatorProps>) => any;
export declare const LoadMorePaginator: (props: PropsWithChildren<LoadMorePaginatorProps>) => any;
//# sourceMappingURL=LoadMorePaginator.d.ts.map