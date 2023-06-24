export class ReactTextareaAutocomplete {
    static defaultProps: {
        closeOnClickOutside: boolean;
        maxRows: number;
        minChar: number;
        movePopupAsYouType: boolean;
        scrollToItem: boolean;
        value: string;
    };
    /**
     * setup to emulate the UNSAFE_componentWillReceiveProps
     */
    static getDerivedStateFromProps(props: any, state: any): {
        propsValue: any;
        value: any;
    } | null;
    constructor(props: any);
    state: {
        actualToken: string;
        component: null;
        currentTrigger: null;
        data: null;
        dataLoading: boolean;
        left: null;
        selectionEnd: number;
        selectionStart: number;
        top: null;
        value: any;
    };
    getSelectionPosition: () => {
        selectionEnd: any;
        selectionStart: any;
    } | null;
    getSelectedText: () => any;
    setCaretPosition: (position?: number) => void;
    getCaretPosition: () => any;
    /**
     * isComposing prevents double submissions in Korean and other languages.
     * starting point for a read:
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing
     * In the long term, the fix should happen by handling keypress, but changing this has unknown implications.
     * @param event React.KeyboardEvent
     */
    _defaultShouldSubmit: (event: any) => boolean;
    _handleKeyDown: (event: any) => void;
    _onEnter: (event: any) => void;
    _onSpace: () => void;
    _replaceWord: () => void;
    _onSelect: (newToken: any) => void;
    _getItemOnSelect: (paramTrigger: any) => ((item: any) => any) | null;
    _getTextToReplace: (paramTrigger: any) => ((item: any) => any) | null;
    _getCurrentTriggerSettings: (paramTrigger: any) => any;
    _getValuesFromProvider: () => void;
    _getSuggestions: (paramTrigger: any) => null;
    /**
     * Close autocomplete, also clean up trigger (to avoid slow promises)
     */
    _closeAutocomplete: () => void;
    _cleanUpProps: () => any;
    _isCommand: (text: any) => boolean;
    _changeHandler: (e: any) => void;
    _selectHandler: (e: any) => void;
    _onClickAndBlurHandler: (e: any) => void;
    _onScrollHandler: () => void;
    _dropdownScroll: (item: any) => void;
    getTriggerProps: () => {
        component: null;
        currentTrigger: null;
        getSelectedItem: ((item: any) => any) | null;
        getTextToReplace: ((item: any) => any) | null;
        selectionEnd: number;
        value: any;
        values: null;
    };
    setDropdownRef: (element: any) => void;
    dropdownRef: any;
    renderSuggestionListContainer(): any;
    render(): any;
    textareaRef: any;
}
export namespace ReactTextareaAutocomplete {
    namespace propTypes {
        export const className: any;
        export const closeOnClickOutside: any;
        export const containerClassName: any;
        export const containerStyle: any;
        export const disableMentions: any;
        export const dropdownClassName: any;
        export const dropdownStyle: any;
        export const itemClassName: any;
        export const itemStyle: any;
        export const listClassName: any;
        export const listStyle: any;
        export const loaderClassName: any;
        export const loaderStyle: any;
        export const loadingComponent: any;
        export const minChar: any;
        export const onBlur: any;
        export const onCaretPositionChange: any;
        export const onChange: any;
        export const onSelect: any;
        export const shouldSubmit: any;
        export const style: any;
        export const SuggestionList: any;
        export { triggerPropsCheck as trigger };
        export const value: any;
    }
}
import { triggerPropsCheck } from "./utils";
//# sourceMappingURL=Textarea.d.ts.map