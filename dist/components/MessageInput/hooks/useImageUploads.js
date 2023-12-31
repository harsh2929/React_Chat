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
import { useCallback, useEffect } from 'react';
import { checkUploadPermissions } from './utils';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
import { useTranslationContext } from '../../../context/TranslationContext';
export var useImageUploads = function (props, state, dispatch) {
    var doImageUploadRequest = props.doImageUploadRequest, errorHandler = props.errorHandler;
    var imageUploads = state.imageUploads;
    var channel = useChannelStateContext('useImageUploads').channel;
    var getAppSettings = useChatContext('useImageUploads').getAppSettings;
    var addNotification = useChannelActionContext('useImageUploads').addNotification;
    var t = useTranslationContext('useImageUploads').t;
    var removeImage = useCallback(function (id) {
        dispatch({ id: id, type: 'removeImageUpload' });
        // TODO: cancel upload if still uploading
    }, []);
    var uploadImage = useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var img, file, canUpload, response, error_1, errorMessage, alreadyRemoved;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    img = imageUploads[id];
                    if (!img)
                        return [2 /*return*/];
                    file = img.file;
                    if (img.state !== 'uploading') {
                        dispatch({ id: id, state: 'uploading', type: 'setImageUpload' });
                    }
                    return [4 /*yield*/, checkUploadPermissions({
                            addNotification: addNotification,
                            file: file,
                            getAppSettings: getAppSettings,
                            t: t,
                            uploadType: 'image',
                        })];
                case 1:
                    canUpload = _b.sent();
                    if (!canUpload)
                        return [2 /*return*/, removeImage(id)];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 8]);
                    if (!doImageUploadRequest) return [3 /*break*/, 4];
                    return [4 /*yield*/, doImageUploadRequest(file, channel)];
                case 3:
                    response = _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, channel.sendImage(file)];
                case 5:
                    response = _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    errorMessage = typeof error_1.message === 'string'
                        ? error_1.message
                        : t('Error uploading image');
                    addNotification(errorMessage, 'error');
                    alreadyRemoved = false;
                    if (!imageUploads[id]) {
                        alreadyRemoved = true;
                    }
                    else {
                        dispatch({ id: id, state: 'failed', type: 'setImageUpload' });
                    }
                    if (!alreadyRemoved && errorHandler) {
                        // TODO: verify if the parameters passed to the error handler actually make sense
                        errorHandler(error_1, 'upload-image', __assign(__assign({}, file), { id: id }));
                    }
                    return [2 /*return*/];
                case 8:
                    // If doImageUploadRequest returns any falsy value, then don't create the upload preview.
                    // This is for the case if someone wants to handle failure on app level.
                    if (!response) {
                        removeImage(id);
                        return [2 /*return*/];
                    }
                    if (img.previewUri)
                        (_a = URL.revokeObjectURL) === null || _a === void 0 ? void 0 : _a.call(URL, img.previewUri);
                    dispatch({
                        id: id,
                        previewUri: undefined,
                        state: 'finished',
                        type: 'setImageUpload',
                        url: response.file,
                    });
                    return [2 /*return*/];
            }
        });
    }); }, [imageUploads, channel, doImageUploadRequest, errorHandler, removeImage]);
    useEffect(function () {
        var upload = Object.values(imageUploads).find(function (imageUpload) { return imageUpload.state === 'uploading' && imageUpload.file; });
        if (!upload)
            return;
        uploadImage(upload.id);
    }, [imageUploads, uploadImage]);
    return {
        removeImage: removeImage,
        uploadImage: uploadImage,
    };
};
