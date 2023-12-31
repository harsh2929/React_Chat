import { isValidElementType } from 'react-is';
export var DEFAULT_CARET_POSITION = 'next';
export function defaultScrollToItem(container, item) {
    if (!item)
        return;
    var itemHeight = parseInt(getComputedStyle(item).getPropertyValue('height'), 10);
    var containerHight = parseInt(getComputedStyle(container).getPropertyValue('height'), 10) - itemHeight;
    var actualScrollTop = container.scrollTop;
    var itemOffsetTop = item.offsetTop;
    if (itemOffsetTop < actualScrollTop + containerHight && actualScrollTop < itemOffsetTop) {
        return;
    }
    // eslint-disable-next-line
    container.scrollTop = itemOffsetTop;
}
export var errorMessage = function (message) {
    return console.error("RTA: dataProvider fails: ".concat(message, "\n    \nCheck the documentation or create issue if you think it's bug. https://github.com/webscopeio/react-textarea-autocomplete/issues"));
};
export var triggerPropsCheck = function (_a) {
    var trigger = _a.trigger;
    if (!trigger)
        return Error('Invalid prop trigger. Prop missing.');
    var triggers = Object.entries(trigger);
    for (var i = 0; i < triggers.length; i += 1) {
        var _b = triggers[i], triggerChar = _b[0], settings = _b[1];
        if (typeof triggerChar !== 'string' || triggerChar.length !== 1) {
            return Error('Invalid prop trigger. Keys of the object has to be string / one character.');
        }
        // $FlowFixMe
        var triggerSetting = settings;
        var callback = triggerSetting.callback, component = triggerSetting.component, dataProvider = triggerSetting.dataProvider, output = triggerSetting.output;
        if (!isValidElementType(component)) {
            return Error('Invalid prop trigger: component should be defined.');
        }
        if (!dataProvider || typeof dataProvider !== 'function') {
            return Error('Invalid prop trigger: dataProvider should be defined.');
        }
        if (output && typeof output !== 'function') {
            return Error('Invalid prop trigger: output should be a function.');
        }
        if (callback && typeof callback !== 'function') {
            return Error('Invalid prop trigger: callback should be a function.');
        }
    }
    return null;
};
