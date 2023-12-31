import { CommandItem } from '../../CommandItem/CommandItem';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
export var useCommandTrigger = function () {
    var themeVersion = useChatContext('useCommandTrigger').themeVersion;
    var channelConfig = useChannelStateContext('useCommandTrigger').channelConfig;
    var commands = channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.commands;
    return {
        component: CommandItem,
        dataProvider: function (query, text, onReady) {
            if (text.indexOf('/') !== 0 || !commands) {
                return [];
            }
            var selectedCommands = commands.filter(function (command) { var _a; return ((_a = command.name) === null || _a === void 0 ? void 0 : _a.indexOf(query)) !== -1; });
            // sort alphabetically unless the you're matching the first char
            selectedCommands.sort(function (a, b) {
                var _a, _b;
                var nameA = (_a = a.name) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                var nameB = (_b = b.name) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                if ((nameA === null || nameA === void 0 ? void 0 : nameA.indexOf(query)) === 0) {
                    nameA = "0".concat(nameA);
                }
                if ((nameB === null || nameB === void 0 ? void 0 : nameB.indexOf(query)) === 0) {
                    nameB = "0".concat(nameB);
                }
                // Should confirm possible null / undefined when TS is fully implemented
                if (nameA != null && nameB != null) {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                }
                return 0;
            });
            var result = selectedCommands.slice(0, themeVersion === '2' ? 5 : 10);
            if (onReady)
                onReady(result.filter(function (result) {
                    return result.name !== undefined;
                }), query);
            return result;
        },
        output: function (entity) { return ({
            caretPosition: 'next',
            key: entity.name,
            text: "/".concat(entity.name),
        }); },
    };
};
