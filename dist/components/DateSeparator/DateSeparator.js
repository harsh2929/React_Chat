import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
var UnMemoizedDateSeparator = function (props) {
    var messageCreatedAt = props.date, formatDate = props.formatDate, _a = props.position, position = _a === void 0 ? 'right' : _a, unread = props.unread;
    var _b = useTranslationContext('DateSeparator'), t = _b.t, tDateTimeParser = _b.tDateTimeParser;
    var formattedDate = getDateString({
        calendar: true,
        formatDate: formatDate,
        messageCreatedAt: messageCreatedAt,
        tDateTimeParser: tDateTimeParser,
    });
    return (React.createElement("div", { className: 'str-chat__date-separator' },
        (position === 'right' || position === 'center') && (React.createElement("hr", { className: 'str-chat__date-separator-line' })),
        React.createElement("div", { className: 'str-chat__date-separator-date' }, unread ? "".concat(t('New'), " - ").concat(formattedDate) : formattedDate),
        (position === 'left' || position === 'center') && (React.createElement("hr", { className: 'str-chat__date-separator-line' }))));
};
/**
 * A simple date separator between messages.
 */
export var DateSeparator = React.memo(UnMemoizedDateSeparator);
