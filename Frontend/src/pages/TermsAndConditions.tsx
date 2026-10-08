import { ScrollText } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    blocks: [
      "These terms and conditions apply to all bookings made with Pure Land Tours & Travels Pvt. Ltd. (\"Pure Land\", \"we\", \"us\"), Kathmandu, Nepal, and to your use of this website.",
      "By making a booking or paying a deposit you confirm that you have read and accepted these terms on behalf of yourself and everyone travelling under your booking. Please also read our Privacy Policy and Cancellation Policy, which form part of these terms.",
    ],
  },
  {
    id: "our-services",
    title: "Our services",
    blocks: [
      "We arrange pilgrimages, retreats, spiritual and cultural journeys, holidays and individual travel services including air tickets, accommodation, transport, visa assistance, travel insurance and documentation.",
      "Many of these services are provided by independent suppliers such as airlines, hotels, transport companies, cruise lines, guides, monasteries and retreat centers. We act as an agent for these suppliers, and their own conditions also apply to your booking.",
    ],
  },
  {
    id: "booking-and-payment",
    title: "Booking and payment",
    blocks: [
      {
        list: [
          "A booking is confirmed once we have received your booking details and deposit and have sent you written confirmation.",
          "A deposit of 30% of the trip cost is required at the time of booking. Air tickets, permits and some peak-season services must be paid in full when booked.",
          "The balance is due no later than 30 days before departure. Bookings made within 30 days of departure must be paid in full at the time of booking.",
          "If the balance is not received by the due date, we may treat the booking as cancelled by you and apply the charges in our Cancellation Policy.",
          "Payments may be made by bank transfer, card or other methods we accept. Any bank or card charges are borne by the traveler.",
        ],
      },
    ],
  },
  {
    id: "prices",
    title: "Prices",
    blocks: [
      "Prices are quoted in Nepali Rupees unless stated otherwise. Amounts shown in other currencies on this website are converted at the current exchange rate and are indicative only.",
      "The price of each trip covers only the services listed as included in its itinerary. Unless stated, it does not include international flights, visa fees, travel insurance, personal expenses, tips, optional activities or offerings.",
      "We reserve the right to adjust the price before departure if there are significant changes to airfares, fuel costs, government taxes, entry or permit fees or exchange rates. Once you have paid in full, the price of the land arrangements will not be increased.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations and changes",
    blocks: [
      "Cancellations and changes by you or by us, and any refunds, are governed by our Cancellation Policy.",
    ],
  },
  {
    id: "travel-documents",
    title: "Passports, visas and permits",
    blocks: [
      "You are responsible for holding a passport valid for at least six months beyond your return date, and for meeting the visa, permit and entry requirements of every country on your itinerary.",
      "We are glad to assist with visa and permit applications, but the decision to grant them rests entirely with the authorities concerned. We are not responsible for any refusal or delay, or for losses caused by incorrect or incomplete documents supplied to us.",
      "Please make sure the names you give us match your passport exactly. Costs arising from incorrect details are the traveler's responsibility.",
    ],
  },
  {
    id: "health-and-insurance",
    title: "Health, fitness and insurance",
    blocks: [
      "Some journeys involve high altitude, long road journeys, walking on uneven ground or simple accommodation. You are responsible for making sure you are fit enough for the trip you choose and for seeking medical advice, including on vaccinations, before you travel.",
      "Please tell us at the time of booking about any medical condition, disability or dietary requirement that may affect your journey.",
      "Comprehensive travel insurance covering medical expenses, emergency evacuation, trip cancellation and personal belongings is strongly recommended for all travelers and is compulsory for high-altitude journeys.",
    ],
  },
  {
    id: "itinerary",
    title: "Itineraries and spiritual programs",
    blocks: [
      "We make every effort to operate each journey as described. However, itineraries may need to change because of weather, road and flight conditions, local events, official regulations or safety concerns. Your tour leader has the authority to make such changes on our behalf.",
      "Spiritual teachings, transmissions, instructions, empowerments, ceremonies, audiences and meetings are included only where they have been officially arranged and permitted. They depend on the schedule, health and decisions of the teachers and institutions concerned and cannot be guaranteed.",
      "Additional costs arising from circumstances outside our control, such as extra nights caused by flight delays or road closures, are payable by the traveler.",
    ],
  },
  {
    id: "accommodation-and-transport",
    title: "Accommodation and transport",
    blocks: [
      "Accommodation is provided in the category described in your itinerary. Where a named hotel, guest house or homestay is unavailable, we will provide one of a similar standard.",
      "Rooms are on a twin-sharing basis unless a single room has been requested and paid for. In remote and pilgrimage areas, facilities may be basic.",
      "Flights are subject to the conditions of carriage of the airline concerned. We are not responsible for delays, cancellations, schedule changes or baggage handling by airlines or other carriers.",
    ],
  },
  {
    id: "conduct",
    title: "Your conduct",
    blocks: [
      "Our journeys visit sacred places and living communities. We ask all travelers to:",
      {
        list: [
          "Respect the customs, dress codes and rules of monasteries, temples, retreat centers and local communities.",
          "Follow the reasonable instructions of the tour leader and local guides.",
          "Obey the laws and regulations of the countries visited.",
          "Treat fellow travelers, staff and hosts with courtesy.",
        ],
      },
      "We may require a traveler to leave a trip, without refund, if their behaviour endangers or seriously disturbs others, breaks the law or shows disrespect to sacred sites. Any costs of returning home are the traveler's own responsibility.",
    ],
  },
  {
    id: "media",
    title: "Photography and media",
    blocks: [
      "Selected journeys include photography, documentary filming and media coverage, which may be shared through television and digital or social media platforms. By joining such a journey you agree that you may appear in this material, unless you tell us in writing before departure that you do not wish to.",
    ],
  },
  {
    id: "liability",
    title: "Our responsibility",
    blocks: [
      "We take care in choosing our suppliers, but we do not own or control them and cannot be held responsible for their acts or omissions.",
      "We are not liable for any injury, illness, death, loss, damage, delay or expense arising from causes beyond our reasonable control, including natural disasters, weather, epidemics, political unrest, strikes, technical failures of transport, government action or the decisions of third parties.",
      "Where we are found liable, our liability is limited to the amount you paid us for the trip concerned. Nothing in these terms limits any liability that cannot be limited by law.",
      "You travel at your own risk and are responsible for your personal belongings at all times.",
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    blocks: [
      "If something is not right during your trip, please tell your tour leader or contact our office straight away so that we can try to put it right on the spot.",
      "If the matter is not resolved, please write to us within 30 days of the end of your trip and we will investigate and reply as promptly as we can.",
    ],
  },
  {
    id: "website",
    title: "Use of this website",
    blocks: [
      "We aim to keep the information on this website accurate and up to date, but trip details, prices, dates and availability may change without notice and are confirmed only at the time of booking.",
      "All text, images, logos and other content on this website belong to Pure Land Tours & Travels Pvt. Ltd. or its licensors and may not be copied or reused without our written permission.",
      "You are responsible for keeping your account login details confidential and for all activity under your account.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    blocks: [
      "These terms are governed by the laws of Nepal. Any dispute that cannot be settled amicably will be subject to the jurisdiction of the courts of Kathmandu, Nepal.",
      "We may update these terms from time to time. The terms in force on the date of your booking confirmation apply to your booking.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      icon={ScrollText}
      title="Terms & Conditions"
      intro="The terms that apply when you book a journey or travel service with Pure Land Tours & Travels."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
