export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  website?: string; // Honeypot field
}
