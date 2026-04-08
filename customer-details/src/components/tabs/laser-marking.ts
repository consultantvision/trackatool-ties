// Laser Marking & Management tab — full implementation.
// Left: Management settings + ID Number table.
// Right: Action buttons (Decommission, Export, Email).

namespace CustomerDetails.Tabs {

  export function renderLaserMarking(_state: State.CustomerState): HTMLElement {
    const D = document;

    function div(cls: string): HTMLDivElement { const e = D.createElement('div'); e.className = cls; return e; }
    function inp(type: string, cls: string, val = ''): HTMLInputElement { const e = D.createElement('input'); e.type = type; e.className = cls; e.value = val; return e; }
    function lbl(forId: string, text: string): HTMLLabelElement { const e = D.createElement('label'); e.htmlFor = forId; e.className = 'form-label'; e.textContent = text; return e; }

    function chkRow(id: string, text: string, checked: boolean): HTMLElement {
      const row = div('form-inline');
      const cb = D.createElement('input'); cb.type = 'checkbox'; cb.id = id; cb.className = 'form-checkbox'; cb.checked = checked;
      const l = lbl(id, text);
      row.appendChild(cb); row.appendChild(l);
      return row;
    }

    function makeIdRow(nextId: string): HTMLElement {
      const row = div('lm-id-row');
      row.appendChild(inp('number', 'form-input', nextId));
      row.appendChild(inp('text', 'form-input lm-last-id', ''));
      const fmtSel = D.createElement('select'); fmtSel.className = 'form-select';
      const empty = D.createElement('option'); empty.value = ''; fmtSel.appendChild(empty);
      row.appendChild(fmtSel);
      const actions = div('lm-row-actions');
      const del = D.createElement('button'); del.type = 'button'; del.className = 'btn-trash'; del.textContent = '×'; del.setAttribute('aria-label', 'Delete row');
      del.addEventListener('click', () => row.remove());
      actions.appendChild(del);
      row.appendChild(actions);
      return row;
    }

    // --- Build ---
    const tab = D.createElement('div'); tab.className = 'tab-content tab-content--laser-marking';
    const layout = div('laser-marking-tab');

    // Left panel
    const left = div('laser-marking__left');

    left.appendChild(chkRow('lm-mgmt', 'Management Services:', true));
    left.appendChild(chkRow('lm-assign', 'Assign ID Numbers', true));

    const prefixRow = div('lm-prefix-row');
    const prefixInp = inp('text', 'form-input lm-prefix-input', 'BPH'); prefixInp.id = 'lm-prefix';
    prefixRow.appendChild(lbl('lm-prefix', 'ClientPrefix:'));
    prefixRow.appendChild(prefixInp);
    left.appendChild(prefixRow);

    // ID table
    const tableWrap = div('lm-id-table-wrap');

    const header = div('lm-id-table__header');
    ['Next ID Number', 'Last ID Number', 'ID Format', ''].forEach(t => {
      const th = div('lm-id-table__th'); th.textContent = t; header.appendChild(th);
    });
    tableWrap.appendChild(header);

    const tbody = div('lm-id-table__body');
    tbody.appendChild(makeIdRow('30090'));
    tableWrap.appendChild(tbody);

    // Add row button below table
    const addIdBtn = D.createElement('button'); addIdBtn.type = 'button'; addIdBtn.className = 'btn btn--outlined lm-add-id-btn'; addIdBtn.textContent = '+ Add ID Range';
    addIdBtn.addEventListener('click', () => tbody.appendChild(makeIdRow('')));
    tableWrap.appendChild(addIdBtn);

    left.appendChild(tableWrap);

    // Right panel — action buttons
    const right = div('laser-marking__right');

    ([
      ['🗂', 'Decommission Instrument'],
      ['📊', "Export Instrument ID's"],
      ['📧', 'Email Service Report Copies'],
    ] as [string, string][]).forEach(([icon, text]) => {
      const btn = D.createElement('button'); btn.type = 'button'; btn.className = 'lm-action-btn';
      const ic = D.createElement('span'); ic.className = 'lm-action-btn__icon'; ic.textContent = icon;
      const lb = D.createElement('span'); lb.textContent = text;
      btn.appendChild(ic); btn.appendChild(lb);
      right.appendChild(btn);
    });

    layout.appendChild(left);
    layout.appendChild(right);
    tab.appendChild(layout);
    return tab;
  }

}
