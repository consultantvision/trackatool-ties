namespace CustomerDetails.Tabs {
  export function renderContacts(_state: State.CustomerState): HTMLElement {
    const el = document.createElement('div');
    el.className = 'tab-content tab-content--contacts';
    const stub = document.createElement('div');
    stub.className = 'tab-stub';
    stub.textContent = 'Contacts — not yet implemented';
    el.appendChild(stub);
    return el;
  }
}
