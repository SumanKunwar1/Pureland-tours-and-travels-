// src/lib/invoice.ts
//
// Company details and formatting shared by the admin invoice screens and the
// printable invoice / receipt documents.

// Optional lines (state, taxId, offices, stamp) are left out of the
// documents when empty.
export const COMPANY = {
  name: "Pure Land Tours & Travels Pvt. Ltd.",
  officeLabel: "Head Office",
  address: "Trinity Tower, Maharajgunj, Kathmandu, Nepal",
  phone: "+977 970-4502011",
  email: "info@purelandtravels.com.np",
  website: "www.purelandtravels.com.np",
  state: "",
  // Printed under the address when filled in, e.g. "PAN: 123456789".
  taxId: "",
  // Footer line listing every office.
  offices: "",
  signatory: "Malati Tamang",
  signatoryTitle: "Authorised Signatory",
  // The site's primary green (hsl 152 69% 31%).
  brandColor: "#188653",
  logo: "/documents/logo.png",
  logoWidth: 64,
  signature: "/documents/signature.png",
  stamp: "",
};

/** Website bookings are priced in this currency. */
export const BOOKING_CURRENCY = "NPR" as const;

/** Label for the invoice tax field. */
export const TAX_LABEL = "Tax / VAT %";

/** "USD 1,315.00" – the style used on invoices and receipts. */
export const formatMoney = (amount: number, currency: string) =>
  `${currency} ${(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** "14 Oct 2026" */
export const formatDocDate = (value?: string | Date) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

/** yyyy-mm-dd for <input type="date">. */
export const toDateInput = (value?: string | Date) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};
