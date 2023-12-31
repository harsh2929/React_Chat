import React from 'react';
export declare type ModalProps = {
    /** If true, modal is opened or visible. */
    open: boolean;
    /** Callback handler for closing of modal. */
    onClose?: (event: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
};
export declare const Modal: ({ children, onClose, open }: PropsWithChildren<ModalProps>) => any;
//# sourceMappingURL=Modal.d.ts.map