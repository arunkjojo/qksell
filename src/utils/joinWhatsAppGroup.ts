import { getCookie } from "./getCookie";

const whatsAppLink = getCookie('whatsappLink');
export const joinWhatsappGroup = () => {
    if (whatsAppLink) window.open(whatsAppLink, '_blank');
};