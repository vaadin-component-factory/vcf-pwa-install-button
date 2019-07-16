const theme = document.createElement('dom-module');
theme.id = 'vcf-pwa-install-button-lumo';
theme.setAttribute('theme-for', 'vcf-pwa-install-button');
theme.innerHTML = `
    <template>
      <style>
        :host {}
      </style>
    </template>
  `;
theme.register(theme.id);
