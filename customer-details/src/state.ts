// Application state — CustomerState class extending EventTarget.
// Fires 'change' on data updates and 'tabchange' on tab switches.

namespace CustomerDetails.State {

  function emptyFacilityAddress(): Types.FacilityAddress {
    return { hospitalAddress: '', suburb: '', state: '', postcode: '', country: '' };
  }

  function emptyPostalAddress(): Types.PostalAddress {
    return { mail: '', suburb: '', state: '', postcode: '', country: '' };
  }

  function emptyMainDetails(): Types.MainDetails {
    return { switchboard: '', fax: '', email: '', website: '' };
  }

  function emptyDepartmentRecord(): Types.DepartmentRecord {
    return {
      name: '',
      address:      { attn: '', address: '', address2: '', suburb: '', state: '', postcode: '', country: '' },
      mainContact:  { name: '', useDefaultDeliveryAddress: false, transportCase: '' },
      contactDetails: { reception: '', fax: '', email: '' },
      quotationSetup: { quote: false, sendSpreadsheet: false, attnTo: '', sendTo: '', poNumber: '', poExpiry: '', invoiceQuoteLimit: 0, stopQuoteReminders: false, salesRepresentative: '' },
    };
  }

  function emptyGeneralSetup(): Types.GeneralSetupData {
    return {
      departmentSetup:    { department: '', contact: '' },
      quotationSetup:     { quote: false, includeExcel: false, attnTo: '', sendTo: '', sendConfirmationOnApproval: false, stopQuoteReminders: false, reminderEvery: 0 },
      invoiceSetup:       { invoiceQuoteLimit: 0, invoiceToPayee: false, emailInvoice: false, includeExcel: false, attnTo: '', sendTo: '', poNumber: '', poExpiry: '' },
      serviceReportSetup: { emailReport: false, includeExcel: false, attnTo: '', sendTo: '' },
      deliverySetup:      { deliveryName: '', department: '', attn: '', address: '', address2: '', suburb: '', state: '', postcode: '', country: '' },
      freightSetup:       { company: '', accountNumber: '', phone: '', service: '', insurance: '', printDespatchLabels: false, transportCase: '', freightIncoming: 0, freightOutgoing: 0, administration: 0 },
      departments:              [],
      activeDepartmentIndex:    null,
      tubLabel:     '',
      ewayCompany:  '',
    };
  }

  function emptyCustomer(): Types.CustomerRecord {
    return {
      customerId:             '',
      name:                   '',
      status:                 'active',
      showInactiveCustomers:  false,
      salesRepresentative:    '',
      salesRegion:            '',
      corporateGroup:         '',
      facilityAddress:        emptyFacilityAddress(),
      postalAddress:          emptyPostalAddress(),
      mainDetails:            emptyMainDetails(),
      generalSetup:           emptyGeneralSetup(),
      activeTab:              'general-setup',
    };
  }

  export class CustomerState extends EventTarget {
    private _data: Types.CustomerRecord;

    constructor() {
      super();
      this._data = emptyCustomer();
    }

    get data(): Types.CustomerRecord {
      // Return a shallow copy to prevent direct mutation
      return { ...this._data };
    }

    get activeTab(): Types.TabId {
      return this._data.activeTab;
    }

    update(patch: Partial<Types.CustomerRecord>): void {
      this._data = { ...this._data, ...patch };
      this.dispatchEvent(new CustomEvent<Types.ChangeEventDetail>('change', {
        detail: { data: { ...this._data } },
      }));
    }

    updateGeneralSetup(patch: Partial<Types.GeneralSetupData>): void {
      const updated: Types.GeneralSetupData = { ...this._data.generalSetup, ...patch };
      this.update({ generalSetup: updated });
    }

    setTab(id: Types.TabId): void {
      this._data.activeTab = id;
      this.dispatchEvent(new CustomEvent<Types.TabChangeEventDetail>('tabchange', {
        detail: { tabId: id },
      }));
    }
  }

  export function createState(): CustomerState {
    return new CustomerState();
  }

}
