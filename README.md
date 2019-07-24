# react-base64-downloader

Easily download base64 strings as image files in React.

## Installation

`npm install --save react-base64-downloader`

## Usage

Trigger downloads using the React `Base64Downloader` component.

```jsx
import Base64Downloader from 'react-base64-downloader';

// ...

const base64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=';

<Base64Downloader
    downloadName="1x1_red_pixel"
    base64={base64}
    Tag="a"
    extraAttributes={{ href: 'javascript:;' }}
    className="my-class-name"
    style={{ color: 'orange' }}
    onDownloadSuccess={() => console.log('File download initiated')}
    onDownloadError={() => console.warn('Download failed to start')}
>
    Click to download
</Base64Downloader>
);
```

Trigger downloads using the `triggerBase64Download` method.

```jsx
import { triggerBase64Download } from 'react-base64-downloader';

// ...

const base64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=';

<button onClick={() => triggerBase64Download(base64, 'my_download_name')}>
    Click to download
</button>;
```

## Examples

See examples [here](https://pureth.github.io/react-base64-downloader/dist/example/example.html)

## Pull requests

If you plan on spinning up this repo locally and submitting PR's, please ensure you use Prettier to lint the JS.

The dev script is `npm run dev`, once run, you can open the `dist/example/example.html` file locally in the browser to see the the output.

> Note: hot-reloading is not configured.
