import { profile } from "@/content/profile";

export function getRecruiterBookingLink(
  name: string = profile.name,
  email: string = profile.email
) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  if (bookingUrl) {
    return bookingUrl;
  }

  const subject = encodeURIComponent(`Intro call request for ${name}`);
  const body = encodeURIComponent(
    `Hi ${name},\n\nI would like to schedule a short intro call to discuss opportunities.\n\nBest,\n`
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}
