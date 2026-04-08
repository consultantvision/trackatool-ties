// Tray Setup tab — full implementation.
// Left: Trays table + Tray Templates table (each with pagination).
// Right sidebar: Add New Tray form + Add New Tray Template form.

namespace CustomerDetails.Tabs {

  export function renderTraySetup(_state: State.CustomerState): HTMLElement {
    const D = document;

    function div(cls: string): HTMLDivElement { const e = D.createElement('div'); e.className = cls; return e; }
    function inp(type: string, cls: string, placeholder = ''): HTMLInputElement { const e = D.createElement('input'); e.type = type; e.className = cls; e.placeholder = placeholder; return e; }
    function ff(labelText: string, inputEl: HTMLElement): HTMLElement {
      const f = div('form-field');
      const l = D.createElement('label'); l.className = 'form-label'; l.textContent = labelText;
      f.appendChild(l); f.appendChild(inputEl); return f;
    }
    function mkBtn(cls: string, text: string): HTMLButtonElement { const b = D.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = text; return b; }

    // --- Sample data ---
    const TRAYS: string[][] = [
      ['Hand & Foot Bone Tray 10',         'HFB 10',  'Hand & Foot Bone Tray',         '24/04/2023', ''],
      ['Cystoscopy Tray 2',                'CYST2',   'Cystoscopy Tray',               '12/02/2019', ''],
      ['Cystoscopy Tray 3',                'CYST 3',  'Cystoscopy Tray',               '19/03/2020', ''],
      ['Cystoscopy Tray 4',                'CYST 4',  'Cystoscopy Tray',               '21/04/2020', ''],
      ['Micro Vascular Upper Limb Tray 1', 'MVUL 1',  'Micro Vascular Upper Limb Tray', '7/06/2022', ''],
      ['Micro Vascular Upper Limb Tray 2', 'MVUL 2',  'Micro Vascular Upper Limb Tray', '8/06/2023', ''],
      ['Micro Vascular Upper Limb Tray 3', 'MVUL 3',  'Micro Vascular Upper Limb Tray', '21/05/2020', ''],
      ['Minor Ortho Bone Tray 1',          'MB 1',    '',                              '',           ''],
      ['Minor Ortho Bone Tray 2',          'MB 2',    '',                              '5/08/2013',  ''],
      ['Minor Ortho Bone Tray 3',          'MB 3',    '',                              '29/07/2013', ''],
      ['Minor Ortho Bone Tray 4',          'MB 4',    '',                              '',           ''],
      ['Minor Ortho Bone Tray 5',          'MB 5',    '',                              '3/05/2013',  ''],
      ['Minor Ortho Bone Tray 6',          'MB 6',    '',                              '',           ''],
    ];

    const TEMPLATES: string[][] = [
      ['Hand & Foot Bone Tray',           'HFB',  '', '24', ''],
      ['ACL Knee Hamstring Set',          'ACL',  '', '48', ''],
      ['Acumed Bone Graft Instrument Set','ABG',  '', '48', ''],
      ['Arthroscopy Hip Extras Tray',     'AHE',  '', '24', ''],
      ['Battery Power Pro',              'BPP',  '', '',   ''],
      ['Arthroscopy Wrist Tray',         'AW',   '', '24', ''],
      ['Cystoscopy Tray',                'CYST', '', '24', ''],
      ['Grommet Tray',                   'EG',   '', '24', ''],
      ['Fess Tray',                      'FESS', '', '24', ''],
      ['Hand & Foot Soft Tissue Tray',   'HFS',  '', '24', ''],
      ['Knee Arthroscopy Tray',          'KAS',  '', '24', ''],
    ];

    // --- Table builder ---
    function buildTable(
      cols: string[], rows: string[][], gridTpl: string, total: number
    ): HTMLElement {
      const section = div('tray-table-section');

      // Header
      const header = div('tray-table__header');
      header.style.gridTemplateColumns = gridTpl;
      cols.forEach(col => {
        const th = div('tray-table__th');
        const name = D.createElement('span'); name.textContent = col;
        const arrow = D.createElement('span'); arrow.className = 'sort-arrow'; arrow.textContent = '▼';
        th.appendChild(name); th.appendChild(arrow);
        header.appendChild(th);
      });
      section.appendChild(header);

      // Body
      const tbody = div('tray-table__body');
      rows.forEach((rowData, idx) => {
        const row = div('tray-row' + (idx === 0 ? ' is-selected' : ''));
        row.style.gridTemplateColumns = gridTpl;
        rowData.forEach(cell => {
          const td = div('tray-cell'); td.textContent = cell; row.appendChild(td);
        });
        row.addEventListener('click', () => {
          section.querySelectorAll('.tray-row').forEach(r => r.classList.remove('is-selected'));
          row.classList.add('is-selected');
        });
        tbody.appendChild(row);
      });
      section.appendChild(tbody);

      // Pagination
      const pg = div('tray-pagination');
      const recLabel = D.createElement('span'); recLabel.textContent = 'Record:';
      pg.appendChild(recLabel);
      ['|◄', '◄'].forEach(t => pg.appendChild(mkBtn('tray-pagination__nav-btn', t)));
      const info = D.createElement('span'); info.className = 'tray-pg-info'; info.textContent = ` 1 of ${total} `;
      pg.appendChild(info);
      ['►', '►|'].forEach(t => pg.appendChild(mkBtn('tray-pagination__nav-btn', t)));
      const filterIcon = D.createElement('span'); filterIcon.textContent = '🔍';
      filterIcon.style.marginLeft = '8px';
      const filterLbl = D.createElement('span'); filterLbl.textContent = ' No Filter';
      const searchLbl = D.createElement('span'); searchLbl.textContent = ' Search';
      searchLbl.style.marginLeft = '8px';
      const searchInp = inp('text', 'tray-search-input');
      pg.appendChild(filterIcon); pg.appendChild(filterLbl);
      pg.appendChild(searchLbl); pg.appendChild(searchInp);
      section.appendChild(pg);

      return section;
    }

    // --- Build tab ---
    const tab = D.createElement('div'); tab.className = 'tab-content tab-content--tray-setup';
    const layout = div('tray-setup-tab');

    // Main area
    const main = div('tray-setup__main');

    main.appendChild(buildTable(
      ['Tray Name', 'Tray Name Marked', 'Tray Template', 'Last Service', 'Tray Reference'],
      TRAYS, '2fr 1fr 2fr 90px 90px', 639
    ));

    const templLabel = div('tray-section-label'); templLabel.textContent = 'Tray Templates';
    main.appendChild(templLabel);

    main.appendChild(buildTable(
      ['Tray Name', 'Tray Name Marked', 'Faculty', 'Service Months', 'Tray Reference'],
      TEMPLATES, '2fr 1fr 100px 80px 90px', 43
    ));

    // Sidebar
    const sidebar = div('tray-setup__sidebar');

    // Add New Tray
    const addTraySection = div('tray-sidebar-section');
    const addTrayHdr = div('tray-sidebar-section__header');
    const addTrayLbl = D.createElement('span'); addTrayLbl.className = 'tray-sidebar-section__label'; addTrayLbl.textContent = 'Add New Tray';
    const addTrayBtn = mkBtn('btn btn--outlined btn--sm', '+ Add New Tray');
    addTrayHdr.appendChild(addTrayLbl); addTrayHdr.appendChild(addTrayBtn);
    addTraySection.appendChild(addTrayHdr);
    addTraySection.appendChild(ff('Full Tray Name', inp('text', 'form-input')));
    addTraySection.appendChild(ff('Name Marked', inp('text', 'form-input')));
    sidebar.appendChild(addTraySection);

    // Add New Tray Template
    const addTmplSection = div('tray-sidebar-section');
    const tmplTitle = div('tray-sidebar-section__title'); tmplTitle.textContent = 'Add New Tray Template';
    addTmplSection.appendChild(tmplTitle);
    addTmplSection.appendChild(ff('Full Tray Name', inp('text', 'form-input')));
    addTmplSection.appendChild(ff('Name Marked', inp('text', 'form-input')));

    // Color swatches
    const swatches = div('tray-color-swatches');
    const swatchLabels = div('tray-swatch-labels');
    ([['#93c5fd', 'Total Trays'], ['#86efac', 'Suffix'], ['#d8b4fe', 'Service Month:']] as [string, string][]).forEach(([color, label]) => {
      const sw = div('tray-color-swatch'); sw.style.backgroundColor = color; swatches.appendChild(sw);
      const lb = div('tray-swatch-label'); lb.textContent = label; swatchLabels.appendChild(lb);
    });
    addTmplSection.appendChild(swatches);
    addTmplSection.appendChild(swatchLabels);

    // Faculty select
    const facultySel = D.createElement('select'); facultySel.className = 'form-select';
    ['', 'Anaesthetics', 'Cardiology', 'General Surgery', 'Neurosurgery', 'Ophthalmology', 'Orthopaedics', 'Urology'].forEach(o => {
      const op = D.createElement('option'); op.value = o; op.textContent = o || '—'; facultySel.appendChild(op);
    });
    addTmplSection.appendChild(ff('Faculty', facultySel));
    addTmplSection.appendChild(mkBtn('btn btn--outlined btn--sm', '+ Add New Tray Template'));

    sidebar.appendChild(addTmplSection);

    layout.appendChild(main);
    layout.appendChild(sidebar);
    tab.appendChild(layout);
    return tab;
  }

}
