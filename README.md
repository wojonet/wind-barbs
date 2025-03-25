# Wind Barbs SVG

This package will generate wind barb SVGs, similar to those found
on NOAA's NWS website [found here](https://www.weather.gov/hfo/windbarbinfo). It can be used to indicate wind direction and speed on a weather map.

Each wind barb SVG can be rotated about the "tip" of the wind barb, or the stem's base.

Redistributables are in `umd` format. There are no dependencies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [In-browser DOM Element](#in-browser-dom-element)
  - [React/JSX style](#reactjsx-style)
  - [Non-`exports` Environments](#non-exports-environments)
- [WIP](#wip)
- [License](#license)

## Installation

You can install this package via npm:

```bash
npm install wind-barbs
```

Alternatively, you can use a `<script>` tag to include the library directly in your HTML:

```html
<script src="path/to/wind-barbs.umd.min.js"></script>
```

The library will be available under the `WindBarb` namespace.

## Usage

The only function as of now is:

`generateWindBarbSvg(windSpeed, windDirection?, options?)`

- `windSpeed` - Wind speed. Knots are usually used, but this library is unitless.
- `windDirection` (optional, default: 0) - Wind direction. This will rotate the barb by the number of degrees given (0-359)
- `options` (optional) - Options object when generating the SVG. Right now, the only option is which color the barb should be. The default is:

  ```javascript
  {
    color: #000000
  }
  ```

### In-browser DOM Element

There are two ways that may be used for generating wind barb SVGs. The first builds SVGs via the DOM and can be used as such:

```javascript
import { generateWindBarbSvg } from 'wind-barbs'

const svg = generateWindBarbSvg(15, -90)

window.document.appendChild(svg)
```

Which will produce:

<div style="display:flex;justify-content:center;margin-bottom:4em;">
<svg viewBox="0 0 18 25" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg); transform-origin: center bottom; height: 50px;background-color:white"><polyline points="9,25 9,3.9 17.7,0.95" fill="none" stroke="black" stroke-width="2"></polyline><line x1="9" y1="6.85" x2="13.35" y2="5.3999999999999995" stroke="black" stroke-width="2"></line></svg>
</div>

See `examples/browser.html`.

### React/JSX style

The second way to use `wind-barbs` will produce a JSX element. Import from `wind-barbs/react`

```javascript
import { generateWindBarbSvg } from 'wind-barbs/react'

const MyComponent = () => {
  const svg = generateWindBarbSvg(15, -90, { color: 'pink' })
  return <div>{svg}</div>
}
```

This will produce the same SVG as shown previously.

### Non-`exports` environments

If your environment does not support `exports` in `package.json`, then you can use the bundled library, which contains the DOM and JSX-style functions. The type signature for this is:

```typescript
import { generateWindBarbSvg } from '../index'
import { generateWindBarbSvg as generateWindBarbSvgReact } from '../react/index'
export { generateWindBarbSvg, generateWindBarbSvgReact }
```

## WIP

This is a work in progress and may be updated in the future.

- [ ] Allow SVG to be justified to the left, removing blank space.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
