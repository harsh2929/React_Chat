import React from 'react';
import { PopperProps } from 'react-popper';
export declare const Tooltip: ({ children, ...rest }: ComponentProps<"div">) => any;
export declare type PopperTooltipProps<T extends HTMLElement> = React.PropsWithChildren<{
    /** Reference element to which the tooltip should attach to */
    referenceElement: T | null;
    /** Popper's modifier (offset) property - [xAxis offset, yAxis offset], default [0, 10] */
    offset?: [number, number];
    /** Popper's placement property defining default position of the tooltip, default 'top' */
    placement?: PopperProps<unknown>['placement'];
    /** Tells component whether to render its contents */
    visible?: boolean;
}>;
export declare const PopperTooltip: <T extends HTMLElement>({ children, offset, referenceElement, placement, visible, }: React.PropsWithChildren<{
    /** Reference element to which the tooltip should attach to */
    referenceElement: T_1 | null;
    /** Popper's modifier (offset) property - [xAxis offset, yAxis offset], default [0, 10] */
    offset?: [number, number] | undefined;
    /** Popper's placement property defining default position of the tooltip, default 'top' */
    placement?: any;
    /** Tells component whether to render its contents */
    visible?: boolean | undefined;
}>) => any;
//# sourceMappingURL=Tooltip.d.ts.map