import React from 'react';
export declare type CooldownTimerState = {
    cooldownInterval: number;
    setCooldownRemaining: React.Dispatch<React.SetStateAction<number | undefined>>;
    cooldownRemaining?: number;
};
export declare const useCooldownTimer: <StreamChatGenerics extends unknown = any>() => CooldownTimerState;
//# sourceMappingURL=useCooldownTimer.d.ts.map