import { CalendarX } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    blocks: [
      "We understand that plans change. This policy explains what happens if you, or we, need to cancel or change a booking with Pure Land Tours & Travels Pvt. Ltd.",
      "Where a specific trip, retreat or quotation states its own cancellation terms, those terms apply in place of the standard charges below.",
    ],
  },
  {
    id: "how-to-cancel",
    title: "How to cancel",
    blocks: [
      "Cancellations must be sent in writing by the person who made the booking, by email to info@purelandtravels.com.np or by WhatsApp to +977-9704502011.",
      "The cancellation takes effect on the date we receive your written notice, and charges are calculated from that date. Cancellations made by phone are not valid until confirmed in writing.",
    ],
  },
  {
    id: "cancellation-charges",
    title: "Cancellation charges",
    blocks: [
      "For group tours, pilgrimages, retreats and holiday packages, the following charges apply, calculated on the total trip cost per person:",
      {
        table: {
          head: ["Notice before departure", "Cancellation charge"],
          rows: [
            ["45 days or more", "Booking deposit"],
            ["30 to 44 days", "25% of trip cost"],
            ["15 to 29 days", "50% of trip cost"],
            ["8 to 14 days", "75% of trip cost"],
            ["7 days or less, or no-show", "100% of trip cost"],
          ],
        },
      },
      "These charges reflect the payments we must make in advance to airlines, hotels, transport operators and other suppliers to secure your place.",
    ],
  },
  {
    id: "non-refundable-items",
    title: "Non-refundable items",
    blocks: [
      "The following are charged in full regardless of when you cancel, once they have been issued or paid on your behalf:",
      {
        list: [
          "Air tickets, which are subject to the airline's own fare rules, cancellation fees and refund timelines.",
          "Visa fees, permit fees and embassy or consular charges.",
          "Travel insurance premiums.",
          "Retreat, teaching and pilgrimage registration fees, and offerings or donations made on your behalf.",
          "Cruise bookings, festival or peak-season hotel bookings and any service the supplier has marked as non-refundable.",
          "Bank charges and payment gateway fees.",
        ],
      },
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    blocks: [
      "Any refund due is paid to the original method of payment within 15 to 30 working days of the confirmed cancellation. Refunds that depend on an airline or other supplier are passed on once we receive them.",
      "Refunds are made in the currency of the original payment. We are not responsible for exchange-rate differences or charges applied by your bank.",
    ],
  },
  {
    id: "changes-by-you",
    title: "Changes to your booking",
    blocks: [
      "If you wish to change your travel date, trip or the name of a traveler, please tell us as early as possible. We will do our best to help, subject to availability.",
      {
        list: [
          "Changes requested 30 days or more before departure are subject to an amendment fee plus any costs charged by our suppliers.",
          "Changes requested less than 30 days before departure may be treated as a cancellation and a new booking.",
          "Name changes on air tickets depend on the airline and are often not permitted.",
        ],
      },
    ],
  },
  {
    id: "cancellation-by-us",
    title: "If we cancel or change your trip",
    blocks: [
      "We may need to cancel a departure if the minimum number of travelers is not reached, or for reasons of safety. If this happens we will let you know as early as we can and offer you a choice of:",
      {
        list: [
          "An alternative departure date for the same trip,",
          "A different trip of similar value, or",
          "A full refund of the money you have paid to us for the trip.",
        ],
      },
      "We are not liable for other costs you may have incurred, such as separately booked flights, visas, vaccinations or equipment.",
      "Itineraries, including audiences, teachings, ceremonies and monastery visits, may be adjusted because of weather, road or flight conditions, official permissions or the schedule of the teachers and institutions concerned. Such adjustments are not grounds for a refund.",
    ],
  },
  {
    id: "force-majeure",
    title: "Events beyond our control",
    blocks: [
      "If a trip is cancelled or interrupted by events beyond our control, such as natural disasters, severe weather, epidemics, political unrest, strikes, border or airspace closures or government restrictions, we will refund the amounts we are able to recover from our suppliers, less reasonable administrative costs, or offer credit towards a future journey.",
    ],
  },
  {
    id: "during-the-trip",
    title: "No-shows and leaving a trip early",
    blocks: [
      "No refund is given if you fail to join the trip, join late or leave after it has started, whether voluntarily or because of illness, lost or invalid travel documents, or refusal of a visa or entry by the authorities.",
      "No refund is given for services included in the trip that you choose not to use, such as meals, transfers, sightseeing or accommodation.",
    ],
  },
  {
    id: "travel-insurance",
    title: "Travel insurance",
    blocks: [
      "We strongly recommend that every traveler takes out comprehensive travel insurance covering trip cancellation, medical expenses, emergency evacuation (including high-altitude rescue where relevant) and loss of baggage. We can help you arrange a suitable policy.",
    ],
  },
];

export default function CancellationPolicy() {
  return (
    <LegalPage
      icon={CalendarX}
      title="Cancellation Policy"
      intro="What happens when a booking is cancelled or changed, and how refunds are handled."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
