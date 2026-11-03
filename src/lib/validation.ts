export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const contactLimits = {
  name: 120,
  email: 254,
  message: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > contactLimits.name) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email) || email.length > contactLimits.email)
    errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length > contactLimits.message)
    errors.message = "That message is too long.";

  return errors;
}
