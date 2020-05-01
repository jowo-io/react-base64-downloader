import React from "react";
import Table, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Base64Downloader, {
    triggerBase64Download,
    getExtFromBase64,
    defaultDownloadName,
} from "./src/index.js";

let fakeFile; // this ref is assigned to when the saveAs method invoked
const fakeBlob = "fake-blob-value";
const mocks = {
    fileSaver: {
        saveAs: jest.fn((f) => {
            fakeFile = f;
        }),
    },
    base64ToBlob: jest.fn(() => fakeBlob),
};

Base64Downloader.__Rewire__("fileSaver", mocks.fileSaver);
Base64Downloader.__Rewire__("base64ToBlob", mocks.base64ToBlob);

Table.configure({ adapter: new Adapter() });

const pngExt = "png";
const jpgExt = "jpg";
const jpegExt = "jpeg";
const invalidExt = "gif";

const getContentType = (ext) => `image/${ext}`;
const getBase64Prepend = (ext) => `data:${getContentType(ext)};base64`;
const base64String =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=";

const requiredProps = {
    children: "Click to download",
};

const allProps = {
    downloadName: "1x1_red_pixel",
    Tag: "a",
    extraAttributes: { href: "#" },
    className: "my-class-name",
    style: { color: "orange" },
    onDownloadSuccess: jest.fn(),
    onDownloadError: jest.fn(),
    children: "My children",
};

// -----

describe("invokes saveFile when <Base64Downloader /> is clicked", () => {
    const base64 = `${getBase64Prepend(pngExt)},${base64String}`;
    const mountedComponent = mount(<Base64Downloader {...requiredProps} base64={base64} />);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders without crashing", () => {
        expect(mountedComponent.find(Base64Downloader.defaultProps.Tag).text()).toEqual(
            requiredProps.children
        );
    });

    test("invokes correct callbacks and 3rd party methods", () => {
        const saveAsSpy = jest.spyOn(mocks.fileSaver, "saveAs");
        const base64ToBlobSpy = jest.spyOn(mocks, "base64ToBlob");

        mountedComponent.simulate("click");

        // check both our helper methods were invoked with the correct arguments
        expect(base64ToBlobSpy).toHaveBeenCalledWith(base64String, getContentType(pngExt));
        expect(saveAsSpy).toHaveBeenCalledWith(new File([], ""));

        // checks the fakeFile data which was assigned to global scope when `saveAsSpy` was invoked
        expect(fakeFile.type).toEqual(getBase64Prepend(pngExt));
        expect(fakeFile.size).toEqual(fakeBlob.length);
        expect(fakeFile.name).toEqual(`${defaultDownloadName}.${pngExt}`);

        // cleanup afterwards
        fakeFile = undefined;
    });
});

describe("throws error when <Base64Downloader /> is clicked and base64 is invalid", () => {
    const base64 = `${getBase64Prepend(invalidExt)},${base64String}`;
    const mountedComponent = mount(<Base64Downloader {...requiredProps} base64={base64} />);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders without crashing", () => {
        expect(mountedComponent.find(Base64Downloader.defaultProps.Tag).text()).toEqual(
            requiredProps.children
        );
    });

    test("invokes correct callbacks and 3rd party methods", () => {
        // save the console.error method for later, but overwrite it's reference
        // this prevents the error being logged to the console when running jest
        const originalConsoleError = console.error;
        console.error = jest.fn();

        const consoleErrorSpy = jest.spyOn(console, "error");
        mountedComponent.simulate("click");
        expect(consoleErrorSpy).toHaveBeenCalled();

        // cleanup afterwards
        console.error = originalConsoleError;
    });
});

// -----

describe("invokes saveFile when <Base64Downloader /> is clicked", () => {
    const base64 = `${getBase64Prepend(jpgExt)},${base64String}`;
    const mountedComponent = mount(<Base64Downloader {...allProps} base64={base64} />);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders without crashing", () => {
        const tag = mountedComponent.find(allProps.Tag);
        expect(tag.prop("href")).toEqual(allProps.extraAttributes.href);
        expect(tag.prop("className")).toEqual(allProps.className);
        expect(tag.prop("style")).toEqual(allProps.style);
    });

    test("invokes correct callbacks and 3rd party methods", () => {
        const successCallbackSpy = jest.spyOn(allProps, "onDownloadSuccess");
        const errorCallbackSpy = jest.spyOn(allProps, "onDownloadError");

        const saveAsSpy = jest.spyOn(mocks.fileSaver, "saveAs");
        const base64ToBlobSpy = jest.spyOn(mocks, "base64ToBlob");

        mountedComponent.simulate("click");

        // ensure callbacks fired as expected
        expect(successCallbackSpy).toHaveBeenCalledWith({ base64 });
        expect(errorCallbackSpy).not.toHaveBeenCalled();

        // check both our helper methods were invoked with the correct arguments
        expect(base64ToBlobSpy).toHaveBeenCalledWith(base64String, getContentType(jpgExt));
        expect(saveAsSpy).toHaveBeenCalledWith(new File([], ""));

        // checks the fakeFile data which was assigned to global scope when `saveAsSpy` was invoked
        expect(fakeFile.type).toEqual(getBase64Prepend(jpgExt));
        expect(fakeFile.size).toEqual(fakeBlob.length);
        expect(fakeFile.name).toEqual(`${allProps.downloadName}.${jpgExt}`);

        // cleanup afterwards
        fakeFile = undefined;
    });
});

describe("throws error when <Base64Downloader /> is clicked and base64 is invalid", () => {
    const base64 = `${getBase64Prepend(invalidExt)},${base64String}`;
    const mountedComponent = mount(<Base64Downloader {...allProps} base64={base64} />);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders without crashing", () => {
        // renders correct header text
        expect(mountedComponent.find(allProps.Tag).text()).toEqual(allProps.children);
    });

    test("invokes correct callbacks and 3rd party methods", () => {
        const successCallbackSpy = jest.spyOn(allProps, "onDownloadSuccess");
        const errorCallbackSpy = jest.spyOn(allProps, "onDownloadError");

        // save the console.error method for later, but overwrite it's reference
        // this prevents the error being logged to the console when running jest
        const originalConsoleError = console.error;
        console.error = jest.fn();

        const consoleErrorSpy = jest.spyOn(console, "error");

        mountedComponent.simulate("click");

        // ensure callbacks fired as expected
        expect(successCallbackSpy).not.toHaveBeenCalled();
        expect(errorCallbackSpy).toHaveBeenCalled();

        // ensure console error was logged
        expect(consoleErrorSpy).toHaveBeenCalled();

        // cleanup afterwards
        console.error = originalConsoleError;
    });
});

// -----

describe("test the `triggerBase64Download` method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test(`invokes saveFile with a file that has the expected properties`, () => {
        // renders correct header text
        const saveAsSpy = jest.spyOn(mocks.fileSaver, "saveAs");
        const base64ToBlobSpy = jest.spyOn(mocks, "base64ToBlob");
        triggerBase64Download(`${getBase64Prepend(jpegExt)},${base64String}`);

        // check both our helper methods were invoked with the correct arguments
        expect(base64ToBlobSpy).toHaveBeenCalledWith(base64String, getContentType(jpegExt));
        expect(saveAsSpy).toHaveBeenCalledWith(new File([], ""));

        // checks the fakeFile data which was assigned to global scope when `saveAsSpy` was invoked
        expect(fakeFile.type).toEqual(getBase64Prepend(jpegExt));
        expect(fakeFile.size).toEqual(fakeBlob.length);
        expect(fakeFile.name).toEqual(`${defaultDownloadName}.${jpegExt}`);

        // cleanup afterwards
        fakeFile = undefined;
    });
});

// -----

describe("test the `getExtFromBase64` method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test(`returns ${pngExt} for fake base64 ${pngExt} string`, () => {
        const fakeBase64 = `${getBase64Prepend(pngExt)},${base64String}`;
        expect(getExtFromBase64(fakeBase64)).toEqual(pngExt);
    });

    test(`returns ${jpgExt} for fake base64 ${jpgExt} string`, () => {
        const fakeBase64 = `${getBase64Prepend(jpgExt)},${base64String}`;
        expect(getExtFromBase64(fakeBase64)).toEqual(jpgExt);
    });

    test(`returns ${jpegExt} for fake base64 ${jpegExt} string`, () => {
        const fakeBase64 = `${getBase64Prepend(jpegExt)},${base64String}`;
        expect(getExtFromBase64(fakeBase64)).toEqual(jpegExt);
    });

    test(`throws error for unrecognized fake base64 ${invalidExt} string`, () => {
        const fakeBase64 = `${getBase64Prepend(invalidExt)},${base64String}`;
        expect(() => {
            getExtFromBase64(fakeBase64);
        }).toThrow();
    });
});
