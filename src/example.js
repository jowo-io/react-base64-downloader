import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import Base64DownloadBtn from './index.js'; // import from "react-base64-download" in when installed via npm

// a basic base64 string used as the example
const base64Example =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAklEQVR4AewaftIAAAIoSURBVL3BMUgbUQCA4T/PE7J0uSFFcfFZqp3s4NblMgjODpIh4HN+CG4hBZEaUNyU8vYXcLHQzIJDMobi0C2J0OdSKnUQpIsgNeVajh7hcp6hzfflZGm3zxgJxkzwjzilyUIwhFOap5DWkIVgCGkN/4NgzAQjcEozKsEIpDWMSjAGTmkigjGQ1hDxSOGURlpDkuO7fSLlfJWscrK02+eJukGD0Plpj7hyvkqoebDOoGKlTignS7t9BjilkdaQpBs0CImCz8P1DaHz0x6Rcr5KGkECaQ1pRMGnvdnhU+07ouCztDJP5PhunzQeT9ANGuws3lK78okTBZ+llXnOT3vENQ/WGZSTpd0+GXSDBqGdxVtqV7Mkebi+4fy0R6icr5JEkMIpTZwo+NSuZtmeuiSuvdmhvdkhVM5XKeerDOORQlpDRBR82psdQrX3r5iYvif089skg5oH6yQpVup4ZNANGoDPoLf9rzAF77afs9BahRa/FSt1hvF4RDdoIAo+E9P3vPn4gj/uiZwcbXBCdh4xTmmkNUQu1lqAz/bUJfRhLzfD/ecfTL5+RujkaINI82CdJMVKnTiPGGkNkYu1FnF7uRlCC61VaMGXrTPiipU6WXgM8fJDwF8Be1tnxM0dLpOVUxppDSFBRnOHy4xKWkNE8ARzh8s8xilNnFOaOEEGTmnSOKWJSGuIk9YQcUojSOCUJk5aQxppDVlIaxAkkNYwjFOaxzilGeYX+iiom68ASicAAAAASUVORK5CYII=';

const ExampleApp = function() {
    const [downloadInitiated, setDownloadInitiated] = useState(false);
    console.log(downloadInitiated);
    return (
        <Fragment>
            <h4>
                <b>Base64DownloadBtn</b> example!
            </h4>
            <Base64DownloadBtn base64={base64Example}>
                Click to download
            </Base64DownloadBtn>

            <h4>
                <b>Base64DownloadBtn</b> define the download name!
            </h4>
            <Base64DownloadBtn
                downloadName="my_file_name"
                base64={base64Example}
            >
                Click to download
            </Base64DownloadBtn>

            <h4>
                <b>Base64DownloadBtn</b> choose a custom HTML tag!
            </h4>
            <Base64DownloadBtn tag="div" base64={base64Example}>
                Click to download
            </Base64DownloadBtn>

            <h4>
                <b>Base64DownloadBtn</b> with styles or classes!
            </h4>
            <Base64DownloadBtn
                style={{ color: 'orange' }}
                className="my-class-name"
                base64={base64Example}
            >
                Click to download
            </Base64DownloadBtn>

            <h4>
                <b>Base64DownloadBtn</b> with any extra attributes on the HTML
                tag!
            </h4>
            <Base64DownloadBtn
                Tag="a"
                base64={base64Example}
                extraAttributes={{ href: 'javascript:;' }}
            >
                Click to download
            </Base64DownloadBtn>

            <h4>
                <b>Base64DownloadBtn</b> success and error callbacks tag!
            </h4>
            <Base64DownloadBtn
                base64={base64Example}
                onDownloadSuccess={setDownloadInitiated}
                onDownloadError={() => console.warn('Download failed to start')}
            >
                {downloadInitiated ? 'File downloaded' : 'Click to download'}
            </Base64DownloadBtn>
        </Fragment>
    );
};

// create an empty div
const rootDiv = document.createElement('div');
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<ExampleApp />, rootDiv);
