// 3-column address block: Facility Details | Postal Address | Main Details.

namespace CustomerDetails.Components {

  function textField(id: string, labelText: string, type = 'text'): HTMLElement {
    const field = document.createElement('div');
    field.className = 'form-field';

    const label = document.createElement('label');
    label.className = 'form-label';
    label.htmlFor = id;
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-input';
    input.id = id;

    field.appendChild(label);
    field.appendChild(input);
    return field;
  }

  function stateCodeRow(stateId: string, codeId: string): HTMLElement {
    const row = document.createElement('div');
    row.className = 'form-row--split';

    const stateField = document.createElement('div');
    stateField.className = 'form-field';
    const stateLabel = document.createElement('label');
    stateLabel.className = 'form-label';
    stateLabel.htmlFor = stateId;
    stateLabel.textContent = 'State';
    const stateInput = document.createElement('input');
    stateInput.type = 'text';
    stateInput.className = 'form-input';
    stateInput.id = stateId;
    stateField.appendChild(stateLabel);
    stateField.appendChild(stateInput);

    const codeField = document.createElement('div');
    codeField.className = 'form-field form-field--narrow';
    const codeLabel = document.createElement('label');
    codeLabel.className = 'form-label';
    codeLabel.htmlFor = codeId;
    codeLabel.textContent = 'Code';
    const codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.className = 'form-input';
    codeInput.id = codeId;
    codeField.appendChild(codeLabel);
    codeField.appendChild(codeInput);

    row.appendChild(stateField);
    row.appendChild(codeField);
    return row;
  }

  function renderFacilityColumn(): HTMLElement {
    const col = document.createElement('div');
    col.className = 'address-col';

    const title = document.createElement('div');
    title.className = 'address-col__title';
    title.textContent = 'Facility Details:';

    col.appendChild(title);
    col.appendChild(textField('fac-hospital-address', 'Hospital Address'));
    col.appendChild(textField('fac-suburb', 'Suburb'));
    col.appendChild(stateCodeRow('fac-state', 'fac-code'));
    col.appendChild(textField('fac-country', 'Country'));
    return col;
  }

  function renderPostalColumn(): HTMLElement {
    const col = document.createElement('div');
    col.className = 'address-col';

    const title = document.createElement('div');
    title.className = 'address-col__title';
    title.textContent = 'Postal Address:';

    col.appendChild(title);
    col.appendChild(textField('post-mail', 'Mail'));
    col.appendChild(textField('post-suburb', 'Suburb'));
    col.appendChild(stateCodeRow('post-state', 'post-code'));
    col.appendChild(textField('post-country', 'Country'));
    return col;
  }

  function renderMainDetailsColumn(): HTMLElement {
    const col = document.createElement('div');
    col.className = 'address-col';

    const title = document.createElement('div');
    title.className = 'address-col__title';
    title.textContent = 'Main Details:';

    col.appendChild(title);
    col.appendChild(textField('main-switchboard', 'Main Switchboard'));
    col.appendChild(textField('main-fax', 'Main Fax'));
    col.appendChild(textField('main-email', 'Reception Email', 'email'));
    col.appendChild(textField('main-website', 'Website', 'url'));
    return col;
  }

  export function renderAddressSection(_state: State.CustomerState): HTMLElement {
    const section = document.createElement('section');
    section.className = 'address-section';

    section.appendChild(renderFacilityColumn());
    section.appendChild(renderPostalColumn());
    section.appendChild(renderMainDetailsColumn());

    return section;
  }

}
