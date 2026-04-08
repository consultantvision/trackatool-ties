namespace CustomerDetails.Tabs {
  export function renderNewPricing(_state: State.CustomerState): HTMLElement {
    const el = document.createElement('div');
    el.className = 'tab-content tab-content--new-pricing';
    const stub = document.createElement('div');
    stub.className = 'tab-stub';
    stub.textContent = 'New Pricing Setup — not yet implemented';
    el.appendChild(stub);
    return el;
  }
}
