import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-button';
import '@polymer/iron-icon';

import { hasPwaInstallPrompt, openPwaInstallPrompt } from '@vaadin-component-factory/vcf-pwa-install-helpers';
import './icons';

class VcfPwaInstallButton extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host(:not(.install-button-visible)) {
          justify-content: space-between;
        }
      </style>
      <vaadin-button theme="small" on-click="showInstallDialog" id="install-button">
        <iron-icon icon="vcf:download" slot="prefix"></iron-icon>
        <slot></slot>
      </vaadin-button>
    `;
  }

  static get is() {
    return 'vcf-pwa-install-button';
  }

  static get version() {
    return '0.1.3';
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
    this._beforeInstallPromptListener = () => {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        this.classList.add('install-button-visible');
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('beforeinstallprompt', this._beforeInstallPromptListener);
    if (hasPwaInstallPrompt()) {
      this.classList.add('install-button-visible');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('beforeinstallprompt', this._beforeInstallPromptListener);
    super.disconnectedCallback();
  }

  showInstallDialog() {
    // Track the event
    if (window.ga) {
      window.ga('send', 'event', 'PWA', 'install triggered', 'attribution-component');
    }

    // Show the prompt
    openPwaInstallPrompt().then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        if (window.ga) {
          window.ga('send', 'event', 'PWA', 'install successful', 'attribution-component');
        }

        localStorage.setItem('vcf-installed-pwa', 'true');
        this.classList.remove('install-button-visible');
      } else {
        if (window.ga) {
          window.ga('send', 'event', 'PWA', 'install cancelled', 'attribution-component');
        }
      }
    });
  }
}

customElements.define(VcfPwaInstallButton.is, VcfPwaInstallButton);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfPwaInstallButton = VcfPwaInstallButton;

if (window.Vaadin.runIfDevelopmentMode) {
  window.Vaadin.runIfDevelopmentMode('vaadin-license-checker', VcfPwaInstallButton);
}
