import React from 'react';
import * as FileSaver from 'file-saver';

const contentTypes = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
};

const base64Prepends = {
    png: `data:${contentTypes.png};base64`,
    jpeg: `data:${contentTypes.jpeg};base64`,
    jpg: `data:${contentTypes.jpg};base64`,
};

const Base64DownloadBtn = function({
    base64,
    children,
    downloadName,
    onDownloadSuccess,
    onDownloadError,
    Tag,
    className,
    style,
    extraAttributes,
}) {
    const ext = getExt(base64);
    if (ext instanceof Error) {
        console.error(ext);
        return null;
    }

    function handleClick() {
        try {
            downloadBase64AsImg(base64, ext, downloadName);
            if (onDownloadSuccess) onDownloadSuccess({ base64, ext });
        } catch (e) {
            console.error(e);
            if (onDownloadError) onDownloadError(e);
        }
    }

    return (
        <Tag
            onClick={handleClick}
            className={className}
            style={style}
            {...extraAttributes}
        >
            {children}
        </Tag>
    );
};

Base64DownloadBtn.defaultProps = {
    className: '',
    style: {},
    downloadName: 'download',
    Tag: 'button',
    extraAttributes: {},
};

export default Base64DownloadBtn;

/**
 * clean the base64 prop into a usable base64 string
 */
function getExt(base64) {
    let ext;
    if (typeof base64 === 'string') {
        ext = Object.keys(base64Prepends).find(
            key => base64.indexOf(base64Prepends[key]) === 0
        );
    }

    if (ext) {
        return ext;
    } else {
        return new Error(
            `props.base64 on <Base64DownloadBtn/> has invalid or undefined extension. expected ${Object.keys(
                contentTypes
            ).join(', ')}`
        );
    }
}

/**
 * triggers a browser file download from a base64 string
 */
function downloadBase64AsImg(base64, ext, name) {
    const prepend = base64Prepends[ext];
    const cleanedBase64 = base64.replace(`${prepend},`, '');
    const blob = b64toBlob(cleanedBase64, ext);
    const file = new File([blob], `${name}.${ext}`, { type: prepend });
    FileSaver.saveAs(file);
}

/**
 * coverts a base64 string into an image Blob
 */
function b64toBlob(cleanedBase64, ext, sliceSize = 512) {
    var byteCharacters = atob(cleanedBase64);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentTypes[ext] });
    return blob;
}
