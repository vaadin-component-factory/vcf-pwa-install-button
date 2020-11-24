# &lt;vcf-pwa-install-button&gt;

## Demo

https://vcf-pwa-install-button.netlify.com/

## Installation

Install `vcf-pwa-install-button`:

```sh
npm i @vaadin-component-factory/vcf-pwa-install-button --save
```

## Usage

Once installed, import it in your application:

```js
import '@vaadin-component-factory/vcf-pwa-install-button';
```

And use it:

```html
<vcf-pwa-install-button>Button caption</vcf-pwa-install-button>
```

### Events

The component fires 3 custom events:

- `vcf-pwa-install-triggered`: when the user click the button.
- `vcf-pwa-install-successful`: when the user installs the app.
- `vcf-pwa-install-cancelled`: when the user cancels the installation of the app.

## Running demo

1. Fork the `vcf-pwa-install-button` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-pwa-install-button` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## Contributing

To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.

## License

Apache License 2.0