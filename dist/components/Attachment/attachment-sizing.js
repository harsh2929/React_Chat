export var getImageAttachmentConfiguration = function (attachment, element) {
    var url = new URL((attachment.image_url || attachment.thumb_url || ''));
    var resizeDimensions = getSizingRestrictions(url, element);
    if (resizeDimensions) {
        // Apply 2x for retina displays
        resizeDimensions.height *= 2;
        resizeDimensions.width *= 2;
        addResizingParamsToUrl(resizeDimensions, url);
    }
    return {
        url: url.href,
    };
};
export var getVideoAttachmentConfiguration = function (attachment, element, shouldGenerateVideoThumbnail) {
    var thumbUrl = undefined;
    if (attachment.thumb_url && shouldGenerateVideoThumbnail) {
        var url = new URL(attachment.thumb_url);
        var resizeDimensions = getSizingRestrictions(url, element);
        if (resizeDimensions) {
            // Apply 2x for retina displays
            resizeDimensions.height *= 2;
            resizeDimensions.width *= 2;
            addResizingParamsToUrl(resizeDimensions, url);
        }
        thumbUrl = url.href;
    }
    return {
        thumbUrl: thumbUrl,
        url: attachment.asset_url || '',
    };
};
var getSizingRestrictions = function (url, htmlElement) {
    var urlParams = url.searchParams;
    var originalHeight = Number(urlParams.get('oh')) || 1;
    var originalWidth = Number(urlParams.get('ow')) || 1;
    var cssSizeRestriction = getCSSSizeRestrictions(htmlElement);
    var resizeDimensions;
    if ((cssSizeRestriction.maxHeight || cssSizeRestriction.height) && cssSizeRestriction.maxWidth) {
        resizeDimensions = getResizeDimensions(originalHeight, originalWidth, 
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        cssSizeRestriction.maxHeight || cssSizeRestriction.height, cssSizeRestriction.maxWidth);
    }
    else {
        resizeDimensions = undefined;
    }
    return resizeDimensions;
};
var getResizeDimensions = function (originalHeight, originalWidth, maxHeight, maxWidth) { return ({
    height: Math.round(Math.max(maxHeight, (maxWidth / originalWidth) * originalHeight)),
    width: Math.round(Math.max(maxHeight, (maxWidth / originalHeight) * originalWidth)),
}); };
var getCSSSizeRestrictions = function (htmlElement) {
    var computedStylesheet = getComputedStyle(htmlElement);
    var height = getValueRepresentationOfCSSProperty(computedStylesheet.getPropertyValue('height'));
    var maxHeight = getValueRepresentationOfCSSProperty(computedStylesheet.getPropertyValue('max-height'));
    var maxWidth = getValueRepresentationOfCSSProperty(computedStylesheet.getPropertyValue('max-width'));
    if (!((height || maxHeight) && maxWidth)) {
        console.warn("Invalid value set for height/max-height and/or max-width for HTML element, this can cause scrolling issues inside the message list, more info https://getstream.io/chat/docs/sdk/react/message-components/attachment/#image-and-video-sizing");
    }
    return { height: height, maxHeight: maxHeight, maxWidth: maxWidth };
};
var getValueRepresentationOfCSSProperty = function (property) {
    if (!property.endsWith('px')) {
        return undefined;
    }
    var number = parseFloat(property);
    return isNaN(number) ? undefined : number;
};
var addResizingParamsToUrl = function (resizeDimensions, url) {
    url.searchParams.set('h', resizeDimensions.height.toString());
    url.searchParams.set('w', resizeDimensions.width.toString());
};
