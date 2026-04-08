// Customer ID + Name (combo input) + Show Inactive Customers checkbox row.

namespace CustomerDetails.Components {

  export function renderCustomerIdRow(state: State.CustomerState): HTMLElement {
    const row = document.createElement('div');
    row.className = 'customer-id-row';

    // Customer ID
    const idField = document.createElement('div');
    idField.className = 'form-field';

    const idLabel = document.createElement('label');
    idLabel.className = 'form-label';
    idLabel.htmlFor = 'customer-id';
    idLabel.textContent = 'Customer ID';

    const idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.className = 'form-input';
    idInput.id = 'customer-id';
    idInput.style.width = '100px';
    idInput.addEventListener('input', () => state.update({ customerId: idInput.value }));

    idField.appendChild(idLabel);
    idField.appendChild(idInput);

    // Name (combo: text + dropdown arrow)
    const nameField = document.createElement('div');
    nameField.className = 'form-field';

    const nameLabel = document.createElement('label');
    nameLabel.className = 'form-label';
    nameLabel.htmlFor = 'customer-name';
    nameLabel.textContent = 'Name';

    const nameCombo = document.createElement('div');
    nameCombo.className = 'name-field';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-input';
    nameInput.id = 'customer-name';
    nameInput.addEventListener('input', () => state.update({ name: nameInput.value }));

    const dropBtn = document.createElement('button');
    dropBtn.type = 'button';
    dropBtn.className = 'name-dropdown-btn';
    dropBtn.setAttribute('aria-label', 'Show customer list');
    dropBtn.textContent = '▾';

    nameCombo.appendChild(nameInput);
    nameCombo.appendChild(dropBtn);

    nameField.appendChild(nameLabel);
    nameField.appendChild(nameCombo);

    // Show Inactive Customers checkbox
    const inactiveLabel = document.createElement('label');
    inactiveLabel.className = 'show-inactive';

    const inactiveCb = document.createElement('input');
    inactiveCb.type = 'checkbox';
    inactiveCb.className = 'form-checkbox';
    inactiveCb.id = 'show-inactive';
    inactiveCb.addEventListener('change', () =>
      state.update({ showInactiveCustomers: inactiveCb.checked })
    );

    inactiveLabel.appendChild(inactiveCb);
    inactiveLabel.appendChild(document.createTextNode(' Show Inactive Customers'));

    row.appendChild(idField);
    row.appendChild(nameField);
    row.appendChild(inactiveLabel);

    return row;
  }

}
