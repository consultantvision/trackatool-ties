// Contacts tab — full implementation.
// Table of contacts with Name, Position/Department, Phone, Mobile/Fax, Email.

namespace CustomerDetails.Tabs {

  export function renderContacts(_state: State.CustomerState): HTMLElement {
    const D = document;

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

    const POSITIONS = [
      'NUM', 'CSSD NUM', 'Perioperative service manager', 'Theatre Manager',
      'Nurse Educator', 'Administration Manager', 'Accounts', 'Biomedical',
    ];
    const DEPARTMENTS = [
      'Theatre', 'CSSD', 'ICU', 'ED', 'Day Surgery Unit',
      'Administration', 'Accounts', 'Anaesthetics', 'Wards',
    ];

    interface ContactData {
      name: string; pos: string; dept: string;
      phone: string; mobile: string; email: string;
    }

    const SAMPLES: ContactData[] = [
      { name: 'Liz Drabble',    pos: '',                            dept: 'Theatre',         phone: '(07) 3834 6171', mobile: '',              email: 'liz.drabble@healthscope.com.au'   },
      { name: 'Group Inbox',    pos: '',                            dept: 'CSSD',            phone: '',               mobile: '',              email: 'BPH.CSSD@healthscope.com.au'      },
      { name: 'Sarah Bates',    pos: 'Perioperative service manager', dept: 'CSSD',          phone: '',               mobile: '',              email: 'sarah.bates@healthscope.com.au'   },
      { name: 'Lindsay Hill',   pos: 'NUM',                         dept: 'CSSD',            phone: '',               mobile: '',              email: 'Lindsay.hill@healthscope.com.au'  },
      { name: 'Jag',            pos: '',                            dept: 'CSSD',            phone: '',               mobile: '',              email: 'jac_moh@yahoo.co.uk'              },
      { name: 'Amber Dempsey',  pos: 'CSSD NUM',                    dept: 'CSSD',            phone: '(07) 3834 6111', mobile: '',              email: 'amber.dempsey@healthscope.com.au' },
      { name: 'Julie Booth',    pos: '',                            dept: 'CSSD',            phone: '',               mobile: '',              email: 'julie.booth@healthscope.com.au'   },
      { name: 'Katie Drew',     pos: 'NUM',                         dept: 'Day Surgery Unit', phone: '',              mobile: '(07) 3834 6276', email: 'katie.drew@healthscope.com.au'   },
    ];

    function makeRow(c: ContactData): HTMLElement {
      const row = div('contacts-row');

      // Name — combo input + dropdown arrow
      const nameCell = div('contacts-cell contacts-cell--name');
      const nameWrap = div('contacts-name-wrap');
      const nameInp = inp('text', 'form-input', c.name);
      nameInp.placeholder = 'Name';
      const dropBtn = mkBtn('name-dropdown-btn', '▾');
      dropBtn.setAttribute('aria-label', 'Show contact list');
      nameWrap.appendChild(nameInp);
      nameWrap.appendChild(dropBtn);
      nameCell.appendChild(nameWrap);
      row.appendChild(nameCell);

      // Position (top) + Department (bottom) stacked
      const posDeptCell = div('contacts-cell contacts-cell--pos-dept');
      const posSel = sel('form-select', POSITIONS, c.pos);
      const deptSel = sel('form-select', DEPARTMENTS, c.dept);
      posDeptCell.appendChild(posSel);
      posDeptCell.appendChild(deptSel);
      row.appendChild(posDeptCell);

      // Phone Ext
      const phoneCell = div('contacts-cell contacts-cell--phone');
      phoneCell.appendChild(inp('tel', 'form-input', c.phone));
      row.appendChild(phoneCell);

      // Mobile / Fax
      const mobileCell = div('contacts-cell contacts-cell--mobile');
      mobileCell.appendChild(inp('tel', 'form-input', c.mobile));
      row.appendChild(mobileCell);

      // Email
      const emailCell = div('contacts-cell contacts-cell--email');
      emailCell.appendChild(inp('email', 'form-input', c.email));
      row.appendChild(emailCell);

      // Delete
      const delCell = div('contacts-cell contacts-cell--del');
      const delBtn = mkBtn('btn-trash', '×');
      delBtn.setAttribute('aria-label', 'Delete contact');
      delBtn.addEventListener('click', () => row.remove());
      delCell.appendChild(delBtn);
      row.appendChild(delCell);

      return row;
    }

    // --- Build tab ---
    const tab = D.createElement('div');
    tab.className = 'tab-content tab-content--contacts';
    const wrapper = div('contacts-tab');

    // Header row
    const header = div('contacts-table__header');
    ([
      ['contacts-cell--name',     ['Contact Name']],
      ['contacts-cell--pos-dept', ['Contact Position & Department']],
      ['contacts-cell--phone',    ['Phone', 'Ext']],
      ['contacts-cell--mobile',   ['Mobile', 'Fax']],
      ['contacts-cell--email',    ['Email']],
      ['contacts-cell--del',      ['']],
    ] as [string, string[]][]).forEach(([cls, lines]) => {
      const h = div('contacts-header-col ' + cls);
      const top = D.createElement('span'); top.textContent = lines[0] || '';
      h.appendChild(top);
      if (lines.length > 1) {
        const sub = D.createElement('span');
        sub.className = 'contacts-sub-label';
        sub.textContent = lines[1] || '';
        h.appendChild(sub);
      }
      header.appendChild(h);
    });

    // Body
    const tbody = div('contacts-table__body');
    SAMPLES.forEach(c => tbody.appendChild(makeRow(c)));

    // Add contact button
    const addRow = div('contacts-add-row');
    const addBtn = mkBtn('btn btn--outlined', '+ Add Contact');
    addBtn.addEventListener('click', () =>
      tbody.appendChild(makeRow({ name: '', pos: '', dept: '', phone: '', mobile: '', email: '' }))
    );
    addRow.appendChild(addBtn);

    wrapper.appendChild(header);
    wrapper.appendChild(tbody);
    wrapper.appendChild(addRow);
    tab.appendChild(wrapper);
    return tab;
  }

}
