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
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderContacts(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--contacts';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'Contacts — not yet implemented';
            el.appendChild(stub);
            return el;
        }
        Tabs.renderContacts = renderContacts;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderPricingDivision(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--pricing-division';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'Pricing & Division Setup — not yet implemented';
            el.appendChild(stub);
            return el;
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
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderLaserMarking(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--laser-marking';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'Laser Marking & Management — not yet implemented';
            el.appendChild(stub);
            return el;
        }
        Tabs.renderLaserMarking = renderLaserMarking;
    })(Tabs = CustomerDetails.Tabs || (CustomerDetails.Tabs = {}));
})(CustomerDetails || (CustomerDetails = {}));
var CustomerDetails;
(function (CustomerDetails) {
    var Tabs;
    (function (Tabs) {
        function renderTraySetup(_state) {
            const el = document.createElement('div');
            el.className = 'tab-content tab-content--tray-setup';
            const stub = document.createElement('div');
            stub.className = 'tab-stub';
            stub.textContent = 'Tray Setup — not yet implemented';
            el.appendChild(stub);
            return el;
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