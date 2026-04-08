// Page header: Active/Inactive status pills + "Customer Details" title
// + Sales Representative / Sales Region / Corporate Group selects.

namespace CustomerDetails.Components {

  function makeSelect(id: string, label: string, width?: string): HTMLElement {
    const field = document.createElement('div');
    field.className = 'form-field';

    const lbl = document.createElement('label');
    lbl.className = 'form-label';
    lbl.htmlFor = id;
    lbl.textContent = label + ':';

    const sel = document.createElement('select');
    sel.className = 'form-select';
    sel.id = id;
    if (width) sel.style.width = width;

    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = '';
    sel.appendChild(empty);

    field.appendChild(lbl);
    field.appendChild(sel);
    return field;
  }

  export function renderHeader(state: State.CustomerState): HTMLElement {
    const header = document.createElement('header');
    header.className = 'customer-header';

    // --- Row 1: Status | Title | Sales fields ---
    const row1 = document.createElement('div');
    row1.className = 'customer-header__row';

    // Status pills
    const statusWrap = document.createElement('div');
    statusWrap.className = 'customer-header__status';

    const inactiveBtn = document.createElement('button');
    inactiveBtn.className = 'status-btn status-btn--inactive';
    inactiveBtn.type = 'button';
    inactiveBtn.textContent = 'Inactive';

    const activeBtn = document.createElement('button');
    activeBtn.className = 'status-btn status-btn--active is-selected';
    activeBtn.type = 'button';
    activeBtn.textContent = 'Active';

    function syncPills(status: Types.CustomerStatus): void {
      if (status === 'active') {
        activeBtn.classList.add('is-selected');
        inactiveBtn.classList.remove('is-selected');
      } else {
        inactiveBtn.classList.add('is-selected');
        activeBtn.classList.remove('is-selected');
      }
    }

    activeBtn.addEventListener('click', () => state.update({ status: 'active' }));
    inactiveBtn.addEventListener('click', () => state.update({ status: 'inactive' }));

    state.addEventListener('change', (e) => {
      const detail = (e as CustomEvent<Types.ChangeEventDetail>).detail;
      syncPills(detail.data.status);
    });

    statusWrap.appendChild(inactiveBtn);
    statusWrap.appendChild(activeBtn);

    // Title
    const title = document.createElement('div');
    title.className = 'customer-header__title';
    title.textContent = 'Customer Details';

    // Spacer
    const spacer = document.createElement('div');
    spacer.className = 'customer-header__spacer';

    // Sales fields
    const sales = document.createElement('div');
    sales.className = 'customer-header__sales';
    sales.appendChild(makeSelect('sales-rep', 'Sales Representative', '180px'));
    sales.appendChild(makeSelect('sales-region', 'Sales Region', '140px'));
    sales.appendChild(makeSelect('corporate-group', 'Corporate Group', '140px'));

    row1.appendChild(statusWrap);
    row1.appendChild(title);
    row1.appendChild(spacer);
    row1.appendChild(sales);

    header.appendChild(row1);
    return header;
  }

}
