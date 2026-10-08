import { ShieldCheck } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      "Pure Land Tours & Travels Pvt. Ltd. (\"Pure Land\", \"we\", \"us\") is a travel company based in Kathmandu, Nepal. We arrange Buddhist pilgrimages, retreats, spiritual journeys, holidays and related travel services such as air tickets, accommodation, transport, visa assistance and travel insurance.",
      "This policy explains what personal information we collect when you use our website, contact us or book with us, how we use it, and the choices you have.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      "We only collect information that we need to answer your enquiry or deliver your trip.",
      {
        list: [
          "Contact details: your name, email address, phone or WhatsApp number, country and postal address.",
          "Booking details: the trip you choose, travel dates, number of travelers, room and meal preferences, and any special requests.",
          "Travel documents: passport details, date of birth, nationality, photographs and other documents required for visas, permits, flight tickets, insurance and retreat or pilgrimage registration.",
          "Health and dietary information: only what you choose to tell us so that we can look after you on the journey, for example allergies, mobility needs or altitude-related conditions.",
          "Payment information: the amount, date and method of payment. Card payments are processed by our payment partners; we do not store full card numbers on our systems.",
          "Account information: your login email and password (stored in encrypted form) if you create an account or register as a travel agent.",
          "Website usage: pages visited, device and browser type, approximate location and similar technical data collected through cookies.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    blocks: [
      {
        list: [
          "To respond to enquiries and prepare quotations and itineraries.",
          "To make and manage your bookings with airlines, hotels, transport operators, guides, monasteries and retreat centers.",
          "To apply for visas, permits, travel insurance and registrations on your behalf.",
          "To send booking confirmations, payment receipts, travel documents and important updates before and during your trip.",
          "To keep you safe while travelling and to contact you or your emergency contact if needed.",
          "To improve our website, trips and customer service.",
          "To send news and offers about our journeys, only where you have agreed to receive them. You can unsubscribe at any time.",
          "To meet our legal, tax and accounting obligations.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    blocks: [
      "We do not sell or rent your personal information. We share it only with those who need it to deliver the services you have asked for:",
      {
        list: [
          "Travel suppliers such as airlines, hotels, guest houses, transport companies, local guides, cruise operators, monasteries and retreat organizers.",
          "Our associated offices and partners, including Padma Sambhava Trip Pvt. Ltd. in India, where they help operate your journey.",
          "Embassies, consulates, immigration and tourism authorities for visa and permit applications.",
          "Insurance providers, when you buy travel insurance through us.",
          "Payment processors and banks that handle your payment.",
          "Technology providers that host our website and business systems.",
          "Government or law-enforcement bodies where we are legally required to do so.",
        ],
      },
      "Because we arrange travel worldwide, your information may be sent to suppliers in the countries you are visiting. Data protection standards differ from country to country, and we share only what is necessary for your booking.",
    ],
  },
  {
    id: "photos-and-media",
    title: "Photographs, video and media coverage",
    blocks: [
      "Some of our journeys, retreats and ceremonies are photographed or filmed, and selected programs may be covered by our media partners for television and digital or social media platforms.",
      "If you would prefer not to appear in photographs or video, please tell your tour leader or write to us before departure and we will do our best to respect your wishes. We will always ask before using an identifiable image of you in advertising.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      "Our website uses cookies and similar technologies to keep you signed in, remember preferences such as your chosen currency, and understand how visitors use the site. You can block or delete cookies in your browser settings, but some features, such as logging in, may not work properly without them.",
    ],
  },
  {
    id: "security-and-retention",
    title: "How we protect and keep your information",
    blocks: [
      "We use reasonable technical and organizational measures to protect your information, including encrypted connections, restricted staff access and secure storage of travel documents. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
      "We keep your information for as long as needed to provide our services and to meet legal, tax and accounting requirements. Copies of passports and visa documents are kept only for as long as they are needed for your trip and any related legal obligation.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    blocks: [
      "You may ask us at any time to:",
      {
        list: [
          "Give you a copy of the personal information we hold about you.",
          "Correct information that is inaccurate or out of date.",
          "Delete your information, where we are not required by law to keep it.",
          "Stop sending you marketing messages.",
        ],
      },
      "To make a request, contact us using the details at the end of this page. We will respond within a reasonable time.",
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      "Our services are not directed at children. Bookings for travelers under 18 must be made by a parent or legal guardian, who provides the child's information on their behalf.",
    ],
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    blocks: [
      "Our website may link to other websites, such as social media pages, map services and partner organizations. We are not responsible for the privacy practices of those websites and encourage you to read their policies.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      "We may update this policy from time to time. The latest version will always be published on this page with the date it was last updated.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      icon={ShieldCheck}
      title="Privacy Policy"
      intro="How Pure Land Tours & Travels collects, uses and protects your personal information."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
