"use strict";
// All TypeScript interfaces for the Customer Details UI.
// No logic — pure type declarations only.
// Application state — CustomerState class extending EventTarget.
// Fires 'change' on data updates and 'tabchange' on tab switches.
var CustomerDetails;
(function (CustomerDetails) {
    var State;
    (function (State) {
        function emptyFacilityAddress() {
            return { hospitalAddress: '', suburb: '', state: '', postcode: '', country: '' };
        }
        function emptyPostalAddress() {
            return { mail: '', suburb: '', state: '', postcode: '', country: '' };
        }
        function emptyMainDetails() {
            return { switchboard: '', fax: '', email: '', website: '' };
        }
        function emptyDepartmentRecord() {
            return {
                name: '',
                address: { attn: '', address: '', address2: '', suburb: '', state: '', postcode: '', country: '' },
                mainContact: { name: '', useDefaultDeliveryAddress: false, transportCase: '' },
                contactDetails: { reception: '', fax: '', email: '' },
                quotationSetup: { quote: false, sendSpreadsheet: false, attnTo: '', sendTo: '', poNumber: '', poExpiry: '', invoiceQuoteLimit: 0, stopQuoteReminders: false, salesRepresentative: '' },
            };
        }
        function emptyGeneralSetup() {
            return {
                departmentSetup: { department: '', contact: '' },
                quotationSetup: { quote: false, includeExcel: false, attnTo: '', sendTo: '', sendConfirmationOnApproval: false, stopQuoteReminders: false, reminderEvery: 0 },
                invoiceSetup: { invoiceQuoteLimit: 0, invoiceToPayee: false, emailInvoice: false, includeExcel: false, attnTo: '', sendTo: '', poNumber: '', poExpiry: '' },
                serviceReportSetup: { emailReport: false, includeExcel: false, attnTo: '', sendTo: '' },
                deliverySetup: { deliveryName: '', department: '', attn: '', address: '', address2: '', suburb: '', state: '', postcode: '', country: '' },
                freightSetup: { company: '', accountNumber: '', phone: '', service: '', insurance: '', printDespatchLabels: false, transportCase: '', freightIncoming: 0, freightOutgoing: 0, administration: 0 },
                departments: [],
                activeDepartmentIndex: null,
                tubLabel: '',
                ewayCompany: '',
            };
        }
        function emptyCustomer() {
            return {
                customerId: '',
                name: '',
                status: 'active',
                showInactiveCustomers: false,
                salesRepresentative: '',
                salesRegion: '',
                corporateGroup: '',
                facilityAddress: emptyFacilityAddress(),
                postalAddress: emptyPostalAddress(),
                mainDetails: emptyMainDetails(),
                generalSetup: emptyGeneralSetup(),
                activeTab: 'general-setup',
            };
        }
        class CustomerState extends EventTarget {
            _data;
            constructor() {
                super();
                this._data = emptyCustomer();
            }
            get data() {
                // Return a shallow copy to prevent direct mutation
                return { ...this._data };
            }
            get activeTab() {
                return this._data.activeTab;
            }
            update(patch) {
                this._data = { ...this._data, ...patch };
                this.dispatchEvent(new CustomEvent('change', {
                    detail: { data: { ...this._data } },
                }));
            }
            updateGeneralSetup(patch) {
                const updated = { ...this._data.generalSetup, ...patch };
                this.update({ generalSetup: updated });
            }
            setTab(id) {
                this._data.activeTab = id;
                this.dispatchEvent(new CustomEvent('tabchange', {
                    detail: { tabId: id },
                }));
            }
        }
        State.CustomerState = CustomerState;
        function createState() {
            return new CustomerState();
        }
        State.createState = createState;
    })(State = CustomerDetails.State || (CustomerDetails.State = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Page header: Active/Inactive status pills + "Customer Details" title
// + Sales Representative / Sales Region / Corporate Group selects.
var CustomerDetails;
(function (CustomerDetails) {
    var Components;
    (function (Components) {
        function makeSelect(id, label, width) {
            const field = document.createElement('div');
            field.className = 'form-field';
            const lbl = document.createElement('label');
            lbl.className = 'form-label';
            lbl.htmlFor = id;
            lbl.textContent = label + ':';
            const sel = document.createElement('select');
            sel.className = 'form-select';
            sel.id = id;
            if (width)
                sel.style.width = width;
            const empty = document.createElement('option');
            empty.value = '';
            empty.textContent = '';
            sel.appendChild(empty);
            field.appendChild(lbl);
            field.appendChild(sel);
            return field;
        }
        function renderHeader(state) {
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
            function syncPills(status) {
                if (status === 'active') {
                    activeBtn.classList.add('is-selected');
                    inactiveBtn.classList.remove('is-selected');
                }
                else {
                    inactiveBtn.classList.add('is-selected');
                    activeBtn.classList.remove('is-selected');
                }
            }
            activeBtn.addEventListener('click', () => state.update({ status: 'active' }));
            inactiveBtn.addEventListener('click', () => state.update({ status: 'inactive' }));
            state.addEventListener('change', (e) => {
                const detail = e.detail;
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
        Components.renderHeader = renderHeader;
    })(Components = CustomerDetails.Components || (CustomerDetails.Components = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Customer ID + Name (combo input) + Show Inactive Customers checkbox row.
var CustomerDetails;
(function (CustomerDetails) {
    var Components;
    (function (Components) {
        function renderCustomerIdRow(state) {
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
            inactiveCb.addEventListener('change', () => state.update({ showInactiveCustomers: inactiveCb.checked }));
            inactiveLabel.appendChild(inactiveCb);
            inactiveLabel.appendChild(document.createTextNode(' Show Inactive Customers'));
            row.appendChild(idField);
            row.appendChild(nameField);
            row.appendChild(inactiveLabel);
            return row;
        }
        Components.renderCustomerIdRow = renderCustomerIdRow;
    })(Components = CustomerDetails.Components || (CustomerDetails.Components = {}));
})(CustomerDetails || (CustomerDetails = {}));
// 3-column address block: Facility Details | Postal Address | Main Details.
var CustomerDetails;
(function (CustomerDetails) {
    var Components;
    (function (Components) {
        function textField(id, labelText, type = 'text') {
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
        function stateCodeRow(stateId, codeId) {
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
        function renderFacilityColumn() {
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
        function renderPostalColumn() {
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
        function renderMainDetailsColumn() {
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
        function renderAddressSection(_state) {
            const section = document.createElement('section');
            section.className = 'address-section';
            section.appendChild(renderFacilityColumn());
            section.appendChild(renderPostalColumn());
            section.appendChild(renderMainDetailsColumn());
            return section;
        }
        Components.renderAddressSection = renderAddressSection;
    })(Components = CustomerDetails.Components || (CustomerDetails.Components = {}));
})(CustomerDetails || (CustomerDetails = {}));
// 7-tab navigation bar. Listens to state tabchange events to update active styling.
var CustomerDetails;
(function (CustomerDetails) {
    var Components;
    (function (Components) {
        const TAB_DEFINITIONS = [
            { id: 'general-setup', label: 'General Setup', icon: '⌂' },
            { id: 'contacts', label: 'Contacts', icon: '' },
            { id: 'pricing-division', label: 'Pricing & Division Setup', icon: 'Σ' },
            { id: 'new-pricing', label: 'New Pricing Setup', icon: 'Σ' },
            { id: 'payee', label: 'Payee', icon: '' },
            { id: 'laser-marking', label: 'Laser Marking & Management', icon: '✎' },
            { id: 'tray-setup', label: 'Tray Setup', icon: '' },
        ];
        function renderTabNav(state) {
            const nav = document.createElement('nav');
            nav.className = 'tab-nav';
            nav.setAttribute('role', 'tablist');
            const buttons = new Map();
            function setActive(id) {
                buttons.forEach((btn, btnId) => {
                    btn.classList.toggle('tab-nav__btn--active', btnId === id);
                    btn.setAttribute('aria-selected', btnId === id ? 'true' : 'false');
                });
            }
            TAB_DEFINITIONS.forEach((tab) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'tab-nav__btn';
                btn.setAttribute('role', 'tab');
                btn.setAttribute('data-tab-id', tab.id);
                btn.setAttribute('aria-selected', 'false');
                if (tab.icon) {
                    const icon = document.createElement('span');
                    icon.className = 'tab-nav__icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.textContent = tab.icon;
                    btn.appendChild(icon);
                }
                btn.appendChild(document.createTextNode(tab.label));
                btn.addEventListener('click', () => state.setTab(tab.id));
                buttons.set(tab.id, btn);
                nav.appendChild(btn);
            });
            // Sync on tab change
            state.addEventListener('tabchange', (e) => {
                const detail = e.detail;
                setActive(detail.tabId);
            });
            // Set initial active tab
            setActive(state.activeTab);
            return nav;
        }
        Components.renderTabNav = renderTabNav;
    })(Components = CustomerDetails.Components || (CustomerDetails.Components = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Footer action bar: New / Edit / Quick Report buttons.
var CustomerDetails;
(function (CustomerDetails) {
    var Components;
    (function (Components) {
        function renderFooterActions() {
            const footer = document.createElement('footer');
            footer.className = 'footer-actions';
            function makeBtn(label, modifier, iconText) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `btn btn--${modifier}`;
                if (iconText) {
                    const icon = document.createElement('span');
                    icon.className = 'btn-icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.textContent = iconText;
                    btn.appendChild(icon);
                }
                btn.appendChild(document.createTextNode(label));
                return btn;
            }
            const newBtn = makeBtn('New', 'primary', '＋');
            const editBtn = makeBtn('Edit', 'secondary', '✎');
            const reportBtn = makeBtn('Quick Report', 'outlined', '');
            // TODO: wire up action handlers when backend is added
            newBtn.addEventListener('click', () => { });
            editBtn.addEventListener('click', () => { });
            reportBtn.addEventListener('click', () => { });
            const spacer = document.createElement('div');
            spacer.className = 'footer-actions__spacer';
            footer.appendChild(newBtn);
            footer.appendChild(editBtn);
            footer.appendChild(spacer);
            footer.appendChild(reportBtn);
            return footer;
        }
        Components.renderFooterActions = renderFooterActions;
    })(Components = CustomerDetails.Components || (CustomerDetails.Components = {}));
})(CustomerDetails || (CustomerDetails = {}));
// General Setup tab — fully implemented.
// Row 1: 4-column section cards (Dept | Quotation | Invoice | Service Report)
// Row 2: left-stack (Delivery + Freight) | right Department Management Panel
// Footer row: Tub Label / eWay Company / eWay link / buttons
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        // --- Helpers -------------------------------------------------------
        function el(tag, className, text) {
            const e = document.createElement(tag);
            if (className)
                e.className = className;
            if (text)
                e.textContent = text;
            return e;
        }
        function labeledInput(id, labelText, type = 'text') {
            const field = el('div', 'form-field');
            const lbl = el('label', 'form-label', labelText);
            lbl.htmlFor = id;
            const input = el('input', 'form-input');
            input.type = type;
            input.id = id;
            field.appendChild(lbl);
            field.appendChild(input);
            return field;
        }
        function labeledSelect(id, labelText, options = []) {
            const field = el('div', 'form-field');
            const lbl = el('label', 'form-label', labelText);
            lbl.htmlFor = id;
            const sel = el('select', 'form-select');
            sel.id = id;
            ['', ...options].forEach(opt => {
                const o = el('option');
                o.value = opt;
                o.textContent = opt;
                sel.appendChild(o);
            });
            field.appendChild(lbl);
            field.appendChild(sel);
            return field;
        }
        function checkRow(id, labelText, withRemove = true) {
            const row = el('div', 'form-inline');
            const cb = el('input', 'form-checkbox');
            cb.type = 'checkbox';
            cb.id = id;
            const lbl = el('label', 'form-check-label', labelText);
            lbl.htmlFor = id;
            row.appendChild(cb);
            row.appendChild(lbl);
            if (withRemove) {
                const btn = el('button', 'btn-remove');
                btn.type = 'button';
                btn.setAttribute('aria-label', 'Remove');
                btn.textContent = '−';
                row.appendChild(btn);
            }
            return row;
        }
        function doubleCheckRow(id1, label1, id2, label2, withRemove = true) {
            const wrap = el('div', 'form-inline');
            const cb1 = el('input', 'form-checkbox');
            cb1.type = 'checkbox';
            cb1.id = id1;
            const lbl1 = el('label', 'form-check-label', label1);
            lbl1.htmlFor = id1;
            const sep = el('span', 'form-inline-sep', '|');
            const cb2 = el('input', 'form-checkbox');
            cb2.type = 'checkbox';
            cb2.id = id2;
            const lbl2 = el('label', 'form-check-label', label2);
            lbl2.htmlFor = id2;
            wrap.appendChild(cb1);
            wrap.appendChild(lbl1);
            wrap.appendChild(sep);
            wrap.appendChild(cb2);
            wrap.appendChild(lbl2);
            if (withRemove) {
                const btn = el('button', 'btn-remove');
                btn.type = 'button';
                btn.setAttribute('aria-label', 'Remove');
                btn.textContent = '−';
                wrap.appendChild(btn);
            }
            return wrap;
        }
        function sectionCard(titleText) {
            const card = el('div', 'section-card');
            card.appendChild(el('div', 'section-card__title', titleText));
            return card;
        }
        function stateCodeRow(stateId, codeId) {
            const row = el('div', 'form-row--split');
            const sf = el('div', 'form-field');
            const sl = el('label', 'form-label', 'State');
            sl.htmlFor = stateId;
            const si = el('input', 'form-input');
            si.type = 'text';
            si.id = stateId;
            sf.appendChild(sl);
            sf.appendChild(si);
            const cf = el('div', 'form-field form-field--narrow');
            const cl = el('label', 'form-label', 'Code');
            cl.htmlFor = codeId;
            const ci = el('input', 'form-input');
            ci.type = 'text';
            ci.id = codeId;
            cf.appendChild(cl);
            cf.appendChild(ci);
            row.appendChild(sf);
            row.appendChild(cf);
            return row;
        }
        function currencyField(id, labelText) {
            const field = el('div', 'form-field');
            const lbl = el('label', 'form-label', labelText);
            lbl.htmlFor = id;
            const wrap = el('div', 'currency-input-wrap');
            const prefix = el('span', 'currency-prefix', '$');
            const input = el('input', 'form-input form-input--currency');
            input.type = 'number';
            input.id = id;
            input.value = '0.00';
            input.step = '0.01';
            input.min = '0';
            wrap.appendChild(prefix);
            wrap.appendChild(input);
            field.appendChild(lbl);
            field.appendChild(wrap);
            return field;
        }
        // --- Row 1 Section Cards -------------------------------------------
        function renderDefaultDepartment() {
            const card = sectionCard('Default Department Setup:');
            card.appendChild(labeledSelect('gs-department', 'Department'));
            card.appendChild(labeledSelect('gs-contact', 'Contact'));
            return card;
        }
        function renderQuotationSetup() {
            const card = sectionCard('Quotation Setup:');
            card.appendChild(doubleCheckRow('gs-quote', 'Quote', 'gs-quote-excel', 'Include Excel'));
            card.appendChild(labeledInput('gs-quote-attn', 'Attn To'));
            card.appendChild(labeledSelect('gs-quote-send-to', 'Send To'));
            card.appendChild(checkRow('gs-send-confirmation', 'Send Confirmation on Approval'));
            card.appendChild(checkRow('gs-stop-reminders', 'Stop Quote Reminders'));
            card.appendChild(labeledInput('gs-reminder-every', 'Reminder Every', 'number'));
            return card;
        }
        function renderInvoiceSetup() {
            const card = sectionCard('Invoice Setup:');
            const limitRow = el('div', 'form-row--split');
            limitRow.appendChild(labeledInput('gs-inv-limit', 'Invoice/Quote Limit', 'number'));
            const payeeField = el('div', 'form-field');
            const payeeLblSpacer = el('label', 'form-label', '\u00a0');
            const payeeInline = el('div', 'form-inline');
            payeeInline.style.marginBottom = '0';
            const payeeCb = el('input', 'form-checkbox');
            payeeCb.type = 'checkbox';
            payeeCb.id = 'gs-inv-to-payee';
            const payeeLbl = el('label', 'form-check-label', 'Invoice To Payee');
            payeeLbl.htmlFor = 'gs-inv-to-payee';
            const payeeBtn = el('button', 'btn-remove');
            payeeBtn.type = 'button';
            payeeBtn.textContent = '−';
            payeeBtn.setAttribute('aria-label', 'Remove');
            payeeInline.appendChild(payeeCb);
            payeeInline.appendChild(payeeLbl);
            payeeInline.appendChild(payeeBtn);
            payeeField.appendChild(payeeLblSpacer);
            payeeField.appendChild(payeeInline);
            limitRow.appendChild(payeeField);
            card.appendChild(limitRow);
            card.appendChild(doubleCheckRow('gs-email-inv', 'Email Invoice', 'gs-inv-excel', 'Include Excel'));
            card.appendChild(labeledInput('gs-inv-attn', 'Attn To'));
            card.appendChild(labeledSelect('gs-inv-send-to', 'Send To'));
            card.appendChild(labeledInput('gs-po-number', 'PO Number'));
            card.appendChild(labeledInput('gs-po-expiry', 'PO Expiry', 'date'));
            return card;
        }
        function renderServiceReportSetup() {
            const card = sectionCard('Service Report Setup:');
            card.appendChild(doubleCheckRow('gs-email-report', 'Email Report', 'gs-report-excel', 'Include Excel'));
            card.appendChild(labeledInput('gs-report-attn', 'Attn To'));
            card.appendChild(labeledSelect('gs-report-send-to', 'Send To'));
            return card;
        }
        // --- Row 2 Left: Delivery + Freight --------------------------------
        function renderDefaultDelivery() {
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
        function renderFreightSetup() {
            const card = sectionCard('Freight Setup:');
            card.appendChild(labeledSelect('gs-fr-company', 'Company'));
            card.appendChild(labeledInput('gs-fr-account', 'Account #'));
            card.appendChild(labeledInput('gs-fr-phone', 'Phone', 'tel'));
            card.appendChild(labeledSelect('gs-fr-service', 'Service'));
            const insRow = el('div', 'form-row--split');
            insRow.appendChild(labeledInput('gs-fr-insurance', 'Insurance'));
            const despField = el('div', 'form-field');
            const despSpacer = el('label', 'form-label', '\u00a0');
            const despInline = el('div', 'form-inline');
            despInline.style.marginBottom = '0';
            const despCb = el('input', 'form-checkbox');
            despCb.type = 'checkbox';
            despCb.id = 'gs-fr-despatch';
            const despLbl = el('label', 'form-check-label form-check-label--muted', 'Print Item Despatch Labels');
            despLbl.htmlFor = 'gs-fr-despatch';
            const despBtn = el('button', 'btn-remove');
            despBtn.type = 'button';
            despBtn.textContent = '−';
            despBtn.setAttribute('aria-label', 'Remove');
            despInline.appendChild(despCb);
            despInline.appendChild(despLbl);
            despInline.appendChild(despBtn);
            despField.appendChild(despSpacer);
            despField.appendChild(despInline);
            insRow.appendChild(despField);
            card.appendChild(insRow);
            card.appendChild(labeledSelect('gs-fr-transport', 'Transport Case'));
            card.appendChild(currencyField('gs-fr-incoming', 'Freight Incoming'));
            card.appendChild(currencyField('gs-fr-outgoing', 'Freight Outgoing'));
            card.appendChild(currencyField('gs-fr-admin', 'Administration'));
            return card;
        }
        // --- Row 2 Right: Department Management Panel ----------------------
        function renderDepartmentForm(panelEl) {
            panelEl.innerHTML = '';
            // Title bar with department name selector + close button
            const titleBar = el('div', 'dept-panel__titlebar');
            const deptNameField = el('div', 'form-field form-field--inline');
            const deptNameLbl = el('label', 'form-label', 'Department Name');
            deptNameLbl.htmlFor = 'dept-name';
            const deptNameSel = el('select', 'form-select');
            deptNameSel.id = 'dept-name';
            ['', 'Day Surgery Unit', 'ICU', 'CSSD', 'ED', 'Theatres'].forEach(opt => {
                const o = el('option');
                o.value = opt;
                o.textContent = opt || '—';
                deptNameSel.appendChild(o);
            });
            deptNameField.appendChild(deptNameLbl);
            deptNameField.appendChild(deptNameSel);
            const closeBtn = el('button', 'dept-panel__close');
            closeBtn.type = 'button';
            closeBtn.setAttribute('aria-label', 'Close department');
            closeBtn.textContent = '✕';
            closeBtn.addEventListener('click', () => renderDepartmentEmpty(panelEl));
            titleBar.appendChild(deptNameField);
            titleBar.appendChild(closeBtn);
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
            const useDefCb = el('input', 'form-checkbox');
            useDefCb.type = 'checkbox';
            useDefCb.id = 'dept-use-default';
            const useDefLbl = el('label', 'form-check-label', 'Use Default Delivery Address');
            useDefLbl.htmlFor = 'dept-use-default';
            useDefRow.appendChild(useDefCb);
            useDefRow.appendChild(useDefLbl);
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
            const transferBtn = el('button', 'btn btn--secondary');
            transferBtn.type = 'button';
            transferBtn.textContent = 'Transfer eWay Carts';
            deptFooter.appendChild(transferBtn);
            body.appendChild(leftCol);
            body.appendChild(rightCol);
            panelEl.appendChild(body);
            panelEl.appendChild(deptFooter);
        }
        function renderDepartmentEmpty(panelEl) {
            panelEl.innerHTML = '';
            const empty = el('div', 'dept-panel__empty');
            const hint = el('p', 'dept-panel__hint', 'No department selected.');
            const newBtn = el('button', 'btn btn--outlined');
            newBtn.type = 'button';
            newBtn.textContent = '+ New Department';
            newBtn.addEventListener('click', () => renderDepartmentForm(panelEl));
            empty.appendChild(hint);
            empty.appendChild(newBtn);
            panelEl.appendChild(empty);
        }
        function renderDepartmentPanel() {
            const panel = el('div', 'dept-panel section-card');
            panel.id = 'dept-management-panel';
            renderDepartmentEmpty(panel);
            return panel;
        }
        // --- General Setup Footer ------------------------------------------
        function renderGeneralSetupFooter(deptPanel) {
            const footer = el('div', 'general-setup__footer');
            const tubField = el('div', 'form-field');
            const tubLbl = el('label', 'form-label', 'Tub Label:');
            tubLbl.htmlFor = 'gs-tub-label';
            const tubSel = el('select', 'form-select');
            tubSel.id = 'gs-tub-label';
            const tubEmpty = el('option');
            tubEmpty.value = '';
            tubSel.appendChild(tubEmpty);
            tubField.appendChild(tubLbl);
            tubField.appendChild(tubSel);
            const ewayField = el('div', 'form-field');
            const ewayLbl = el('label', 'form-label', 'eWay Company:');
            ewayLbl.htmlFor = 'gs-eway-company';
            const ewaySel = el('select', 'form-select');
            ewaySel.id = 'gs-eway-company';
            const ewayEmpty = el('option');
            ewayEmpty.value = '';
            ewaySel.appendChild(ewayEmpty);
            ewayField.appendChild(ewayLbl);
            ewayField.appendChild(ewaySel);
            const ewayLink = document.createElement('a');
            ewayLink.className = 'eway-link';
            ewayLink.href = '#';
            ewayLink.textContent = 'Use this eWay Connector for hospitals';
            const transferBtn = el('button', 'btn btn--secondary');
            transferBtn.type = 'button';
            transferBtn.textContent = 'Transfer eWay Carts';
            const newDeptBtn = el('button', 'btn btn--outlined');
            newDeptBtn.type = 'button';
            newDeptBtn.textContent = '+ New Department';
            newDeptBtn.addEventListener('click', () => renderDepartmentForm(deptPanel));
            footer.appendChild(tubField);
            footer.appendChild(ewayField);
            footer.appendChild(ewayLink);
            footer.appendChild(transferBtn);
            footer.appendChild(newDeptBtn);
            return footer;
        }
        // --- Main renderer -------------------------------------------------
        function renderGeneralSetup(_state) {
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
        Tabs.renderGeneralSetup = renderGeneralSetup;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Contacts tab — full implementation.
// Table of contacts with Name, Position/Department, Phone, Mobile/Fax, Email.
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderContacts(_state) {
            const D = document;
            // Local helpers (function-scoped — no namespace conflicts)
            function div(cls) {
                const e = D.createElement('div');
                e.className = cls;
                return e;
            }
            function inp(type, cls, val = '') {
                const e = D.createElement('input');
                e.type = type;
                e.className = cls;
                e.value = val;
                return e;
            }
            function mkBtn(cls, text) {
                const e = D.createElement('button');
                e.type = 'button';
                e.className = cls;
                e.textContent = text;
                return e;
            }
            function sel(cls, opts, val = '') {
                const s = D.createElement('select');
                s.className = cls;
                const empty = D.createElement('option');
                empty.value = '';
                empty.textContent = '—';
                s.appendChild(empty);
                opts.forEach(o => {
                    const op = D.createElement('option');
                    op.value = o;
                    op.textContent = o;
                    s.appendChild(op);
                });
                if (val)
                    s.value = val;
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
            const SAMPLES = [
                { name: 'Liz Drabble', pos: '', dept: 'Theatre', phone: '(07) 3834 6171', mobile: '', email: 'liz.drabble@healthscope.com.au' },
                { name: 'Group Inbox', pos: '', dept: 'CSSD', phone: '', mobile: '', email: 'BPH.CSSD@healthscope.com.au' },
                { name: 'Sarah Bates', pos: 'Perioperative service manager', dept: 'CSSD', phone: '', mobile: '', email: 'sarah.bates@healthscope.com.au' },
                { name: 'Lindsay Hill', pos: 'NUM', dept: 'CSSD', phone: '', mobile: '', email: 'Lindsay.hill@healthscope.com.au' },
                { name: 'Jag', pos: '', dept: 'CSSD', phone: '', mobile: '', email: 'jac_moh@yahoo.co.uk' },
                { name: 'Amber Dempsey', pos: 'CSSD NUM', dept: 'CSSD', phone: '(07) 3834 6111', mobile: '', email: 'amber.dempsey@healthscope.com.au' },
                { name: 'Julie Booth', pos: '', dept: 'CSSD', phone: '', mobile: '', email: 'julie.booth@healthscope.com.au' },
                { name: 'Katie Drew', pos: 'NUM', dept: 'Day Surgery Unit', phone: '', mobile: '(07) 3834 6276', email: 'katie.drew@healthscope.com.au' },
            ];
            function makeRow(c) {
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
            [
                ['contacts-cell--name', ['Contact Name']],
                ['contacts-cell--pos-dept', ['Contact Position & Department']],
                ['contacts-cell--phone', ['Phone', 'Ext']],
                ['contacts-cell--mobile', ['Mobile', 'Fax']],
                ['contacts-cell--email', ['Email']],
                ['contacts-cell--del', ['']],
            ].forEach(([cls, lines]) => {
                const h = div('contacts-header-col ' + cls);
                const top = D.createElement('span');
                top.textContent = lines[0] || '';
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
            addBtn.addEventListener('click', () => tbody.appendChild(makeRow({ name: '', pos: '', dept: '', phone: '', mobile: '', email: '' })));
            addRow.appendChild(addBtn);
            wrapper.appendChild(header);
            wrapper.appendChild(tbody);
            wrapper.appendChild(addRow);
            tab.appendChild(wrapper);
            return tab;
        }
        Tabs.renderContacts = renderContacts;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Pricing & Division Setup tab — full implementation.
// Division Setup table: Division, Discount %, Quote, PO Number, PO Expiry, Turnaround Time.
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderPricingDivision(_state) {
            const D = document;
            let rowIdx = 0;
            // Local helpers (function-scoped — no namespace conflicts)
            function div(cls) {
                const e = D.createElement('div');
                e.className = cls;
                return e;
            }
            function inp(type, cls, val = '') {
                const e = D.createElement('input');
                e.type = type;
                e.className = cls;
                e.value = val;
                return e;
            }
            function mkBtn(cls, text) {
                const e = D.createElement('button');
                e.type = 'button';
                e.className = cls;
                e.textContent = text;
                return e;
            }
            function sel(cls, opts, val = '') {
                const s = D.createElement('select');
                s.className = cls;
                const empty = D.createElement('option');
                empty.value = '';
                empty.textContent = '—';
                s.appendChild(empty);
                opts.forEach(o => {
                    const op = D.createElement('option');
                    op.value = o;
                    op.textContent = o;
                    s.appendChild(op);
                });
                if (val)
                    s.value = val;
                return s;
            }
            const DIVISIONS = [
                'Instrument Repair', 'Instrument Modification', 'SILM - Commission',
                'Scope Repair - Rigid', 'Scope Repair - Flexible', 'Power Tool Repair',
                'Dental Drill Repair', 'Laser Marking - Standard', 'Instrument Refurbishment',
                'Camera/Coupler Repair', 'Endoscopy Repair', 'Loaner Equipment',
            ];
            const TURNAROUNDS = ['1 Day', '2 Days', '3 Days', '1 Week', '2 Weeks', '3 Weeks', '4 Weeks'];
            const SAMPLES = [
                { division: 'Instrument Repair', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' },
                { division: 'Instrument Modification', discount: 0, quote: true, poNumber: '', poExpiry: '', turnaround: '' },
                { division: 'SILM - Commission', discount: 100, quote: false, poNumber: '', poExpiry: '', turnaround: '3 Days' },
                { division: 'Scope Repair - Rigid', discount: 0, quote: true, poNumber: '', poExpiry: '', turnaround: '2 Weeks' },
                { division: 'Power Tool Repair', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' },
                { division: 'Dental Drill Repair', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' },
                { division: 'Laser Marking - Standard', discount: 100, quote: false, poNumber: '', poExpiry: '', turnaround: '3 Days' },
                { division: 'Instrument Refurbishment', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' },
                { division: 'Scope Repair - Flexible', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '' },
                { division: 'Camera/Coupler Repair', discount: 10, quote: true, poNumber: '', poExpiry: '', turnaround: '' },
            ];
            function makeRow(d) {
                const id = ++rowIdx;
                const row = div('division-row');
                // Division
                const divCell = div('division-cell division-cell--name');
                divCell.appendChild(sel('form-select', DIVISIONS, d.division));
                row.appendChild(divCell);
                // Discount %
                const discCell = div('division-cell division-cell--discount');
                const discInp = inp('number', 'form-input form-input--right', String(d.discount));
                discInp.min = '0';
                discInp.max = '100';
                discCell.appendChild(discInp);
                row.appendChild(discCell);
                // Quote checkbox
                const quoteCell = div('division-cell division-cell--quote');
                const quoteCb = D.createElement('input');
                quoteCb.type = 'checkbox';
                quoteCb.id = `dv-quote-${id}`;
                quoteCb.className = 'form-checkbox';
                quoteCb.checked = d.quote;
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
            [
                ['division-cell--name', 'Division'],
                ['division-cell--discount', 'Discount %'],
                ['division-cell--quote', 'Quote'],
                ['division-cell--po', 'PO Number'],
                ['division-cell--expiry', 'PO Expiry'],
                ['division-cell--turnaround', 'Turnaround Time'],
                ['division-cell--del', ''],
            ].forEach(([cls, text]) => {
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
            addBtn.addEventListener('click', () => tbody.appendChild(makeRow({ division: '', discount: 0, quote: true, poNumber: '', poExpiry: '', turnaround: '1 Week' })));
            addRow.appendChild(addBtn);
            table.appendChild(addRow);
            wrapper.appendChild(table);
            tab.appendChild(wrapper);
            return tab;
        }
        Tabs.renderPricingDivision = renderPricingDivision;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderNewPricing(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--new-pricing';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'New Pricing Setup — not yet implemented';
            el.appendChild(stub);
            return el;
        }
        Tabs.renderNewPricing = renderNewPricing;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderPayee(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--payee';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'Payee — not yet implemented';
            el.appendChild(stub);
            return el;
        }
        Tabs.renderPayee = renderPayee;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Laser Marking & Management tab — full implementation.
// Left: Management settings + ID Number table.
// Right: Action buttons (Decommission, Export, Email).
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderLaserMarking(_state) {
            const D = document;
            function div(cls) { const e = D.createElement('div'); e.className = cls; return e; }
            function inp(type, cls, val = '') { const e = D.createElement('input'); e.type = type; e.className = cls; e.value = val; return e; }
            function lbl(forId, text) { const e = D.createElement('label'); e.htmlFor = forId; e.className = 'form-label'; e.textContent = text; return e; }
            function chkRow(id, text, checked) {
                const row = div('form-inline');
                const cb = D.createElement('input');
                cb.type = 'checkbox';
                cb.id = id;
                cb.className = 'form-checkbox';
                cb.checked = checked;
                const l = lbl(id, text);
                row.appendChild(cb);
                row.appendChild(l);
                return row;
            }
            function makeIdRow(nextId) {
                const row = div('lm-id-row');
                row.appendChild(inp('number', 'form-input', nextId));
                row.appendChild(inp('text', 'form-input lm-last-id', ''));
                const fmtSel = D.createElement('select');
                fmtSel.className = 'form-select';
                const empty = D.createElement('option');
                empty.value = '';
                fmtSel.appendChild(empty);
                row.appendChild(fmtSel);
                const actions = div('lm-row-actions');
                const del = D.createElement('button');
                del.type = 'button';
                del.className = 'btn-trash';
                del.textContent = '×';
                del.setAttribute('aria-label', 'Delete row');
                del.addEventListener('click', () => row.remove());
                actions.appendChild(del);
                row.appendChild(actions);
                return row;
            }
            // --- Build ---
            const tab = D.createElement('div');
            tab.className = 'tab-content tab-content--laser-marking';
            const layout = div('laser-marking-tab');
            // Left panel
            const left = div('laser-marking__left');
            left.appendChild(chkRow('lm-mgmt', 'Management Services:', true));
            left.appendChild(chkRow('lm-assign', 'Assign ID Numbers', true));
            const prefixRow = div('lm-prefix-row');
            const prefixInp = inp('text', 'form-input lm-prefix-input', 'BPH');
            prefixInp.id = 'lm-prefix';
            prefixRow.appendChild(lbl('lm-prefix', 'ClientPrefix:'));
            prefixRow.appendChild(prefixInp);
            left.appendChild(prefixRow);
            // ID table
            const tableWrap = div('lm-id-table-wrap');
            const header = div('lm-id-table__header');
            ['Next ID Number', 'Last ID Number', 'ID Format', ''].forEach(t => {
                const th = div('lm-id-table__th');
                th.textContent = t;
                header.appendChild(th);
            });
            tableWrap.appendChild(header);
            const tbody = div('lm-id-table__body');
            tbody.appendChild(makeIdRow('30090'));
            tableWrap.appendChild(tbody);
            // Add row button below table
            const addIdBtn = D.createElement('button');
            addIdBtn.type = 'button';
            addIdBtn.className = 'btn btn--outlined lm-add-id-btn';
            addIdBtn.textContent = '+ Add ID Range';
            addIdBtn.addEventListener('click', () => tbody.appendChild(makeIdRow('')));
            tableWrap.appendChild(addIdBtn);
            left.appendChild(tableWrap);
            // Right panel — action buttons
            const right = div('laser-marking__right');
            [
                ['🗂', 'Decommission Instrument'],
                ['📊', "Export Instrument ID's"],
                ['📧', 'Email Service Report Copies'],
            ].forEach(([icon, text]) => {
                const btn = D.createElement('button');
                btn.type = 'button';
                btn.className = 'lm-action-btn';
                const ic = D.createElement('span');
                ic.className = 'lm-action-btn__icon';
                ic.textContent = icon;
                const lb = D.createElement('span');
                lb.textContent = text;
                btn.appendChild(ic);
                btn.appendChild(lb);
                right.appendChild(btn);
            });
            layout.appendChild(left);
            layout.appendChild(right);
            tab.appendChild(layout);
            return tab;
        }
        Tabs.renderLaserMarking = renderLaserMarking;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
// Tray Setup tab — full implementation.
// Left: Trays table + Tray Templates table (each with pagination).
// Right sidebar: Add New Tray form + Add New Tray Template form.
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderTraySetup(_state) {
            const D = document;
            function div(cls) { const e = D.createElement('div'); e.className = cls; return e; }
            function inp(type, cls, placeholder = '') { const e = D.createElement('input'); e.type = type; e.className = cls; e.placeholder = placeholder; return e; }
            function ff(labelText, inputEl) {
                const f = div('form-field');
                const l = D.createElement('label');
                l.className = 'form-label';
                l.textContent = labelText;
                f.appendChild(l);
                f.appendChild(inputEl);
                return f;
            }
            function mkBtn(cls, text) { const b = D.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = text; return b; }
            // --- Sample data ---
            const TRAYS = [
                ['Hand & Foot Bone Tray 10', 'HFB 10', 'Hand & Foot Bone Tray', '24/04/2023', ''],
                ['Cystoscopy Tray 2', 'CYST2', 'Cystoscopy Tray', '12/02/2019', ''],
                ['Cystoscopy Tray 3', 'CYST 3', 'Cystoscopy Tray', '19/03/2020', ''],
                ['Cystoscopy Tray 4', 'CYST 4', 'Cystoscopy Tray', '21/04/2020', ''],
                ['Micro Vascular Upper Limb Tray 1', 'MVUL 1', 'Micro Vascular Upper Limb Tray', '7/06/2022', ''],
                ['Micro Vascular Upper Limb Tray 2', 'MVUL 2', 'Micro Vascular Upper Limb Tray', '8/06/2023', ''],
                ['Micro Vascular Upper Limb Tray 3', 'MVUL 3', 'Micro Vascular Upper Limb Tray', '21/05/2020', ''],
                ['Minor Ortho Bone Tray 1', 'MB 1', '', '', ''],
                ['Minor Ortho Bone Tray 2', 'MB 2', '', '5/08/2013', ''],
                ['Minor Ortho Bone Tray 3', 'MB 3', '', '29/07/2013', ''],
                ['Minor Ortho Bone Tray 4', 'MB 4', '', '', ''],
                ['Minor Ortho Bone Tray 5', 'MB 5', '', '3/05/2013', ''],
                ['Minor Ortho Bone Tray 6', 'MB 6', '', '', ''],
            ];
            const TEMPLATES = [
                ['Hand & Foot Bone Tray', 'HFB', '', '24', ''],
                ['ACL Knee Hamstring Set', 'ACL', '', '48', ''],
                ['Acumed Bone Graft Instrument Set', 'ABG', '', '48', ''],
                ['Arthroscopy Hip Extras Tray', 'AHE', '', '24', ''],
                ['Battery Power Pro', 'BPP', '', '', ''],
                ['Arthroscopy Wrist Tray', 'AW', '', '24', ''],
                ['Cystoscopy Tray', 'CYST', '', '24', ''],
                ['Grommet Tray', 'EG', '', '24', ''],
                ['Fess Tray', 'FESS', '', '24', ''],
                ['Hand & Foot Soft Tissue Tray', 'HFS', '', '24', ''],
                ['Knee Arthroscopy Tray', 'KAS', '', '24', ''],
            ];
            // --- Table builder ---
            function buildTable(cols, rows, gridTpl, total) {
                const section = div('tray-table-section');
                // Header
                const header = div('tray-table__header');
                header.style.gridTemplateColumns = gridTpl;
                cols.forEach(col => {
                    const th = div('tray-table__th');
                    const name = D.createElement('span');
                    name.textContent = col;
                    const arrow = D.createElement('span');
                    arrow.className = 'sort-arrow';
                    arrow.textContent = '▼';
                    th.appendChild(name);
                    th.appendChild(arrow);
                    header.appendChild(th);
                });
                section.appendChild(header);
                // Body
                const tbody = div('tray-table__body');
                rows.forEach((rowData, idx) => {
                    const row = div('tray-row' + (idx === 0 ? ' is-selected' : ''));
                    row.style.gridTemplateColumns = gridTpl;
                    rowData.forEach(cell => {
                        const td = div('tray-cell');
                        td.textContent = cell;
                        row.appendChild(td);
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
                const recLabel = D.createElement('span');
                recLabel.textContent = 'Record:';
                pg.appendChild(recLabel);
                ['|◄', '◄'].forEach(t => pg.appendChild(mkBtn('tray-pagination__nav-btn', t)));
                const info = D.createElement('span');
                info.className = 'tray-pg-info';
                info.textContent = ` 1 of ${total} `;
                pg.appendChild(info);
                ['►', '►|'].forEach(t => pg.appendChild(mkBtn('tray-pagination__nav-btn', t)));
                const filterIcon = D.createElement('span');
                filterIcon.textContent = '🔍';
                filterIcon.style.marginLeft = '8px';
                const filterLbl = D.createElement('span');
                filterLbl.textContent = ' No Filter';
                const searchLbl = D.createElement('span');
                searchLbl.textContent = ' Search';
                searchLbl.style.marginLeft = '8px';
                const searchInp = inp('text', 'tray-search-input');
                pg.appendChild(filterIcon);
                pg.appendChild(filterLbl);
                pg.appendChild(searchLbl);
                pg.appendChild(searchInp);
                section.appendChild(pg);
                return section;
            }
            // --- Build tab ---
            const tab = D.createElement('div');
            tab.className = 'tab-content tab-content--tray-setup';
            const layout = div('tray-setup-tab');
            // Main area
            const main = div('tray-setup__main');
            main.appendChild(buildTable(['Tray Name', 'Tray Name Marked', 'Tray Template', 'Last Service', 'Tray Reference'], TRAYS, '2fr 1fr 2fr 90px 90px', 639));
            const templLabel = div('tray-section-label');
            templLabel.textContent = 'Tray Templates';
            main.appendChild(templLabel);
            main.appendChild(buildTable(['Tray Name', 'Tray Name Marked', 'Faculty', 'Service Months', 'Tray Reference'], TEMPLATES, '2fr 1fr 100px 80px 90px', 43));
            // Sidebar
            const sidebar = div('tray-setup__sidebar');
            // Add New Tray
            const addTraySection = div('tray-sidebar-section');
            const addTrayHdr = div('tray-sidebar-section__header');
            const addTrayLbl = D.createElement('span');
            addTrayLbl.className = 'tray-sidebar-section__label';
            addTrayLbl.textContent = 'Add New Tray';
            const addTrayBtn = mkBtn('btn btn--outlined btn--sm', '+ Add New Tray');
            addTrayHdr.appendChild(addTrayLbl);
            addTrayHdr.appendChild(addTrayBtn);
            addTraySection.appendChild(addTrayHdr);
            addTraySection.appendChild(ff('Full Tray Name', inp('text', 'form-input')));
            addTraySection.appendChild(ff('Name Marked', inp('text', 'form-input')));
            sidebar.appendChild(addTraySection);
            // Add New Tray Template
            const addTmplSection = div('tray-sidebar-section');
            const tmplTitle = div('tray-sidebar-section__title');
            tmplTitle.textContent = 'Add New Tray Template';
            addTmplSection.appendChild(tmplTitle);
            addTmplSection.appendChild(ff('Full Tray Name', inp('text', 'form-input')));
            addTmplSection.appendChild(ff('Name Marked', inp('text', 'form-input')));
            // Color swatches
            const swatches = div('tray-color-swatches');
            const swatchLabels = div('tray-swatch-labels');
            [['#93c5fd', 'Total Trays'], ['#86efac', 'Suffix'], ['#d8b4fe', 'Service Month:']].forEach(([color, label]) => {
                const sw = div('tray-color-swatch');
                sw.style.backgroundColor = color;
                swatches.appendChild(sw);
                const lb = div('tray-swatch-label');
                lb.textContent = label;
                swatchLabels.appendChild(lb);
            });
            addTmplSection.appendChild(swatches);
            addTmplSection.appendChild(swatchLabels);
            // Faculty select
            const facultySel = D.createElement('select');
            facultySel.className = 'form-select';
            ['', 'Anaesthetics', 'Cardiology', 'General Surgery', 'Neurosurgery', 'Ophthalmology', 'Orthopaedics', 'Urology'].forEach(o => {
                const op = D.createElement('option');
                op.value = o;
                op.textContent = o || '—';
                facultySel.appendChild(op);
            });
            addTmplSection.appendChild(ff('Faculty', facultySel));
            addTmplSection.appendChild(mkBtn('btn btn--outlined btn--sm', '+ Add New Tray Template'));
            sidebar.appendChild(addTmplSection);
            layout.appendChild(main);
            layout.appendChild(sidebar);
            tab.appendChild(layout);
            return tab;
        }
        Tabs.renderTraySetup = renderTraySetup;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
/// <reference path="types.ts" />
/// <reference path="state.ts" />
/// <reference path="components/header.ts" />
/// <reference path="components/customer-id-row.ts" />
/// <reference path="components/address-section.ts" />
/// <reference path="components/tab-nav.ts" />
/// <reference path="components/footer-actions.ts" />
/// <reference path="components/tabs/general-setup.ts" />
/// <reference path="components/tabs/contacts.ts" />
/// <reference path="components/tabs/pricing-division.ts" />
/// <reference path="components/tabs/new-pricing.ts" />
/// <reference path="components/tabs/payee.ts" />
/// <reference path="components/tabs/laser-marking.ts" />
/// <reference path="components/tabs/tray-setup.ts" />
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    if (!root)
        return;
    const state = CustomerDetails.State.createState();
    const tabRenderers = {
        'general-setup': CustomerDetails.Tabs.renderGeneralSetup,
        'contacts': CustomerDetails.Tabs.renderContacts,
        'pricing-division': CustomerDetails.Tabs.renderPricingDivision,
        'new-pricing': CustomerDetails.Tabs.renderNewPricing,
        'payee': CustomerDetails.Tabs.renderPayee,
        'laser-marking': CustomerDetails.Tabs.renderLaserMarking,
        'tray-setup': CustomerDetails.Tabs.renderTraySetup,
    };
    // Build the app shell
    const app = document.createElement('div');
    app.className = 'customer-app';
    const header = CustomerDetails.Components.renderHeader(state);
    const idRow = CustomerDetails.Components.renderCustomerIdRow(state);
    const addressSec = CustomerDetails.Components.renderAddressSection(state);
    const tabNav = CustomerDetails.Components.renderTabNav(state);
    const footer = CustomerDetails.Components.renderFooterActions();
    // Initial tab content
    let tabContentEl = tabRenderers['general-setup'](state);
    tabContentEl.id = 'tab-content-mount';
    app.appendChild(header);
    app.appendChild(idRow);
    app.appendChild(addressSec);
    app.appendChild(tabNav);
    app.appendChild(tabContentEl);
    app.appendChild(footer);
    // Swap tab content on tab change
    state.addEventListener('tabchange', (e) => {
        const detail = e.detail;
        const newContent = tabRenderers[detail.tabId](state);
        newContent.id = 'tab-content-mount';
        const old = document.getElementById('tab-content-mount');
        if (old && old.parentNode) {
            old.parentNode.replaceChild(newContent, old);
        }
        tabContentEl = newContent;
    });
    root.appendChild(app);
});
//# sourceMappingURL=app.js.map