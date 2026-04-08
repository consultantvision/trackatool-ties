namespace CustomerDetails.Tabs {
  export function renderLaserMarking(_state: State.CustomerState): HTMLElement {
    const el = document.createElement('div');
    el.className = 'tab-content tab-content--laser-marking';
    const stub = document.createElement('div');
    stub.className = 'tab-stub';
    stub.textContent = 'Laser Marking & Management — not yet implemented';
    el.appendChild(stub);
    return el;
  }
}
