import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "6204579420"; // Apna number yahan dalein (country code ke sath, bina + ke)
  const message = "I Interest Please Share Course Details";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;