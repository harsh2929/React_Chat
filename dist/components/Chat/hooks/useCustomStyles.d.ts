export declare type CSSVariables = '--main-font' | '--second-font' | '--xs-font' | '--sm-font' | '--md-font' | '--lg-font' | '--xl-font' | '--xxl-font' | '--xxxl-font' | '--font-weight-regular' | '--font-weight-semi-bold' | '--font-weight-bold' | '--primary-color' | '--primary-color-faded' | '--magenta' | '--red' | '--faded-red' | '--dt-bg-team' | '--border-color' | '--lighten-black' | '--lighten-grey' | '--light-grey' | '--grey' | '--dark-grey' | '--green' | '--faded-green' | '--white' | '--white5' | '--white10' | '--white20' | '--white30' | '--white40' | '--white50' | '--white60' | '--white70' | '--white80' | '--white90' | '--white95' | '--black' | '--black5' | '--black10' | '--black20' | '--black30' | '--black40' | '--black50' | '--black60' | '--black70' | '--black80' | '--black90' | '--black95' | '--border-radius' | '--border-radius-sm' | '--border-radius-md' | '--border-radius-round' | '--spacing-unit' | '--xxs-p' | '--xs-p' | '--sm-p' | '--md-p' | '--lg-p' | '--xl-p' | '--xxl-p' | '--xxs-m' | '--xs-m' | '--sm-m' | '--md-m' | '--lg-m' | '--xl-m' | '--xxl-m' | '--assetsPath' | '--accent_blue' | '--accent_green' | '--accent_red' | '--bg-gradient-end' | '--bg-gradient-start' | '--black' | '--blue-alice' | '--border' | '--button-background' | '--button-text' | '--grey' | '--grey-gainsboro' | '--grey-whisper' | '--highlight' | '--modal-shadow' | '--overlay' | '--overlay-dark' | '--shadow-icon' | '--targetedMessageBackground' | '--transparent' | '--white' | '--white-smoke' | '--white-snow';
export declare const darkModeTheme: CustomStyles;
export declare type CustomStyles = Partial<Record<CSSVariables, string>>;
/**
 * @deprecated This hook has been deprecated in favor of the new
 * theming (V2) setup which sets its variables through CSS files.
 * Refer to the [documentation](https://getstream.io/chat/docs/sdk/react/theming/themingv2/) of the new theming for the upgrade.
 *
 * **Will be removed with the complete transition to the theming V2.**
 */
export declare const useCustomStyles: (customStyles?: CustomStyles) => void;
//# sourceMappingURL=useCustomStyles.d.ts.map