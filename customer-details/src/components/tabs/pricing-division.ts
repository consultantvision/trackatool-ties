// Pricing & Division Setup tab — full implementation.
// Division Setup table: Division, Discount %, Quote, PO Number, PO Expiry, Turnaround Time.

namespace CustomerDetails.Tabs {

  export function renderPricingDivision(_state: State.CustomerState): HTMLElement {
    const D = document;
    let rowIdx = 0;

    // Local helpers (function-scoped — no namespace conflicts)
    function div(cls: string): HTMLDivElement {
      const e = D.createElement('div'); e.className = cls; return e;
    }
    function inp(type: string, cls: string, val = ''): HTMLInputElement {
      const e = D.createElement('input'); e.type = type; e.className = cls; e.value = val; return e;
    }
    function mkBtn(cls: string, text: string): HTMLButtonElement {
      const e = D.createElement('button'); e.type = 'button'; e.className = cls; e.textContent = text; return e;
    }
    function sel(cls: string, opts: string[], val = ''): HTMLSelectElement {
      const s = D.createElement('select'); s.className = cls;
      const empty = D.createElement('option'); empty.value = ''; empty.textContent = '—'; s.appendChild(empty);
      opts.forEach(o => {
        const op = D.createElement('option'); op.value = o; op.textContent = o; s.appendChild(op);
      });
      if (val) s.value = val;
      return s;
    }

    const DIVISIONS = [
      'Instrument Repair', 'Instrument Modification', 'SILM - Commission',
      'Scope Repair - Rigid', 'Scope Repair - Flexible', 'Power Tool Repair',
      'Dental Drill Repair', 'Laser Marking - Standard', 'Instrument Refurbishment',
      'Camera/Coupler Repair', 'Endoscopy Repair', 'Loaner Equipment',
    ];
    const TURNAROUNDS = ['1 Day', '2 Days', '3 Days', '1 Week', '2 Weeks', '3 Weeks', '4 Weeks'];

    interface DivisionData {
      division: string; discount: number; quote: boolean;
      poNumber: string; poExpiry: string; turnaround: string;
    }

    const SAMPLES: DivisionData[] = [
      { division: 'Instrument Repair',        discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: '1 Week'  },
      { division: 'Instrument Modification',  discount: 0,   quote: true,  poNumber: '', poExpiry: '', turnaround: ''        },
      { division: 'SILM - Commission',         discount: 100, quote: false, poNumber: '', poExpiry: '', turnaround: '3 Days'  },
      { division: 'Scope Repair - Rigid',      discount: 0,   quote: true,  poNumber: '', poExpiry: '', turnaround: '2 Weeks' },
      { division: 'Power Tool Repair',         discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: '1 Week'  },
      { division: 'Dental Drill Repair',       discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: '1 Week'  },
      { division: 'Laser Marking - Standard',  discount: 100, quote: false, poNumber: '', poExpiry: '', turnaround: '3 Days'  },
      { division: 'Instrument Refurbishment',  discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: '1 Week'  },
      { division: 'Scope Repair - Flexible',   discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: ''        },
      { division: 'Camera/Coupler Repair',     discount: 10,  quote: true,  poNumber: '', poExpiry: '', turnaround: ''        },
    ];

    function makeRow(d: DivisionData): HTMLElement {
      const id = ++rowIdx;
      const row = div('division-row');

      // Division
      const divCell = div('division-cell division-cell--name');
      divCell.appendChild(sel('form-select', DIVISIONS, d.division));
      row.appendChild(divCell);

      // Discount %
      const discCell = div('division-cell division-cell--discount');
      const discInp = inp('number', 'form-input form-input--right', String(d.discount));
      discInp.min = '0'; discInp.max = '100';
      discCell.appendChild(discInp);
      row.appendChild(discCell);

      // Quote checkbox
      const quoteCell = div('division-cell division-cell--quote');
      const quoteCb = D.createElement('input');
      quoteCb.type = 'checkbox'; quoteCb.id = `dv-quote-${id}`;
      quoteCb.className = 'form-checkbox'; quoteCb.checked = d.quote;
      quoteCell.appendChild(quoteCb);
      row.appendChild(quoteCell);

      // PO Number
      const poCell = div('division-cell division-cell--po');
      poCell.appendChild(inp('text', 'form-input', d.poNumber));
      row.appendChild(poCell);

      // PO Expiry
      const expiryCell = div('division-cell division-cell--expiry');
      expiryCell.appendChild(inp('date', 'form-input', d.poExpiry));
      row.appendChild(expiryCell);

      // Turnaround Time
      const taCell = div('division-cell division-cell--turnaround');
      taCell.appendChild(sel('form-select', TURNAROUNDS, d.turnaround));
      row.appendChild(taCell);

      // Delete
      const delCell = div('division-cell division-cell--del');
      const delBtn = mkBtn('btn-trash', '×');
      delBtn.setAttribute('aria-label', 'Delete division');
      delBtn.addEventListener('click', () => row.remove());
      delCell.appendChild(delBtn);
      row.appendChild(delCell);

      return row;
    }

    // --- Build tab ---
    const tab = D.createElement('div');
    tab.className = 'tab-content tab-content--pricing-division';
    const wrapper = div('pricing-division-tab');

    // Section title
    const title = D.createElement('h3');
    title.className = 'division-setup-title';
    title.textContent = 'Division Setup';
    wrapper.appendChild(title);

    // Table container
    const table = div('division-table');

    // Header row
    const header = div('division-table__header');
    ([
      ['division-cell--name',       'Division'],
      ['division-cell--discount',   'Discount %'],
      ['division-cell--quote',      'Quote'],
      ['division-cell--po',         'PO Number'],
      ['division-cell--expiry',     'PO Expiry'],
      ['division-cell--turnaround', 'Turnaround Time'],
      ['division-cell--del',        ''],
    ] as [string, string][]).forEach(([cls, text]) => {
      const h = div('division-header-col ' + cls);
      h.textContent = text;
      header.appendChild(h);
    });
    table.appendChild(header);

    // Body (scrollable)
    const tbody = div('division-table__body');
    SAMPLES.forEach(d => tbody.appendChild(makeRow(d)));
    table.appendChild(tbody);

    // Add button row
    const addRow = div('division-add-row');
    const addBtn = mkBtn('btn btn--outlined', '+ Add Division');
    addBtn.addEventListener('click', () =>
      tbody.appendChild(makeRow({ division: '', discount: 0, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' }))
    );
    addRow.appendChild(addBtn);
    table.appendChild(addRow);

    wrapper.appendChild(table);
    tab.appendChild(wrapper);
    return tab;
  }

}
