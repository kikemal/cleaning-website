/** Ethiopia business line — digits only, no + or spaces (wa.me requirement). */
export const WHATSAPP_PHONE = '251905077915';

export const whatsappMessages = {
  general:
    "Hello! I'm interested in your cleaning services. Can you provide more information?",
  booking: "Hello! I'd like to book a cleaning service. Here are my details:",
  homeCleaning: "Hello! I'm interested in the Home Cleaning service. Can you tell me more?",
  officeCleaning: "Hello! I'm interested in the Office Cleaning service. Can you tell me more?",
  deepCleaning: "Hello! I'm interested in the Deep Cleaning service. Can you tell me more?",
  moveInOut:
    "Hello! I'm interested in the Move-in/Move-out Cleaning service. Can you tell me more?",
  carpetCleaning:
    "Hello! I'm interested in the Carpet & Upholstery Cleaning service. Can you tell me more?",
  windowCleaning: "Hello! I'm interested in the Window Cleaning service. Can you tell me more?",
  quote: "Hello! I'd like to request a quote for cleaning services.",
  contact: "Hello! I have a question about your cleaning services.",
};

/**
 * @param {string | undefined | null} message
 * @returns {string} https://wa.me/... with optional encoded ?text=
 */
export function getWhatsAppHref(message) {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (message == null || message === '') return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * @param {{ name?: string, phone?: string, email?: string, serviceType?: string, preferredDate?: string, address?: string, notes?: string }} form
 */
export function buildBookingWhatsAppBody(form) {
  const lines = [
    whatsappMessages.booking,
    '',
    `Name: ${form.name?.trim() || '—'}`,
    `Phone: ${form.phone?.trim() || '—'}`,
    `Email: ${form.email?.trim() || '—'}`,
    `Service: ${form.serviceType?.trim() || '—'}`,
    `Date: ${form.preferredDate?.trim() || '—'}`,
    `Address: ${form.address?.trim() || '—'}`,
  ];
  if (form.notes?.trim()) lines.push(`Notes: ${form.notes.trim()}`);
  return lines.join('\n');
}
