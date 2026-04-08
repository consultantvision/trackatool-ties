namespace CustomerDetails.Tabs {
  export function renderPricingDivision(_state: State.CustomerState): HTMLElement {
    const el = document.createElement('div');
    el.className = 'tab-content tab-content--pricing-division';
    const stub = document.createElement('div');
    stub.className = 'tab-stub';
    stub.textContent = 'Pricing & Division Setup — not yet implemented';
    el.appendChild(stub);
    return el;
  }
}
