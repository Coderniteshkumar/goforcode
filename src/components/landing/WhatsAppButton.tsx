import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp icon yahan se aayega

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "916204579420"; 
  const message = "I'm interested, please share course details";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      {/* Real WhatsApp Icon */}
      <FaWhatsapp size={35} color="white" />
    </a>
  );
};

export default WhatsAppButton;