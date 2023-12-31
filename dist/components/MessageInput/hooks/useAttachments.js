import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useImageUploads } from './useImageUploads';
import { useFileUploads } from './useFileUploads';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
var apiMaxNumberOfFiles = 10;
export var useAttachments = function (props, state, dispatch, textareaRef) {
    var noFiles = props.noFiles;
    var fileUploads = state.fileUploads, imageUploads = state.imageUploads;
    var _a = useChannelStateContext('useAttachments'), maxNumberOfFiles = _a.maxNumberOfFiles, multipleUploads = _a.multipleUploads;
    var _b = useFileUploads(props, state, dispatch), removeFile = _b.removeFile, uploadFile = _b.uploadFile;
    var _c = useImageUploads(props, state, dispatch), removeImage = _c.removeImage, uploadImage = _c.uploadImage;
    // Number of files that the user can still add. Should never be more than the amount allowed by the API.
    // If multipleUploads is false, we only want to allow a single upload.
    var maxFilesAllowed = !multipleUploads ? 1 : maxNumberOfFiles || apiMaxNumberOfFiles;
    // OG attachments should not be counted towards "numberOfImages"
    var numberOfImages = Object.values(imageUploads).filter(function (_a) {
        var og_scrape_url = _a.og_scrape_url, state = _a.state;
        return state !== 'failed' && !og_scrape_url;
    }).length;
    var numberOfFiles = Object.values(fileUploads).filter(function (_a) {
        var state = _a.state;
        return state !== 'failed';
    }).length;
    var numberOfUploads = numberOfImages + numberOfFiles;
    var maxFilesLeft = maxFilesAllowed - numberOfUploads;
    var uploadNewFiles = useCallback(function (files) {
        var _a;
        Array.from(files)
            .slice(0, maxFilesLeft)
            .forEach(function (file) {
            var _a;
            var id = nanoid();
            if (file.type.startsWith('image/') &&
                !file.type.endsWith('.photoshop') // photoshop files begin with 'image/'
            ) {
                dispatch({
                    file: file,
                    id: id,
                    previewUri: (_a = URL.createObjectURL) === null || _a === void 0 ? void 0 : _a.call(URL, file),
                    state: 'uploading',
                    type: 'setImageUpload',
                });
            }
            else if (file instanceof File && !noFiles) {
                dispatch({ file: file, id: id, state: 'uploading', type: 'setFileUpload' });
            }
        });
        (_a = textareaRef === null || textareaRef === void 0 ? void 0 : textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [maxFilesLeft, noFiles]);
    return {
        maxFilesLeft: maxFilesLeft,
        numberOfUploads: numberOfUploads,
        removeFile: removeFile,
        removeImage: removeImage,
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        uploadNewFiles: uploadNewFiles,
    };
};
