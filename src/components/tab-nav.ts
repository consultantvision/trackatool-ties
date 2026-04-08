// 7-tab navigation bar. Listens to state tabchange events to update active styling.

namespace CustomerDetails.Components {

  const TAB_DEFINITIONS: Types.TabDefinition[] = [
    { id: 'general-setup',    label: 'General Setup',              icon: '⌂' },
    { id: 'contacts',         label: 'Contacts',                   icon: '' },
    { id: 'pricing-division', label: 'Pricing & Division Setup',   icon: 'Σ' },
    { id: 'new-pricing',      label: 'New Pricing Setup',          icon: 'Σ' },
    { id: 'payee',            label: 'Payee',                      icon: '' },
    { id: 'laser-marking',    label: 'Laser Marking & Management', icon: '✎' },
    { id: 'tray-setup',       label: 'Tray Setup',                 icon: '' },
  ];

  export function renderTabNav(state: State.CustomerState): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = 'tab-nav';
    nav.setAttribute('role', 'tablist');

    const buttons = new Map<Types.TabId, HTMLButtonElement>();

    function setActive(id: Types.TabId): void {
      buttons.forEach((btn, btnId) => {
        btn.classList.toggle('tab-nav__btn--active', btnId === id);
        btn.setAttribute('aria-selected', btnId === id ? 'true' : 'false');
      });
    }

    TAB_DEFINITIONS.forEach((tab) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab-nav__btn';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-tab-id', tab.id);
      btn.setAttribute('aria-selected', 'false');

      if (tab.icon) {
        const icon = document.createElement('span');
        icon.className = 'tab-nav__icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = tab.icon;
        btn.appendChild(icon);
      }

      btn.appendChild(document.createTextNode(tab.label));

      btn.addEventListener('click', () => state.setTab(tab.id));

      buttons.set(tab.id, btn);
      nav.appendChild(btn);
    });

    // Sync on tab change
    state.addEventListener('tabchange', (e) => {
      const detail = (e as CustomEvent<Types.TabChangeEventDetail>).detail;
      setActive(detail.tabId);
    });

    // Set initial active tab
    setActive(state.activeTab);

    return nav;
  }

}
