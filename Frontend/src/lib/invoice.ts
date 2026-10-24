// src/lib/invoice.ts
//
// Company details and formatting shared by the admin invoice screens and the
// printable invoice / receipt documents.

export const COMPANY = {
  name: "Padmasambhava Trip Pvt Ltd",
  officeLabel: "Head Office",
  address: "Rohini, Kurseong, Darjeeling, West Bengal, India",
  phone: "+91 73639 33945",
  email: "info@padmasambhavatrip.com",
  website: "www.padmasambhavatrip.com",
  state: "West Bengal (19)",
  offices:
    "Head Office – Rohini, Kurseong, Darjeeling, West Bengal, India · Regional Office – Main Bazar, Paharganj, Delhi, India",
  signatory: "Malati Tamang",
  signatoryTitle: "Authorised Signatory",
  logo: "/documents/logo.png",
  signature: "/documents/signature.png",
  stamp: "/documents/stamp.jpg",
};

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
