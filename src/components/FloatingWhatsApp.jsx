import WhatsAppButton from './WhatsAppButton';
import { whatsappMessages } from '../config/whatsapp';

/**
 * Fixed FAB — general inquiry, attention pulse on load, stays above page chrome (z-50).
 */
export default function FloatingWhatsApp() {
  return (
    <WhatsAppButton
      message={whatsappMessages.general}
      iconOnly
      iconSize={26}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-green-500 p-0 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 animate-whatsapp-attn"
      ariaLabel="Chat on WhatsApp — general inquiry"
    />
  );
}
