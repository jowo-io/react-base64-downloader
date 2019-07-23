# react-base64-download

Easily convert and download base64 strings or HTMLCanvasElements as image files in React.

## Installation

`npm install --save react-base64-download`

## Usage

```jsx
import { Base64DownloadBtn } "react-base64-download";

ReactDOM.render(
    <Base64DownloadBtn
        downloadName="1x1_red_pixel.png"
        base64="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII="
        Tag="a"
        extraAttributes={{ href: 'javascript:;' }}
        className="my-class-name"
        style={{ color: 'orange' }}
        onDownloadSuccess={() => console.log('File download initiated')}
        onDownloadError={() => console.warn('Download failed to start')}
    >
        Click to download
    </Base64DownloadBtn>,
    document.getElementById('root')
);
```

## Pull requests

If you plan on spinning up this repo locally and submitting PR's, please ensure you use Prettier to lint the JS.

The dev script is `npm run dev`, once run, you can open the `dist/examples.html` folder locally to see the the output.

> Note: hot-reloading is not configured.
