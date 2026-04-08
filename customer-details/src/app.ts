/// <reference path="types.ts" />
/// <reference path="state.ts" />
/// <reference path="components/header.ts" />
/// <reference path="components/customer-id-row.ts" />
/// <reference path="components/address-section.ts" />
/// <reference path="components/tab-nav.ts" />
/// <reference path="components/footer-actions.ts" />
/// <reference path="components/tabs/general-setup.ts" />
/// <reference path="components/tabs/contacts.ts" />
/// <reference path="components/tabs/pricing-division.ts" />
/// <reference path="components/tabs/new-pricing.ts" />
/// <reference path="components/tabs/payee.ts" />
/// <reference path="components/tabs/laser-marking.ts" />
/// <reference path="components/tabs/tray-setup.ts" />

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (!root) return;

  const state = CustomerDetails.State.createState();

  // Tab renderer map
  type TabRenderer = (s: CustomerDetails.State.CustomerState) => HTMLElement;
  const tabRenderers: Record<CustomerDetails.Types.TabId, TabRenderer> = {
    'general-setup':    CustomerDetails.Tabs.renderGeneralSetup,
    'contacts':         CustomerDetails.Tabs.renderContacts,
    'pricing-division': CustomerDetails.Tabs.renderPricingDivision,
    'new-pricing':      CustomerDetails.Tabs.renderNewPricing,
    'payee':            CustomerDetails.Tabs.renderPayee,
    'laser-marking':    CustomerDetails.Tabs.renderLaserMarking,
    'tray-setup':       CustomerDetails.Tabs.renderTraySetup,
  };

  // Build the app shell
  const app = document.createElement('div');
  app.className = 'customer-app';

  const header      = CustomerDetails.Components.renderHeader(state);
  const idRow       = CustomerDetails.Components.renderCustomerIdRow(state);
  const addressSec  = CustomerDetails.Components.renderAddressSection(state);
  const tabNav      = CustomerDetails.Components.renderTabNav(state);
  const footer      = CustomerDetails.Components.renderFooterActions();

  // Initial tab content
  let tabContentEl: HTMLElement = tabRenderers['general-setup'](state);
  tabContentEl.id = 'tab-content-mount';

  app.appendChild(header);
  app.appendChild(idRow);
  app.appendChild(addressSec);
  app.appendChild(tabNav);
  app.appendChild(tabContentEl);
  app.appendChild(footer);

  // Swap tab content on tab change
  state.addEventListener('tabchange', (e) => {
    const detail = (e as CustomEvent<CustomerDetails.Types.TabChangeEventDetail>).detail;
    const newContent = tabRenderers[detail.tabId](state);
    newContent.id = 'tab-content-mount';
    const old = document.getElementById('tab-content-mount');
    if (old && old.parentNode) {
      old.parentNode.replaceChild(newContent, old);
    }
    tabContentEl = newContent;
  });

  root.appendChild(app);
});
