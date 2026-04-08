// General Setup tab — fully implemented.
// Row 1: 4-column section cards (Dept | Quotation | Invoice | Service Report)
// Row 2: left-stack (Delivery + Freight) | right Department Management Panel
// Footer row: Tub Label / eWay Company / eWay link / buttons

namespace CustomerDetails.Tabs {

  // --- Helpers -------------------------------------------------------

  function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    text?: string
  ): HTMLElementTagNameMap[K] {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
  }

  function labeledInput(id: string, labelText: string, type = 'text'): HTMLElement {
    const field = el('div', 'form-field');
    const lbl = el('label', 'form-label', labelText) as HTMLLabelElement;
    lbl.htmlFor = id;
    const input = el('input', 'form-input') as HTMLInputElement;
    input.type = type;
    input.id = id;
    field.appendChild(lbl);
    field.appendChild(input);
    return field;
  }

  function labeledSelect(id: string, labelText: string, options: string[] = []): HTMLElement {
    const field = el('div', 'form-field');
    const lbl = el('label', 'form-label', labelText) as HTMLLabelElement;
    lbl.htmlFor = id;
    const sel = el('select', 'form-select') as HTMLSelectElement;
    sel.id = id;
    ['' , ...options].forEach(opt => {
      const o = el('option') as HTMLOptionElement;
      o.value = opt; o.textContent = opt;
      sel.appendChild(o);
    });
    field.appendChild(lbl);
    field.appendChild(sel);
    return field;
  }

  function checkRow(id: string, labelText: string, withRemove = true): HTMLElement {
    const row = el('div', 'form-inline');
    const cb = el('input', 'form-checkbox') as HTMLInputElement;
    cb.type = 'checkbox'; cb.id = id;
    const lbl = el('label', 'form-check-label', labelText) as HTMLLabelElement;
    lbl.htmlFor = id;
    row.appendChild(cb);
    row.appendChild(lbl);
    if (withRemove) {
      const btn = el('button', 'btn-remove') as HTMLButtonElement;
      btn.type = 'button'; btn.setAttribute('aria-label', 'Remove'); btn.textContent = '−';
      row.appendChild(btn);
    }
    return row;
  }

  function doubleCheckRow(id1: string, label1: string, id2: string, label2: string, withRemove = true): HTMLElement {
    const wrap = el('div', 'form-inline');
    const cb1 = el('input', 'form-checkbox') as HTMLInputElement; cb1.type = 'checkbox'; cb1.id = id1;
    const lbl1 = el('label', 'form-check-label', label1) as HTMLLabelElement; lbl1.htmlFor = id1;
    const sep = el('span', 'form-inline-sep', '|');
    const cb2 = el('input', 'form-checkbox') as HTMLInputElement; cb2.type = 'checkbox'; cb2.id = id2;
    const lbl2 = el('label', 'form-check-label', label2) as HTMLLabelElement; lbl2.htmlFor = id2;
    wrap.appendChild(cb1); wrap.appendChild(lbl1);
    wrap.appendChild(sep);
    wrap.appendChild(cb2); wrap.appendChild(lbl2);
    if (withRemove) {
      const btn = el('button', 'btn-remove') as HTMLButtonElement;
      btn.type = 'button'; btn.setAttribute('aria-label', 'Remove'); btn.textContent = '−';
      wrap.appendChild(btn);
    }
    return wrap;
  }

  function sectionCard(titleText: string): HTMLElement {
    const card = el('div', 'section-card');
    card.appendChild(el('div', 'section-card__title', titleText));
    return card;
  }

  function stateCodeRow(stateId: string, codeId: string): HTMLElement {
    const row = el('div', 'form-row--split');
    const sf = el('div', 'form-field');
    const sl = el('label', 'form-label', 'State') as HTMLLabelElement; sl.htmlFor = stateId;
    const si = el('input', 'form-input') as HTMLInputElement; si.type = 'text'; si.id = stateId;
    sf.appendChild(sl); sf.appendChild(si);
    const cf = el('div', 'form-field form-field--narrow');
    const cl = el('label', 'form-label', 'Code') as HTMLLabelElement; cl.htmlFor = codeId;
    const ci = el('input', 'form-input') as HTMLInputElement; ci.type = 'text'; ci.id = codeId;
    cf.appendChild(cl); cf.appendChild(ci);
    row.appendChild(sf); row.appendChild(cf);
    return row;
  }

  function currencyField(id: string, labelText: string): HTMLElement {
    const field = el('div', 'form-field');
    const lbl = el('label', 'form-label', labelText) as HTMLLabelElement; lbl.htmlFor = id;
    const wrap = el('div', 'currency-input-wrap');
    const prefix = el('span', 'currency-prefix', '$');
    const input = el('input', 'form-input form-input--currency') as HTMLInputElement;
    input.type = 'number'; input.id = id; input.value = '0.00'; input.step = '0.01'; input.min = '0';
    wrap.appendChild(prefix); wrap.appendChild(input);
    field.appendChild(lbl); field.appendChild(wrap);
    return field;
  }

  // --- Row 1 Section Cards -------------------------------------------

  function renderDefaultDepartment(): HTMLElement {
    const card = sectionCard('Default Department Setup:');
    card.appendChild(labeledSelect('gs-department', 'Department'));
    card.appendChild(labeledSelect('gs-contact', 'Contact'));
    return card;
  }

  function renderQuotationSetup(): HTMLElement {
    const card = sectionCard('Quotation Setup:');
    card.appendChild(doubleCheckRow('gs-quote', 'Quote', 'gs-quote-excel', 'Include Excel'));
    card.appendChild(labeledInput('gs-quote-attn', 'Attn To'));
    card.appendChild(labeledSelect('gs-quote-send-to', 'Send To'));
    card.appendChild(checkRow('gs-send-confirmation', 'Send Confirmation on Approval'));
    card.appendChild(checkRow('gs-stop-reminders', 'Stop Quote Reminders'));
    card.appendChild(labeledInput('gs-reminder-every', 'Reminder Every', 'number'));
    return card;
  }

  function renderInvoiceSetup(): HTMLElement {
    const card = sectionCard('Invoice Setup:');
    const limitRow = el('div', 'form-row--split');
    limitRow.appendChild(labeledInput('gs-inv-limit', 'Invoice/Quote Limit', 'number'));
    const payeeField = el('div', 'form-field');
    const payeeLblSpacer = el('label', 'form-label', '\u00a0') as HTMLLabelElement;
    const payeeInline = el('div', 'form-inline'); payeeInline.style.marginBottom = '0';
    const payeeCb = el('input', 'form-checkbox') as HTMLInputElement; payeeCb.type = 'checkbox'; payeeCb.id = 'gs-inv-to-payee';
    const payeeLbl = el('label', 'form-check-label', 'Invoice To Payee') as HTMLLabelElement; payeeLbl.htmlFor = 'gs-inv-to-payee';
    const payeeBtn = el('button', 'btn-remove') as HTMLButtonElement; payeeBtn.type = 'button'; payeeBtn.textContent = '−'; payeeBtn.setAttribute('aria-label', 'Remove');
    payeeInline.appendChild(payeeCb); payeeInline.appendChild(payeeLbl); payeeInline.appendChild(payeeBtn);
    payeeField.appendChild(payeeLblSpacer); payeeField.appendChild(payeeInline);
    limitRow.appendChild(payeeField);
    card.appendChild(limitRow);
    card.appendChild(doubleCheckRow('gs-email-inv', 'Email Invoice', 'gs-inv-excel', 'Include Excel'));
    card.appendChild(labeledInput('gs-inv-attn', 'Attn To'));
    card.appendChild(labeledSelect('gs-inv-send-to', 'Send To'));
    card.appendChild(labeledInput('gs-po-number', 'PO Number'));
    card.appendChild(labeledInput('gs-po-expiry', 'PO Expiry', 'date'));
    return card;
  }

  function renderServiceReportSetup(): HTMLElement {
    const card = sectionCard('Service Report Setup:');
    card.appendChild(doubleCheckRow('gs-email-report', 'Email Report', 'gs-report-excel', 'Include Excel'));
    card.appendChild(labeledInput('gs-report-attn', 'Attn To'));
    card.appendChild(labeledSelect('gs-report-send-to', 'Send To'));
    return card;
  }

  // --- Row 2 Left: Delivery + Freight --------------------------------

  function renderDefaultDelivery(): HTMLElement {
    const card = sectionCard('Default Delivery Setup:');
    card.appendChild(labeledSelect('gs-del-name', 'Delivery Name'));
    card.appendChild(labeledSelect('gs-del-dept', 'Department'));
    card.appendChild(labeledSelect('gs-del-attn', 'Attn'));
    card.appendChild(labeledInput('gs-del-addr', 'Address'));
    card.appendChild(labeledInput('gs-del-addr2', 'Address 2'));
    card.appendChild(labeledInput('gs-del-suburb', 'Suburb'));
    card.appendChild(stateCodeRow('gs-del-state', 'gs-del-code'));
    card.appendChild(labeledInput('gs-del-country', 'Country'));
    return card;
  }

  function renderFreightSetup(): HTMLElement {
    const card = sectionCard('Freight Setup:');
    card.appendChild(labeledSelect('gs-fr-company', 'Company'));
    card.appendChild(labeledInput('gs-fr-account', 'Account #'));
    card.appendChild(labeledInput('gs-fr-phone', 'Phone', 'tel'));
    card.appendChild(labeledSelect('gs-fr-service', 'Service'));

    const insRow = el('div', 'form-row--split');
    insRow.appendChild(labeledInput('gs-fr-insurance', 'Insurance'));
    const despField = el('div', 'form-field');
    const despSpacer = el('label', 'form-label', '\u00a0') as HTMLLabelElement;
    const despInline = el('div', 'form-inline'); despInline.style.marginBottom = '0';
    const despCb = el('input', 'form-checkbox') as HTMLInputElement; despCb.type = 'checkbox'; despCb.id = 'gs-fr-despatch';
    const despLbl = el('label', 'form-check-label form-check-label--muted', 'Print Item Despatch Labels') as HTMLLabelElement; despLbl.htmlFor = 'gs-fr-despatch';
    const despBtn = el('button', 'btn-remove') as HTMLButtonElement; despBtn.type = 'button'; despBtn.textContent = '−'; despBtn.setAttribute('aria-label', 'Remove');
    despInline.appendChild(despCb); despInline.appendChild(despLbl); despInline.appendChild(despBtn);
    despField.appendChild(despSpacer); despField.appendChild(despInline);
    insRow.appendChild(despField);
    card.appendChild(insRow);

    card.appendChild(labeledSelect('gs-fr-transport', 'Transport Case'));
    card.appendChild(currencyField('gs-fr-incoming', 'Freight Incoming'));
    card.appendChild(currencyField('gs-fr-outgoing', 'Freight Outgoing'));
    card.appendChild(currencyField('gs-fr-admin', 'Administration'));
    return card;
  }

  // --- Row 2 Right: Department Management Panel ----------------------

  function renderDepartmentForm(panelEl: HTMLElement): void {
    panelEl.innerHTML = '';

    // Title bar with department name selector + close button
    const titleBar = el('div', 'dept-panel__titlebar');
    const deptNameField = el('div', 'form-field form-field--inline');
    const deptNameLbl = el('label', 'form-label', 'Department Name') as HTMLLabelElement; deptNameLbl.htmlFor = 'dept-name';
    const deptNameSel = el('select', 'form-select') as HTMLSelectElement; deptNameSel.id = 'dept-name';
    ['' , 'Day Surgery Unit', 'ICU', 'CSSD', 'ED', 'Theatres'].forEach(opt => {
      const o = el('option') as HTMLOptionElement; o.value = opt; o.textContent = opt || '—';
      deptNameSel.appendChild(o);
    });
    deptNameField.appendChild(deptNameLbl); deptNameField.appendChild(deptNameSel);
    const closeBtn = el('button', 'dept-panel__close') as HTMLButtonElement;
    closeBtn.type = 'button'; closeBtn.setAttribute('aria-label', 'Close department');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => renderDepartmentEmpty(panelEl));
    titleBar.appendChild(deptNameField); titleBar.appendChild(closeBtn);
    panelEl.appendChild(titleBar);

    // Two-column body
    const body = el('div', 'dept-panel__body');

    // Left column: Address + Main Contact
    const leftCol = el('div', 'dept-panel__col');

    const addrCard = sectionCard('Department Address:');
    addrCard.appendChild(labeledInput('dept-attn', 'Attn'));
    addrCard.appendChild(labeledInput('dept-addr', 'Address'));
    addrCard.appendChild(labeledInput('dept-addr2', 'Address 2'));
    addrCard.appendChild(labeledInput('dept-suburb', 'Suburb'));
    addrCard.appendChild(stateCodeRow('dept-state', 'dept-code'));
    addrCard.appendChild(labeledInput('dept-country', 'Country'));
    leftCol.appendChild(addrCard);

    const contactCard = sectionCard('Main Contact:');
    contactCard.appendChild(labeledSelect('dept-contact-name', 'Name'));
    const useDefRow = el('div', 'form-inline');
    const useDefCb = el('input', 'form-checkbox') as HTMLInputElement; useDefCb.type = 'checkbox'; useDefCb.id = 'dept-use-default';
    const useDefLbl = el('label', 'form-check-label', 'Use Default Delivery Address') as HTMLLabelElement; useDefLbl.htmlFor = 'dept-use-default';
    useDefRow.appendChild(useDefCb); useDefRow.appendChild(useDefLbl);
    contactCard.appendChild(useDefRow);
    contactCard.appendChild(labeledSelect('dept-transport', 'Transport Case'));
    leftCol.appendChild(contactCard);

    // Right column: Contact Dept + Quotation Setup
    const rightCol = el('div', 'dept-panel__col');

    const contDeptCard = sectionCard('Contact Department:');
    contDeptCard.appendChild(labeledInput('dept-reception', 'Reception', 'email'));
    contDeptCard.appendChild(labeledInput('dept-fax', 'Fax'));
    contDeptCard.appendChild(labeledInput('dept-email', 'Email', 'email'));
    rightCol.appendChild(contDeptCard);

    const quotCard = sectionCard('Quotation Setup:');
    quotCard.appendChild(doubleCheckRow('dept-quote', 'Quote', 'dept-send-spreadsheet', 'Send Spreadsheet', false));
    quotCard.appendChild(labeledInput('dept-quot-attn', 'Attn To'));
    quotCard.appendChild(labeledInput('dept-quot-send-to', 'Send To', 'email'));
    quotCard.appendChild(labeledInput('dept-po-number', 'PO Number'));
    quotCard.appendChild(labeledInput('dept-po-expiry', 'PO Expiry', 'date'));
    quotCard.appendChild(labeledInput('dept-inv-limit', 'Invoice/Quote Limit', 'number'));
    quotCard.appendChild(checkRow('dept-stop-reminders', 'Stop Quote Reminders', false));
    quotCard.appendChild(labeledSelect('dept-sales-rep', 'Sales Representative'));
    rightCol.appendChild(quotCard);

    // eWay transfer button inside dept panel
    const deptFooter = el('div', 'dept-panel__footer');
    const transferBtn = el('button', 'btn btn--secondary') as HTMLButtonElement;
    transferBtn.type = 'button'; transferBtn.textContent = 'Transfer eWay Carts';
    deptFooter.appendChild(transferBtn);

    body.appendChild(leftCol); body.appendChild(rightCol);
    panelEl.appendChild(body);
    panelEl.appendChild(deptFooter);
  }

  function renderDepartmentEmpty(panelEl: HTMLElement): void {
    panelEl.innerHTML = '';
    const empty = el('div', 'dept-panel__empty');
    const hint = el('p', 'dept-panel__hint', 'No department selected.');
    const newBtn = el('button', 'btn btn--outlined') as HTMLButtonElement;
    newBtn.type = 'button'; newBtn.textContent = '+ New Department';
    newBtn.addEventListener('click', () => renderDepartmentForm(panelEl));
    empty.appendChild(hint); empty.appendChild(newBtn);
    panelEl.appendChild(empty);
  }

  function renderDepartmentPanel(): HTMLElement {
    const panel = el('div', 'dept-panel section-card');
    panel.id = 'dept-management-panel';
    renderDepartmentEmpty(panel);
    return panel;
  }

  // --- General Setup Footer ------------------------------------------

  function renderGeneralSetupFooter(deptPanel: HTMLElement): HTMLElement {
    const footer = el('div', 'general-setup__footer');

    const tubField = el('div', 'form-field');
    const tubLbl = el('label', 'form-label', 'Tub Label:') as HTMLLabelElement; tubLbl.htmlFor = 'gs-tub-label';
    const tubSel = el('select', 'form-select') as HTMLSelectElement; tubSel.id = 'gs-tub-label';
    const tubEmpty = el('option') as HTMLOptionElement; tubEmpty.value = ''; tubSel.appendChild(tubEmpty);
    tubField.appendChild(tubLbl); tubField.appendChild(tubSel);

    const ewayField = el('div', 'form-field');
    const ewayLbl = el('label', 'form-label', 'eWay Company:') as HTMLLabelElement; ewayLbl.htmlFor = 'gs-eway-company';
    const ewaySel = el('select', 'form-select') as HTMLSelectElement; ewaySel.id = 'gs-eway-company';
    const ewayEmpty = el('option') as HTMLOptionElement; ewayEmpty.value = ''; ewaySel.appendChild(ewayEmpty);
    ewayField.appendChild(ewayLbl); ewayField.appendChild(ewaySel);

    const ewayLink = document.createElement('a');
    ewayLink.className = 'eway-link';
    ewayLink.href = '#';
    ewayLink.textContent = 'Use this eWay Connector for hospitals';

    const transferBtn = el('button', 'btn btn--secondary') as HTMLButtonElement;
    transferBtn.type = 'button'; transferBtn.textContent = 'Transfer eWay Carts';

    const newDeptBtn = el('button', 'btn btn--outlined') as HTMLButtonElement;
    newDeptBtn.type = 'button'; newDeptBtn.textContent = '+ New Department';
    newDeptBtn.addEventListener('click', () => renderDepartmentForm(deptPanel));

    footer.appendChild(tubField);
    footer.appendChild(ewayField);
    footer.appendChild(ewayLink);
    footer.appendChild(transferBtn);
    footer.appendChild(newDeptBtn);
    return footer;
  }

  // --- Main renderer -------------------------------------------------

  export function renderGeneralSetup(_state: State.CustomerState): HTMLElement {
    const tab = el('div', 'tab-content tab-content--general-setup');
    const content = el('div', 'general-setup');

    // Row 1: 4 section columns
    const row1 = el('div', 'general-setup__row');
    row1.appendChild(renderDefaultDepartment());
    row1.appendChild(renderQuotationSetup());
    row1.appendChild(renderInvoiceSetup());
    row1.appendChild(renderServiceReportSetup());

    // Row 2: Left stack (Delivery + Freight) | Right Department Panel
    const row2 = el('div', 'general-setup__row general-setup__row--bottom');

    const leftStack = el('div', 'general-setup__left-stack');
    leftStack.appendChild(renderDefaultDelivery());
    leftStack.appendChild(renderFreightSetup());

    const deptPanel = renderDepartmentPanel();

    row2.appendChild(leftStack);
    row2.appendChild(deptPanel);

    content.appendChild(row1);
    content.appendChild(row2);
    content.appendChild(renderGeneralSetupFooter(deptPanel));

    tab.appendChild(content);
    return tab;
  }

}
