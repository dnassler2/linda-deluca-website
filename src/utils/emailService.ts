import emailjs from '@emailjs/browser';

const SERVICE_ID = ((import.meta as any).env?.VITE_EMAILJS_SERVICE_ID as string) || "service_59q7dvy";
const TEMPLATE_ID = ((import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID as string) || "template_j6yolwl";
const PUBLIC_KEY = ((import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY as string) || "czT5si-MB47v4wwtT";

/**
 * Sends an email using EmailJS.
 * @param templateParams Object containing the template variables
 */
export async function sendEmail(templateParams: Record<string, string | number | boolean | undefined>) {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams as Record<string, unknown>,
      PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('EmailJS Error sending email:', error);
    throw error;
  }
}
