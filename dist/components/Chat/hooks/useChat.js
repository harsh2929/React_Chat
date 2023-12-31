var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultDateTimeParser, isLanguageSupported, } from '../../../context/TranslationContext';
import { Streami18n } from '../../../i18n';
import { version } from '../../../version';
export var useChat = function (_a) {
    var _b, _c;
    var client = _a.client, _d = _a.defaultLanguage, defaultLanguage = _d === void 0 ? 'en' : _d, i18nInstance = _a.i18nInstance, initialNavOpen = _a.initialNavOpen;
    var _e = useState({
        t: function (key) { return key; },
        tDateTimeParser: defaultDateTimeParser,
        userLanguage: 'en',
    }), translators = _e[0], setTranslators = _e[1];
    var _f = useState(), channel = _f[0], setChannel = _f[1];
    var _g = useState([]), mutes = _g[0], setMutes = _g[1];
    var _h = useState(initialNavOpen), navOpen = _h[0], setNavOpen = _h[1];
    var _j = useState({}), latestMessageDatesByChannels = _j[0], setLatestMessageDatesByChannels = _j[1];
    var clientMutes = ((_b = client.user) === null || _b === void 0 ? void 0 : _b.mutes) || [];
    var closeMobileNav = function () { return setNavOpen(false); };
    var openMobileNav = function () { return setTimeout(function () { return setNavOpen(true); }, 100); };
    var appSettings = useRef(null);
    var getAppSettings = function () {
        if (appSettings.current) {
            return appSettings.current;
        }
        appSettings.current = client.getAppSettings();
        return appSettings.current;
    };
    useEffect(function () {
        if (client) {
            var userAgent = client.getUserAgent();
            if (!userAgent.includes('stream-chat-react')) {
                // result looks like: 'stream-chat-react-2.3.2-stream-chat-javascript-client-browser-2.2.2'
                client.setUserAgent("stream-chat-react-".concat(version, "-").concat(userAgent));
            }
        }
    }, [client]);
    useEffect(function () {
        setMutes(clientMutes);
        var handleEvent = function (event) {
            var _a;
            setMutes(((_a = event.me) === null || _a === void 0 ? void 0 : _a.mutes) || []);
        };
        client.on('notification.mutes_updated', handleEvent);
        return function () { return client.off('notification.mutes_updated', handleEvent); };
    }, [clientMutes === null || clientMutes === void 0 ? void 0 : clientMutes.length]);
    useEffect(function () {
        var _a;
        var userLanguage = (_a = client.user) === null || _a === void 0 ? void 0 : _a.language;
        if (!userLanguage) {
            var browserLanguage = window.navigator.language.slice(0, 2); // just get language code, not country-specific version
            userLanguage = isLanguageSupported(browserLanguage) ? browserLanguage : defaultLanguage;
        }
        var streami18n = i18nInstance || new Streami18n({ language: userLanguage });
        streami18n.registerSetLanguageCallback(function (t) {
            return setTranslators(function (prevTranslator) { return (__assign(__assign({}, prevTranslator), { t: t })); });
        });
        streami18n.getTranslators().then(function (translator) {
            setTranslators(__assign(__assign({}, translator), { userLanguage: userLanguage || defaultLanguage }));
        });
    }, [i18nInstance]);
    var setActiveChannel = useCallback(function (activeChannel, watchers, event) {
        if (watchers === void 0) { watchers = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (event && event.preventDefault)
                            event.preventDefault();
                        if (!(activeChannel && Object.keys(watchers).length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, activeChannel.query({ watch: true, watchers: watchers })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        setChannel(activeChannel);
                        closeMobileNav();
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    useEffect(function () {
        setLatestMessageDatesByChannels({});
    }, [(_c = client.user) === null || _c === void 0 ? void 0 : _c.id]);
    return {
        channel: channel,
        closeMobileNav: closeMobileNav,
        getAppSettings: getAppSettings,
        latestMessageDatesByChannels: latestMessageDatesByChannels,
        mutes: mutes,
        navOpen: navOpen,
        openMobileNav: openMobileNav,
        setActiveChannel: setActiveChannel,
        translators: translators,
    };
};
