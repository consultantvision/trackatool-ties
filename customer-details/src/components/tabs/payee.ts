namespace CustomerDetails.Tabs {
  export function renderPayee(_state: State.CustomerState): HTMLElement {
    const el = document.createElement('div');
    el.className = 'tab-content tab-content--payee';
    const stub = document.createElement('div');
    stub.className = 'tab-stub';
    stub.textContent = 'Payee — not yet implemented';
    el.appendChild(stub);
    return el;
  }
}
