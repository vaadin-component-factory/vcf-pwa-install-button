import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-button';
import '@polymer/iron-icon';

import { openPwaInstallPrompt } from '@vaadin-component-factory/vcf-pwa-install-helpers';
import './icons';

/*
 * The component fires 3 custom events:
 *  - vcf-pwa-install-triggered: when the user click the button
 *  - vcf-pwa-install-successful: when the user installs the app
 *  - vcf-pwa-install-cancelled: when the user cancels the installation of the app
 */
class VcfPwaInstallButton extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
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
    return '0.2.2';
  }

  showInstallDialog() {
    this.dispatchEvent(new CustomEvent('vcf-pwa-install-triggered', { bubbles: true, composed: true }));

    // Show the prompt
    openPwaInstallPrompt().then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        this.dispatchEvent(new CustomEvent('vcf-pwa-install-successful', { bubbles: true, composed: true }));

        localStorage.setItem('vcf-installed-pwa', 'true');
        this.classList.remove('install-button-visible');
      } else {
        this.dispatchEvent(new CustomEvent('vcf-pwa-install-cancelled', { bubbles: true, composed: true }));
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
