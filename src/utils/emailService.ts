/// <reference types="vite/client" />
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends an email using EmailJS.
 * @param templateParams Object containing the template variables
 */
export async function sendEmail(templateParams: Record<string, string | number | boolean | undefined>) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    const missingKeysMsg = 'EmailJS configuration is missing. Please ensure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY are defined in your environment.';
    console.error(missingKeysMsg);
    throw new Error(missingKeysMsg);
  }

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
