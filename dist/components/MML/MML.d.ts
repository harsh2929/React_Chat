import type { ActionHandlerReturnType } from '../Message/hooks/useActionHandler';
export declare type MMLProps = {
    /** MML source string */
    source: string;
    /** Submit handler for mml actions */
    actionHandler?: ActionHandlerReturnType;
    /** Align MML components to left/right, defaults to right */
    align?: 'left' | 'right';
};
/**
 * A wrapper component around MML-React library
 */
export declare const MML: (props: MMLProps) => any;
//# sourceMappingURL=MML.d.ts.map