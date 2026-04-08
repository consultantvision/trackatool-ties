// All TypeScript interfaces for the Customer Details UI.
// No logic — pure type declarations only.

namespace CustomerDetails.Types {

  export type CustomerStatus = 'active' | 'inactive';

  export type TabId =
    | 'general-setup'
    | 'contacts'
    | 'pricing-division'
    | 'new-pricing'
    | 'payee'
    | 'laser-marking'
    | 'tray-setup';

  export interface SelectOption {
    value: string;
    label: string;
  }

  export interface TabDefinition {
    id: TabId;
    label: string;
    icon: string;
  }

  // --- Address types ---

  export interface FacilityAddress {
    hospitalAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  }

  export interface PostalAddress {
    mail: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  }

  export interface MainDetails {
    switchboard: string;
    fax: string;
    email: string;
    website: string;
  }

  // --- General Setup sub-types ---

  export interface DepartmentSetup {
    department: string;
    contact: string;
  }

  export interface QuotationSetup {
    quote: boolean;
    includeExcel: boolean;
    attnTo: string;
    sendTo: string;
    sendConfirmationOnApproval: boolean;
    stopQuoteReminders: boolean;
    reminderEvery: number;
  }

  export interface InvoiceSetup {
    invoiceQuoteLimit: number;
    invoiceToPayee: boolean;
    emailInvoice: boolean;
    includeExcel: boolean;
    attnTo: string;
    sendTo: string;
    poNumber: string;
    poExpiry: string;
  }

  export interface ServiceReportSetup {
    emailReport: boolean;
    includeExcel: boolean;
    attnTo: string;
    sendTo: string;
  }

  export interface DeliverySetup {
    deliveryName: string;
    department: string;
    attn: string;
    address: string;
    address2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  }

  export interface FreightSetup {
    company: string;
    accountNumber: string;
    phone: string;
    service: string;
    insurance: string;
    printDespatchLabels: boolean;
    transportCase: string;
    freightIncoming: number;
    freightOutgoing: number;
    administration: number;
  }

  export interface DepartmentAddress {
    attn: string;
    address: string;
    address2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  }

  export interface DepartmentContact {
    name: string;
    useDefaultDeliveryAddress: boolean;
    transportCase: string;
  }

  export interface DepartmentContactDetails {
    reception: string;
    fax: string;
    email: string;
  }

  export interface DepartmentQuotationSetup {
    quote: boolean;
    sendSpreadsheet: boolean;
    attnTo: string;
    sendTo: string;
    poNumber: string;
    poExpiry: string;
    invoiceQuoteLimit: number;
    stopQuoteReminders: boolean;
    salesRepresentative: string;
  }

  export interface DepartmentRecord {
    name: string;
    address: DepartmentAddress;
    mainContact: DepartmentContact;
    contactDetails: DepartmentContactDetails;
    quotationSetup: DepartmentQuotationSetup;
  }

  export interface GeneralSetupData {
    departmentSetup: DepartmentSetup;
    quotationSetup: QuotationSetup;
    invoiceSetup: InvoiceSetup;
    serviceReportSetup: ServiceReportSetup;
    deliverySetup: DeliverySetup;
    freightSetup: FreightSetup;
    departments: DepartmentRecord[];
    activeDepartmentIndex: number | null;
    tubLabel: string;
    ewayCompany: string;
  }

  // --- Top-level customer record ---

  export interface CustomerRecord {
    customerId: string;
    name: string;
    status: CustomerStatus;
    showInactiveCustomers: boolean;
    salesRepresentative: string;
    salesRegion: string;
    corporateGroup: string;
    facilityAddress: FacilityAddress;
    postalAddress: PostalAddress;
    mainDetails: MainDetails;
    generalSetup: GeneralSetupData;
    activeTab: TabId;
  }

  // --- Events ---

  export interface ChangeEventDetail {
    data: CustomerRecord;
  }

  export interface TabChangeEventDetail {
    tabId: TabId;
  }

}
