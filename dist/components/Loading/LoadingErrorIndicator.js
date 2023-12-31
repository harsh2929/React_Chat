import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
/**
 * UI component for error indicator in a Channel
 */
var UnMemoizedLoadingErrorIndicator = function (_a) {
    var error = _a.error;
    var t = useTranslationContext('LoadingErrorIndicator').t;
    if (!error)
        return null;
    return (React.createElement("div", null, t('Error: {{ errorMessage }}', { errorMessage: error.message })));
};
export var LoadingErrorIndicator = React.memo(UnMemoizedLoadingErrorIndicator, function (prevProps, nextProps) { var _a, _b; return ((_a = prevProps.error) === null || _a === void 0 ? void 0 : _a.message) === ((_b = nextProps.error) === null || _b === void 0 ? void 0 : _b.message); });
